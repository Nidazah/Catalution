import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { z } from "zod";

import { getSession } from "@/lib/auth";
import {
  prisma,
  withDbRetry,
} from "@/lib/prisma";

import {
  defaultTheme,
  defaultLayout,
  defaultSectionStyles,
} from "@/lib/site-defaults";

/* =========================================================
   TYPES
========================================================= */

type SettingsKey =
  | "THEME"
  | "LAYOUT"
  | "SECTION_STYLES";

const SETTINGS_KEYS = [
  "THEME",
  "LAYOUT",
  "SECTION_STYLES",
] as const;

const sectionStyleKeys =
  Object.keys(
    defaultSectionStyles,
  ) as Array<
    keyof typeof defaultSectionStyles
  >;

type SectionStyleKey =
  (typeof sectionStyleKeys)[number];

const layoutSubsectionKeys =
  Object.keys(
    defaultLayout,
  ) as Array<
    keyof typeof defaultLayout
  >;

type LayoutSubsectionKey =
  (typeof layoutSubsectionKeys)[number];

/* =========================================================
   VALIDATION
========================================================= */

const settingsSchema = z.object({
  key: z.enum(SETTINGS_KEYS),

  data: z.record(
    z.string(),
    z.any(),
  ),
});

/* =========================================================
   ADMIN CHECK
========================================================= */

async function isAdmin() {
  const session =
    await getSession();

  return (
    !!session &&
    ["ADMIN", "STAFF"].includes(
      session.role ?? "",
    )
  );
}

/* =========================================================
   HELPERS
========================================================= */

function isPlainObject(
  value: unknown,
): value is Record<string, any> {
  return (
    !!value &&
    typeof value === "object" &&
    !Array.isArray(value)
  );
}

/*
 * Deep merge.
 *
 * Only properties supplied by the incoming object
 * are changed.
 *
 * Example:
 *
 * base:
 * {
 *   backgroundColor: "#111",
 *   titleSize: 48,
 *   paddingTop: 64
 * }
 *
 * incoming:
 * {
 *   backgroundColor: "#222"
 * }
 *
 * result:
 * {
 *   backgroundColor: "#222",
 *   titleSize: 48,
 *   paddingTop: 64
 * }
 */
function mergeDeep(
  base: unknown,
  incoming: unknown,
): any {
  if (!isPlainObject(incoming)) {
    return incoming;
  }

  const output: Record<
    string,
    any
  > = isPlainObject(base)
    ? { ...base }
    : {};

  for (const key of Object.keys(
    incoming,
  )) {
    const incomingValue =
      incoming[key];

    const baseValue =
      output[key];

    if (
      isPlainObject(
        incomingValue,
      ) &&
      isPlainObject(baseValue)
    ) {
      output[key] =
        mergeDeep(
          baseValue,
          incomingValue,
        );
    } else if (
      isPlainObject(
        incomingValue,
      )
    ) {
      output[key] =
        mergeDeep(
          {},
          incomingValue,
        );
    } else {
      /*
       * Primitive values, arrays,
       * null, etc. replace ONLY
       * this particular property.
       */
      output[key] =
        incomingValue;
    }
  }

  return output;
}

function getDefaults(
  key: SettingsKey,
) {
  switch (key) {
    case "THEME":
      return defaultTheme;

    case "LAYOUT":
      return defaultLayout;

    case "SECTION_STYLES":
      return defaultSectionStyles;
  }
}

async function getSavedData(
  key: SettingsKey,
): Promise<
  Record<string, any>
> {
  const row =
    await withDbRetry(() =>
      prisma.siteSettings.findUnique({
        where: {
          key,
        },
      }),
    );

  if (
    !row?.data ||
    !isPlainObject(row.data)
  ) {
    return {};
  }

  return row.data as Record<
    string,
    any
  >;
}

async function getSetting(
  key: SettingsKey,
) {
  const defaults =
    getDefaults(key);

  const savedData =
    await getSavedData(key);

  return mergeDeep(
    defaults,
    savedData,
  );
}

