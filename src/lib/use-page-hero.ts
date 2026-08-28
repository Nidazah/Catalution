"use client";

import { useEffect, useState } from "react";

export interface PageHeroContent {
  title: string;
  subtitle?: string;
  image?: string;
}

/**
 * Fetches a single CMS ContentSection to drive an inner-page's <PageHero />.
 * Falls back to the hardcoded `fallback` content if the section hasn't been
 * configured in /admin/content yet, or if the request fails.
 */
export function usePageHero(
  sectionKey: string,
  fallback: PageHeroContent,
): PageHeroContent {
  const [hero, setHero] = useState<PageHeroContent>(fallback);

  useEffect(() => {
    let cancelled = false;

    fetch(`/api/content?sectionKey=${sectionKey}`, { cache: "no-store" })
      .then((res) => (res.ok ? res.json() : Promise.reject(new Error("Failed to load hero"))))
      .then((data) => {
        if (cancelled) return;

        const row = Array.isArray(data) ? data[0] : null;
        if (!row) return;

        setHero({
          title: row.title || fallback.title,
          subtitle: row.description || fallback.subtitle || "",
          image: row.image || fallback.image,
        });
      })
      .catch(() => undefined);

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sectionKey]);

  return hero;
}
