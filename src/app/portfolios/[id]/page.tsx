import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  CheckCircle,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";
import PageHero from "@/components/PageHero";

type Portfolio = {
  id: string;
  title: string;
  slug: string;
  category: string | null;
  tags: unknown;
  image: string | null;
  heroImage: string | null;
  intro: string | null;
  description: unknown;
  overviewText: string | null;
  overviewPoints: unknown;
  mediaImage: string | null;
  videoUrl: string | null;
  finalResult: unknown;
  client: string | null;
  portfolio: string | null;
  service: string | null;
  date: string | null;
  sortOrder: number;
  published: boolean;
  createdAt: string;
  updatedAt: string;
};

const PORTFOLIO_IMAGE =
  "/images/portfolios/porofolio.webp";

function toStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.filter(
    (item): item is string =>
      typeof item === "string" &&
      item.trim().length > 0
  );
}

function getWebsite(
  value: unknown
): string | null {
  if (typeof value !== "string") {
    return null;
  }

  const trimmed = value.trim();

  if (!trimmed) {
    return null;
  }

  if (
    trimmed.startsWith("http://") ||
    trimmed.startsWith("https://")
  ) {
    return trimmed;
  }

  return null;
}

async function getPortfolio(
  id: string
): Promise<Portfolio | null> {
  try {
    const baseUrl =
      process.env.NEXT_PUBLIC_SITE_URL ||
      process.env.NEXTAUTH_URL ||
      "http://localhost:3000";

    const response = await fetch(
      `${baseUrl}/api/portfolio/${encodeURIComponent(
        id
      )}`,
      {
        cache: "no-store",
      }
    );

    if (!response.ok) {
      return null;
    }

    return (await response.json()) as Portfolio;
  } catch (error) {
    console.error(
      "Failed to fetch portfolio:",
      error
    );

    return null;
  }
}

async function getPublishedPortfolios(): Promise<
  Portfolio[]
> {
  try {
    const baseUrl =
      process.env.NEXT_PUBLIC_SITE_URL ||
      process.env.NEXTAUTH_URL ||
      "http://localhost:3000";

    const response = await fetch(
      `${baseUrl}/api/portfolio`,
      {
        cache: "no-store",
      }
    );

    if (!response.ok) {
      return [];
    }

    const data = await response.json();

    if (!Array.isArray(data)) {
      return [];
    }

    return data as Portfolio[];
  } catch (error) {
    console.error(
      "Failed to fetch portfolios:",
      error
    );

    return [];
  }
}