function toPrismaJson(
  data: unknown,
): Prisma.InputJsonValue {
  return JSON.parse(
    JSON.stringify(data),
  ) as Prisma.InputJsonValue;
}

/* =========================================================
   GET
========================================================= */

export async function GET(
  request: Request,
) {
  const url =
    new URL(request.url);

  const key =
    url.searchParams.get(
      "key",
    );

  const raw =
    url.searchParams.get(
      "raw",
    ) === "true";

  try {
    /*
     * -------------------------------------------------------
     * RAW SAVED OVERRIDES
     *
     * Used by the admin editor.
     *
     * This is NOT the effective/default data.
     * -------------------------------------------------------
     */
    if (
      raw &&
      key === "SECTION_STYLES"
    ) {
      const savedData =
        await getSavedData(
          "SECTION_STYLES",
        );

      return NextResponse.json({
        key: "SECTION_STYLES",
        data: savedData,
      });
    }

    if (
      key === "THEME" ||
      key === "LAYOUT" ||
      key === "SECTION_STYLES"
    ) {
      const typedKey =
        key as SettingsKey;

      const [
        data,
        row,
      ] = await Promise.all([
        getSetting(
          typedKey,
        ),

        withDbRetry(() =>
          prisma.siteSettings.findUnique({
            where: {
              key: typedKey,
            },
          }),
        ),
      ]);

      return NextResponse.json({
        key: typedKey,
        data,
        customized: !!row,
      });
    }

    /*
     * -------------------------------------------------------
     * GET ALL SETTINGS
     * -------------------------------------------------------
     */

    const [
      theme,
      layout,
      sectionStyles,

      themeRow,
      layoutRow,
      sectionStylesRow,
    ] = await Promise.all([
      getSetting("THEME"),
      getSetting("LAYOUT"),
      getSetting(
        "SECTION_STYLES",
      ),

      withDbRetry(() =>
        prisma.siteSettings.findUnique({
          where: {
            key: "THEME",
          },
        }),
      ),

      withDbRetry(() =>
        prisma.siteSettings.findUnique({
          where: {
            key: "LAYOUT",
          },
        }),
      ),

      withDbRetry(() =>
        prisma.siteSettings.findUnique({
          where: {
            key: "SECTION_STYLES",
          },
        }),
      ),
    ]);

    /*
     * RAW per-section overrides, exactly as saved — NOT merged
     * with defaults. `sectionStyles` above always has every field
     * for every section (e.g. HERO.paddingTop is always present,
     * defaulting to 64, whether or not anyone ever touched it).
     * If an admin UI writes back the *entire* form on save, a
     * section's saved row can end up containing default-equal
     * values for fields nobody actually changed — so "this
     * section has a saved row" is NOT the same as "this specific
     * field was actually customized". Consumers that want to
     * force CSS for a field should check for that field's key in
     * this raw object, not just check `sectionStylesCustomized`
     * or the presence of the section key.
     */
    const sectionStylesOverrides =
      sectionStylesRow?.data &&
      isPlainObject(sectionStylesRow.data)
        ? (sectionStylesRow.data as Record<string, any>)
        : {};

    const sectionStylesCustomizedKeys =
      Object.keys(sectionStylesOverrides);

    return NextResponse.json({
      theme,
      layout,
      sectionStyles,

      themeCustomized:
        !!themeRow,

      layoutCustomized:
        !!layoutRow,

      sectionStylesCustomized:
        !!sectionStylesRow,

      sectionStylesCustomizedKeys,

      sectionStylesOverrides,
    });
  } catch (error) {
    console.error(
      "GET /api/site-settings",
      error,
    );

    /*
     * The website must never break
     * because CMS settings failed.
     *
     * Return original defaults.
     */
    return NextResponse.json(
      {
        theme:
          defaultTheme,

        layout:
          defaultLayout,

        sectionStyles:
          defaultSectionStyles,

        themeCustomized:
          false,

        layoutCustomized:
          false,

        sectionStylesCustomized:
          false,

        sectionStylesCustomizedKeys:
          [],

        sectionStylesOverrides:
          {},
      },
      {
        status: 200,
      },
    );
  }
}

/* =========================================================
   PUT
========================================================= */

