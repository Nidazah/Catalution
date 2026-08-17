"use client";

import { useEffect, useState } from "react";
import PageHero from "@/components/PageHero";
import Image from "next/image";
import Link from "next/link";

type Member = { slug: string; name: string; role: string; image: string };

export default function TeamPage() {
  const [allTeamMembers, setAllTeamMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const itemsPerPage = 8;
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetch("/api/team", { cache: "no-store" })
      .then((res) => res.json())
      .then((data) => setAllTeamMembers(Array.isArray(data) ? data : []))
      .finally(() => setLoading(false));
  }, []);

  const totalPages = Math.ceil(allTeamMembers.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentTeamMembers = allTeamMembers.slice(
    indexOfFirstItem,
    indexOfLastItem,
  );

  const paginate = (pageNumber: number) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) setCurrentPage(pageNumber);
  };

  return (
    <main className="min-h-screen bg-white">
      <PageHero title="Our Team" />

      <div className="w-full max-w-[1280px] mx-auto px-6 py-10">
        {!loading && currentTeamMembers.length === 0 && (
          <p className="text-center text-gray-500">No team members found.</p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {currentTeamMembers.map((member) => (
            <Link
              key={member.slug}
              href={`/team/${member.slug}`}
              className="media-card media-card--4-5 bg-gray-100 group rounded-xl"
            >
              <Image
                src={member.image}
                alt={member.name}
                fill
                className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 25vw"
              />
              <div className="media-card__overlay bg-gradient-to-t from-navy/90 via-navy/40 to-transparent" />

              <div className="media-card__caption">                <h3 className="text-xl font-bold text-white">{member.name}</h3>
                <p className="text-sm text-gray-300 mt-1 font-medium">
                  {member.role}
                </p>
              </div>
            </Link>
          ))}
        </div>

        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-10">
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className={`flex h-11 w-11 items-center justify-center rounded-full border-2 transition-all duration-300 ${
                currentPage === 1
                  ? "border-gray-200 text-gray-300 cursor-not-allowed"
                  : "border-gray-300 text-gray-600 hover:border-accent hover:text-accent"
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

            {Array.from({ length: totalPages }, (_, i) => i + 1).map(
              (number) => (
                <button
                  key={number}
                  onClick={() => paginate(number)}
                  className={`flex h-11 w-11 items-center justify-center rounded-full text-sm font-bold transition-all duration-300 ${
                    currentPage === number
                      ? "bg-accent text-white shadow-md"
                      : "border-2 border-gray-200 text-gray-600 bg-white hover:border-accent hover:text-accent"
                  }`}
                  aria-label={`Go to page ${number}`}
                >
                  {number.toString().padStart(2, "0")}
                </button>
              ),
            )}

            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`flex h-11 w-11 items-center justify-center rounded-full border-2 transition-all duration-300 ${
                currentPage === totalPages
                  ? "border-gray-200 text-gray-300 cursor-not-allowed"
                  : "border-gray-300 text-gray-600 hover:border-accent hover:text-accent"
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
      </div>
    </main>
  );
}
