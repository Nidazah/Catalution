"use client";

import { useEffect, useMemo, useState } from "react";
import PageHero from "@/components/PageHero";
import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";

type Career = {
  id: string;
  title: string;
  location: string;
  type: string;
  urgency: string | null;
  icon: string;
  salary: string;
  tags: string[] | null;
  active: boolean;
  published: boolean;
};

function JobIcon({ type }: { type: string }) {
  return (
    <div className="mb-5 flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-orange-100">
      <div className="h-8 w-8 text-accent">
        {type === "people" ? (
          <svg viewBox="0 0 24 24" fill="currentColor"><circle cx="9" cy="8" r="4" /><circle cx="15" cy="10" r="3" /><path d="M9 14c-4.42 0-8 1.79-8 4v2h16v-2c0-2.21-3.58-4-8-4z" /><path d="M15 14c-1.1 0-2.1.15-3 .42v1.58c0 1.1.9 2 2 2h4v-2c0-1.1-.9-2-2-2z" /></svg>
        ) : type === "triangle" ? (
          <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L2 22h20L12 2zm0 4.5l6.5 13.5h-13L12 6.5z" /></svg>
        ) : type === "eye" ? (
          <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" /></svg>
        ) : (
          <svg viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="3" /><circle cx="4" cy="12" r="2" /><circle cx="20" cy="12" r="2" /><circle cx="12" cy="4" r="2" /><circle cx="12" cy="20" r="2" /></svg>
        )}
      </div>
    </div>
  );
}

export default function CareersPage() {
  const [careers, setCareers] = useState<Career[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const itemsPerPage = 6;

  useEffect(() => {
    let cancelled = false;
    fetch("/api/careers", { cache: "no-store" })
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Could not load careers");
        return Array.isArray(data) ? data : data.careers ?? [];
      })
      .then((data) => { if (!cancelled) setCareers(data); })
      .catch((err) => { if (!cancelled) setError(err instanceof Error ? err.message : "Could not load careers"); })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, []);

  const totalPages = Math.max(1, Math.ceil(careers.length / itemsPerPage));
  const currentJobs = useMemo(() => careers.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage), [careers, currentPage]);

  useEffect(() => { if (currentPage > totalPages) setCurrentPage(totalPages); }, [currentPage, totalPages]);

  return (
    <main className="min-h-screen bg-white">
      <PageHero title="Careers" />
      <div className="mx-auto w-full max-w-7xl px-6 py-14 md:py-16">
        {loading ? <div className="py-20 text-center text-sm text-gray-500">Loading careers...</div> : error ? <div className="rounded-lg border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-700">{error}</div> : careers.length === 0 ? <div className="py-20 text-center"><h2 className="text-xl font-semibold text-navy">No open positions</h2><p className="mt-2 text-sm text-gray-500">Please check back later for new opportunities.</p></div> : (
          <>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {currentJobs.map((job) => {
                const tags = (job.tags ?? []).filter(Boolean);
                if (!tags.length) { if (job.type) tags.push(job.type); if (job.urgency) tags.push(job.urgency); }
                return <Link key={job.id} href={`/careers/${job.id}`} className="group flex min-h-[330px] flex-col items-start border border-gray-200 bg-white p-8 transition-all duration-300 hover:shadow-lg">
                  <JobIcon type={job.icon} />
                  <div className="mb-4 flex flex-wrap gap-2">{tags.map((tag) => <span key={tag} className="rounded-full border border-gray-200 px-3 py-1 text-[11px] font-medium text-gray-600 group-hover:border-orange-300">{tag}</span>)}</div>
                  <h3 className="mb-1 text-xl font-bold text-navy group-hover:text-accent">{job.title}</h3>
                  <p className="mb-6 text-[15px] font-medium text-[#9CA3AF]">{job.salary}</p>
                  <div className="mt-auto flex w-full items-center justify-between border-t border-gray-100 pt-4"><div className="flex items-center gap-1.5 text-[13px] font-medium text-gray-500"><MapPin className="h-4 w-4" /><span>{job.location}</span></div><span className="inline-flex items-center gap-1.5 text-[13px] font-bold text-navy group-hover:text-accent">Apply now<ArrowRight className="h-4 w-4 group-hover:translate-x-0.5" /></span></div>
                </Link>;
              })}
            </div>
            {totalPages > 1 && <div className="mt-12 flex items-center justify-center gap-2"><button type="button" onClick={() => setCurrentPage((p) => Math.max(1, p - 1))} disabled={currentPage === 1} className="h-10 w-10 rounded-full border text-lg disabled:opacity-40" aria-label="Previous page">←</button>{Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => <button key={page} type="button" onClick={() => setCurrentPage(page)} className={`h-10 w-10 rounded-full border text-sm ${currentPage === page ? "border-accent bg-accent text-white" : "border-gray-200 text-gray-600"}`}>{page}</button>)}<button type="button" onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} className="h-10 w-10 rounded-full border text-lg disabled:opacity-40" aria-label="Next page">→</button></div>}
          </>
        )}
      </div>
    </main>
  );
}