export async function PUT(
  request: Request,
) {
  if (!(await isAdmin())) {
    return NextResponse.json(
      {
        error:
          "Unauthorized",
      },
      {
        status: 401,
      },
    );
  }

  try {
    const body =
      settingsSchema.parse(
        await request.json(),
      );

    const key =
      body.key;

    /*
     * Get ONLY the existing database
     * overrides.
     */
    const existingData =
      await getSavedData(
        key,
      );

    /*
     * Merge the new changes into the
     * existing database overrides.
     *
     * Defaults are NOT saved here.
     */
    const nextData =
      mergeDeep(
        existingData,
        body.data,
      );

    const jsonData =
      toPrismaJson(
        nextData,
      );

    const row =
      await withDbRetry(() =>
        prisma.siteSettings.upsert({
          where: {
            key,
          },

          create: {
            key,
            data: jsonData,
          },

          update: {
            data: jsonData,
          },
        }),
      );

    /*
     * Return effective data:
     *
     * ORIGINAL DEFAULTS
     * +
     * DATABASE OVERRIDES
     */
    const effectiveData =
      mergeDeep(
        getDefaults(key),
        row.data,
      );

    return NextResponse.json({
      ok: true,
      key,
      data: effectiveData,
      customized: true,
    });
  } catch (error) {
    if (
      error instanceof
      z.ZodError
    ) {
      return NextResponse.json(
        {
          error:
            "Invalid settings",

          details:
            error.flatten(),
        },
        {
          status: 400,
        },
      );
    }

    console.error(
      "PUT /api/site-settings",
      error,
    );

    return NextResponse.json(
      {
        error:
          "Could not save settings",
      },
      {
        status: 500,
      },
    );
  }
}

/* =========================================================
   DELETE / RESET
========================================================= */