export default async function PortfolioDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const portfolio = await getPortfolio(id);

  if (!portfolio || !portfolio.published) {
    notFound();
  }

  const tags = toStringArray(portfolio.tags);

  const description = toStringArray(
    portfolio.description
  );

  const overviewPoints = toStringArray(
    portfolio.overviewPoints
  );

  const finalResults = toStringArray(
    portfolio.finalResult
  );

  const website = getWebsite(
    portfolio.portfolio
  );

  /*
   * ONLY ONE IMAGE IS USED ON THIS PAGE.
   *
   * This always points to:
   *
   * public/images/portfolios/porofolio.webp
   */
  const portfolioImage =
    PORTFOLIO_IMAGE;

  /*
   * Previous / next portfolio navigation.
   * No additional images are used.
   */
  const allPortfolios =
    await getPublishedPortfolios();

  const sortedPortfolios = [
    ...allPortfolios,
  ].sort(
    (a, b) =>
      (a.sortOrder ?? 0) -
      (b.sortOrder ?? 0)
  );

  const currentIndex =
    sortedPortfolios.findIndex(
      (item) => item.id === portfolio.id
    );

  const previousPortfolio =
    currentIndex > 0
      ? sortedPortfolios[currentIndex - 1]
      : null;

  const nextPortfolio =
    currentIndex >= 0 &&
    currentIndex <
      sortedPortfolios.length - 1
      ? sortedPortfolios[currentIndex + 1]
      : null;

  return (
    <main className="portfolio-detail min-h-screen bg-white">

      {/* =====================================================
          HERO
          ONLY porofolio.webp IS USED
      ===================================================== */}
      <PageHero
        title={portfolio.title}
        imageSrc={portfolioImage}
      />

      {/* =====================================================
          PORTFOLIO IMAGE + INFORMATION
          SAME SINGLE IMAGE
      ===================================================== */}
      <section className="container mx-auto px-6 pt-10 pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

          {/* IMAGE */}
          <div className="lg:col-span-7">
            <div className="relative w-full aspect-[4/3] overflow-hidden rounded-2xl shadow-sm">

              <Image
                src={portfolioImage}
                alt={portfolio.title}
                fill
                priority
                className="object-cover"
              />

            </div>
          </div>

          {/* INFORMATION */}
          <div className="lg:col-span-5">
            <div className="rounded-2xl border border-purple-100 bg-white p-8 shadow-sm">

              <div className="mb-8">
                <span className="inline-flex items-center gap-2 text-sm font-semibold text-orange-500">
                  <span className="h-2 w-2 rounded-full bg-orange-500" />
                  Portfolio Information
                </span>
              </div>

              <dl className="space-y-6">

                {portfolio.client && (
                  <div>
                    <dt className="mb-1 text-sm text-gray-500">
                      Client
                    </dt>

                    <dd className="text-lg font-semibold text-purple-900">
                      {portfolio.client}
                    </dd>
                  </div>
                )}

                {portfolio.portfolio && (
                  <div>
                    <dt className="mb-1 text-sm text-gray-500">
                      Portfolio
                    </dt>

                    <dd className="text-lg font-semibold text-purple-900">
                      {portfolio.portfolio}
                    </dd>
                  </div>
                )}

                {portfolio.service && (
                  <div>
                    <dt className="mb-1 text-sm text-gray-500">
                      Service
                    </dt>

                    <dd className="text-lg font-semibold text-purple-900">
                      {portfolio.service}
                    </dd>
                  </div>
                )}

                {portfolio.category && (
                  <div>
                    <dt className="mb-1 text-sm text-gray-500">
                      Category
                    </dt>

                    <dd className="text-lg font-semibold text-purple-900">
                      {portfolio.category}
                    </dd>
                  </div>
                )}

                {portfolio.date && (
                  <div>
                    <dt className="mb-1 text-sm text-gray-500">
                      Date
                    </dt>

                    <dd className="text-lg font-semibold text-purple-900">
                      {portfolio.date}
                    </dd>
                  </div>
                )}

              </dl>

              {website && (
                <div className="mt-8">
                  <a
                    href={website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center rounded-full bg-purple-700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-purple-800"
                  >
                    Visit Website
                  </a>
                </div>
              )}

            </div>
          </div>

        </div>
      </section>

      {/* =====================================================
          TAGS
      ===================================================== */}
      {tags.length > 0 && (
        <section className="container mx-auto px-6 py-8">
          <div className="flex flex-wrap gap-3">

            {tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-purple-50 px-4 py-2 text-sm font-medium text-purple-700"
              >
                {tag}
              </span>
            ))}

          </div>
        </section>
      )}

      {/* =====================================================
          INTRO
      ===================================================== */}
      {portfolio.intro && (
        <section className="container mx-auto px-6 py-10">
          <div className="max-w-4xl">

            <h2 className="mb-5 text-3xl font-bold text-purple-900">
              About This Project
            </h2>

            <p className="text-lg leading-8 text-gray-600">
              {portfolio.intro}
            </p>

          </div>
        </section>
      )}

      {/* =====================================================
          OVERVIEW
      ===================================================== */}
      {(portfolio.overviewText ||
        overviewPoints.length > 0) && (
        <section className="container mx-auto px-6 py-12">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">

            {portfolio.overviewText && (
              <div>
                <h2 className="mb-5 text-3xl font-bold text-purple-900">
                  Project Overview
                </h2>

                <p className="leading-8 text-gray-600">
                  {portfolio.overviewText}
                </p>
              </div>
            )}

            {overviewPoints.length > 0 && (
              <div>
                <h3 className="mb-5 text-2xl font-bold text-purple-900">
                  Highlights
                </h3>

                <ul className="space-y-4">

                  {overviewPoints.map(
                    (point, index) => (
                      <li
                        key={`${point}-${index}`}
                        className="flex items-start gap-3"
                      >
                        <CheckCircle
                          size={20}
                          className="mt-1 shrink-0 text-orange-500"
                        />

                        <span className="text-gray-600">
                          {point}
                        </span>
                      </li>
                    )
                  )}

                </ul>
              </div>
            )}

          </div>
        </section>
      )}

      {/* =====================================================
          DESCRIPTION
      ===================================================== */}
      {description.length > 0 && (
        <section className="container mx-auto px-6 py-12">
          <div className="max-w-4xl">

            <h2 className="mb-6 text-3xl font-bold text-purple-900">
              Our Approach
            </h2>

            <div className="space-y-5">

              {description.map(
                (paragraph, index) => (
                  <p
                    key={`${paragraph}-${index}`}
                    className="leading-8 text-gray-600"
                  >
                    {paragraph}
                  </p>
                )
              )}

            </div>

          </div>
        </section>
      )}

      {/* =====================================================
          FINAL RESULTS
          TEXT ONLY — NO EXTRA IMAGES
      ===================================================== */}
      {finalResults.length > 0 && (
        <section className="container mx-auto px-6 py-12">
          <div className="max-w-4xl">

            <h2 className="mb-6 text-3xl font-bold text-purple-900">
              Final Results
            </h2>

            <ul className="space-y-4">

              {finalResults
                .filter(
                  (result) =>
                    !/\.(jpg|jpeg|png|webp|gif|svg)(\?.*)?$/i.test(
                      result
                    )
                )
                .map((result, index) => (
                  <li
                    key={`${result}-${index}`}
                    className="flex items-start gap-3"
                  >
                    <CheckCircle
                      size={20}
                      className="mt-1 shrink-0 text-orange-500"
                    />

                    <span className="text-gray-600">
                      {result}
                    </span>
                  </li>
                ))}

            </ul>

          </div>
        </section>
      )}

      {/* =====================================================
          VIDEO
          Video is allowed because it is not an image.
      ===================================================== */}
      {portfolio.videoUrl && (
        <section className="container mx-auto px-6 py-12">
          <div className="overflow-hidden rounded-2xl bg-black">

            <iframe
              src={portfolio.videoUrl}
              title={`${portfolio.title} video`}
              className="aspect-video w-full"
              allowFullScreen
            />

          </div>
        </section>
      )}

      {/* =====================================================
          PREVIOUS / ALL / NEXT
      ===================================================== */}
      <section className="container mx-auto px-6 py-16">
        <div className="flex items-center justify-between gap-4 border-t border-gray-200 pt-8">

          {/* PREVIOUS */}
          <div className="flex-1">

            {previousPortfolio ? (
              <Link
                href={`/portfolios/${previousPortfolio.id}`}
                className="group inline-flex items-center gap-3 text-purple-700 transition hover:text-orange-500"
              >
                <ArrowLeft
                  size={20}
                  className="transition-transform group-hover:-translate-x-1"
                />

                <span>
                  <span className="block text-xs uppercase tracking-wider text-gray-400">
                    Previous
                  </span>

                  <span className="font-semibold">
                    {previousPortfolio.title}
                  </span>
                </span>
              </Link>
            ) : (
              <div />
            )}

          </div>

          {/* ALL PORTFOLIOS */}
          <Link
            href="/portfolios"
            className="shrink-0 rounded-full border border-purple-200 px-6 py-3 font-semibold text-purple-700 transition hover:bg-purple-700 hover:text-white"
          >
            All Portfolios
          </Link>

          {/* NEXT */}
          <div className="flex flex-1 justify-end">

            {nextPortfolio ? (
              <Link
                href={`/portfolios/${nextPortfolio.id}`}
                className="group inline-flex items-center gap-3 text-right text-purple-700 transition hover:text-orange-500"
              >
                <span>
                  <span className="block text-xs uppercase tracking-wider text-gray-400">
                    Next
                  </span>

                  <span className="font-semibold">
                    {nextPortfolio.title}
                  </span>
                </span>

                <ArrowRight
                  size={20}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>
            ) : (
              <div />
            )}

          </div>

        </div>
      </section>

    </main>
  );
}