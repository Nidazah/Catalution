"use client";

import { useEffect, useState } from "react";
import PageHero from "@/components/PageHero";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

type Portfolio = {
  id: string | number;
  slug: string;
  title: string;
  tags: string[];
  image: string;
  published?: boolean;
  sortOrder?: number;
};

export default function PortfoliosPage() {
  const [portfolios, setPortfolios] = useState<Portfolio[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const itemsPerPage = 6;

  useEffect(() => {
    async function loadPortfolios() {
      try {
        setLoading(true);
        setError("");

        const res = await fetch("/api/portfolio", {
          cache: "no-store",
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(
            data?.error || "Could not load portfolios"
          );
        }

        /*
         * Supports either:
         *   [ ...portfolios ]
         * or:
         *   { portfolios: [ ...portfolios ] }
         */
        const items = Array.isArray(data)
          ? data
          : Array.isArray(data?.portfolios)
            ? data.portfolios
            : [];

        /*
         * The public Portfolio API should already return published
         * records. This additional check prevents unpublished records
         * from appearing if the API ever returns them.
         */
        const publishedItems = items.filter(
          (portfolio: Portfolio) =>
            portfolio.published === undefined ||
            portfolio.published === true
        );

        setPortfolios(publishedItems);
        setCurrentPage(1);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Could not load portfolios"
        );
      } finally {
        setLoading(false);
      }
    }

    loadPortfolios();
  }, []);

  const totalPages = Math.max(
    1,
    Math.ceil(portfolios.length / itemsPerPage)
  );

  const startIndex = (currentPage - 1) * itemsPerPage;

  const visiblePortfolios = portfolios.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const paginate = (pageNumber: number) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  return (
    <main className="min-h-screen bg-white">
      <PageHero title="Portfolios" />

      <section className="container mx-auto px-6 py-12">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm"
              >
                <div className="w-full h-[220px] bg-gray-100 animate-pulse" />

                <div className="p-5">
                  <div className="h-3 w-20 rounded bg-gray-100 animate-pulse mb-3" />
                  <div className="h-5 w-3/4 rounded bg-gray-100 animate-pulse mb-3" />
                  <div className="h-4 w-28 rounded bg-gray-100 animate-pulse mt-6" />
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="rounded-2xl border border-red-200 bg-red-50 px-6 py-5 text-center text-sm text-red-600">
            {error}
          </div>
        ) : portfolios.length === 0 ? (
          <div className="rounded-2xl border border-gray-100 bg-gray-50 px-6 py-12 text-center">
            <h3 className="text-lg font-bold text-navy">
              No portfolios available
            </h3>

            <p className="mt-2 text-sm text-gray-500">
              Published portfolio projects will appear here.
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {visiblePortfolios.map((portfolio) => (
                <Link
                  key={portfolio.id}
                  href={`/portfolios/${portfolio.slug}`}
                  className="group block"
                >
                  <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 h-full flex flex-col">
                    <div className="relative w-full h-[220px] bg-gray-50 overflow-hidden">
                      <Image
                        src={portfolio.image}
                        alt={portfolio.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover"
                        style={{
                          objectPosition: "center 20%",
                        }}
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>

                    <div className="p-5 flex flex-col flex-grow">
                      <span className="text-xs font-bold tracking-widest uppercase text-accent mb-2">
                        {portfolio.tags?.join(" • ") || "Portfolio"}
                      </span>

                      <h3 className="text-lg font-bold text-navy group-hover:text-accent transition-colors mb-2">
                        {portfolio.title}
                      </h3>

                      <div className="mt-auto pt-4 flex items-center text-sm font-medium text-navy group-hover:text-accent transition-colors">
                        View Project

                        <ArrowRight className="h-4 w-4 ml-1.5 transition-transform group-hover:translate-x-1" />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* PAGINATION */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-12">
                {/* Previous */}
                <button
                  onClick={() => paginate(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`flex h-11 w-11 items-center justify-center rounded-full border-2 transition-all duration-300 ${
                    currentPage === 1
                      ? "border-gray-200 text-gray-300 cursor-not-allowed"
                      : "border-gray-300 text-gray-600 hover:border-accent hover:text-accent hover:bg-accent/5"
                  }`}
                  aria-label="Previous page"
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="15 18 9 12 15 6" />
                  </svg>
                </button>

                {/* Page numbers */}
                {Array.from(
                  { length: totalPages },
                  (_, i) => i + 1
                ).map((number) => (
                  <button
                    key={number}
                    onClick={() => paginate(number)}
                    className={`relative flex h-11 w-11 items-center justify-center rounded-full text-sm font-bold transition-all duration-300 ${
                      currentPage === number
                        ? "bg-accent text-white border-2 border-black shadow-md scale-105"
                        : "border-2 border-gray-200 text-gray-600 bg-white hover:border-accent hover:text-accent hover:bg-accent/5"
                    }`}
                    aria-label={`Go to page ${number}`}
                  >
                    {number.toString().padStart(2, "0")}
                  </button>
                ))}

                {/* Next */}
                <button
                  onClick={() => paginate(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`flex h-11 w-11 items-center justify-center rounded-full border-2 transition-all duration-300 ${
                    currentPage === totalPages
                      ? "border-gray-200 text-gray-300 cursor-not-allowed"
                      : "border-gray-300 text-gray-600 hover:border-accent hover:text-accent hover:bg-accent/5"
                  }`}
                  aria-label="Next page"
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </button>
              </div>
            )}
          </>
        )}
      </section>
    </main>
  );
}