export async function DELETE(
  request: Request,
) {
  if (!(await isAdmin())) {
    return NextResponse.json(
      {
        error:
          "Unauthorized",
      },
      {
        status: 401,
      },
    );
  }

  const url =
    new URL(request.url);

  const key =
    url.searchParams.get(
      "key",
    );

  const section =
    url.searchParams.get(
      "section",
    );

  /*
   * Validate key.
   */
  if (
    key !== "THEME" &&
    key !== "LAYOUT" &&
    key !== "SECTION_STYLES"
  ) {
    return NextResponse.json(
      {
        error:
          "Invalid key",
      },
      {
        status: 400,
      },
    );
  }

  const typedKey =
    key as SettingsKey;

  /*
   * Section is only valid for:
   *
   * LAYOUT
   * SECTION_STYLES
   */
  if (
    section &&
    typedKey !== "LAYOUT" &&
    typedKey !==
      "SECTION_STYLES"
  ) {
    return NextResponse.json(
      {
        error:
          "`section` is only valid when key is LAYOUT or SECTION_STYLES",
      },
      {
        status: 400,
      },
    );
  }

  try {
    /* =====================================================
       RESET ONE LAYOUT SUBSECTION
    ===================================================== */

    if (
      typedKey === "LAYOUT" &&
      section
    ) {
      if (
        !layoutSubsectionKeys.includes(
          section as LayoutSubsectionKey,
        )
      ) {
        return NextResponse.json(
          {
            error:
              `Invalid layout section. ` +
              `Must be one of: ${layoutSubsectionKeys.join(
                ", ",
              )}`,
          },
          {
            status: 400,
          },
        );
      }

      const sectionKey =
        section as LayoutSubsectionKey;

      const existingRow =
        await withDbRetry(() =>
          prisma.siteSettings.findUnique({
            where: {
              key: "LAYOUT",
            },
          }),
        );

      const currentData =
        existingRow?.data &&
        isPlainObject(
          existingRow.data,
        )
          ? {
              ...(
                existingRow.data as Record<
                  string,
                  unknown
                >
              ),
            }
          : {};

      /*
       * TRUE RESET:
       *
       * Remove only this subsection
       * from database overrides.
       */
      delete currentData[
        sectionKey
      ];

      /*
       * If no other layout customizations
       * remain, remove the complete row.
       */
      if (
        Object.keys(
          currentData,
        ).length === 0
      ) {
        await withDbRetry(() =>
          prisma.siteSettings
            .delete({
              where: {
                key: "LAYOUT",
              },
            })
            .catch(
              () => null,
            ),
        );

        return NextResponse.json({
          ok: true,
          key: "LAYOUT",
          section:
            sectionKey,

          data:
            defaultLayout,

          reset: true,
          customized: false,
        });
      }

      const jsonData =
        toPrismaJson(
          currentData,
        );

      const row =
        await withDbRetry(() =>
          prisma.siteSettings.upsert({
            where: {
              key: "LAYOUT",
            },

            create: {
              key: "LAYOUT",
              data: jsonData,
            },

            update: {
              data: jsonData,
            },
          }),
        );

      return NextResponse.json({
        ok: true,
        key: "LAYOUT",
        section:
          sectionKey,

        data:
          mergeDeep(
            defaultLayout,
            row.data,
          ),

        reset: true,
        customized: true,
      });
    }

    /* =====================================================
       RESET ONE HOMEPAGE SECTION
    ===================================================== */

    if (
      typedKey ===
        "SECTION_STYLES" &&
      section
    ) {
      if (
        !sectionStyleKeys.includes(
          section as SectionStyleKey,
        )
      ) {
        return NextResponse.json(
          {
            error:
              `Invalid section. ` +
              `Must be one of: ${sectionStyleKeys.join(
                ", ",
              )}`,
          },
          {
            status: 400,
          },
        );
      }

      const sectionKey =
        section as SectionStyleKey;

      const existingRow =
        await withDbRetry(() =>
          prisma.siteSettings.findUnique({
            where: {
              key: "SECTION_STYLES",
            },
          }),
        );

      const currentData =
        existingRow?.data &&
        isPlainObject(
          existingRow.data,
        )
          ? {
              ...(
                existingRow.data as Record<
                  string,
                  unknown
                >
              ),
            }
          : {};

      /*
       * TRUE SECTION RESET:
       *
       * Remove ONLY the selected section.
       *
       * Example:
       *
       * hero
       * services
       * about
       *
       * Reset services:
       *
       * hero
       * about
       */
      delete currentData[
        sectionKey
      ];

      /*
       * If no customized sections remain,
       * remove the entire database row.
       */
      if (
        Object.keys(
          currentData,
        ).length === 0
      ) {
        await withDbRetry(() =>
          prisma.siteSettings
            .delete({
              where: {
                key:
                  "SECTION_STYLES",
              },
            })
            .catch(
              () => null,
            ),
        );

        return NextResponse.json({
          ok: true,

          key:
            "SECTION_STYLES",

          section:
            sectionKey,

          data:
            defaultSectionStyles,

          reset: true,
          customized: false,
        });
      }

      const jsonData =
        toPrismaJson(
          currentData,
        );

      const row =
        await withDbRetry(() =>
          prisma.siteSettings.upsert({
            where: {
              key:
                "SECTION_STYLES",
            },

            create: {
              key:
                "SECTION_STYLES",

              data:
                jsonData,
            },

            update: {
              data:
                jsonData,
            },
          }),
        );

      return NextResponse.json({
        ok: true,

        key:
          "SECTION_STYLES",

        section:
          sectionKey,

        data:
          mergeDeep(
            defaultSectionStyles,
            row.data,
          ),

        reset: true,
        customized: true,
      });
    }

    /* =====================================================
       RESET ENTIRE SETTING
    ===================================================== */

    await withDbRetry(() =>
      prisma.siteSettings
        .delete({
          where: {
            key: typedKey,
          },
        })
        .catch(
          () => null,
        ),
    );

    const defaultData =
      getDefaults(
        typedKey,
      );

    return NextResponse.json({
      ok: true,

      key:
        typedKey,

      data:
        defaultData,

      reset: true,
      customized: false,
    });
  } catch (error) {
    console.error(
      "DELETE /api/site-settings",
      error,
    );

    return NextResponse.json(
      {
        error:
          "Could not reset settings",
      },
      {
        status: 500,
      },
    );
  }
}