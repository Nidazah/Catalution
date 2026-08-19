"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import PageHero from "@/components/PageHero";
import { MapPin, Check, Upload, FileText } from "lucide-react";
import {
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaInstagram,
} from "react-icons/fa6";

type Career = {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  urgency: string | null;
  icon: string;
  description: string;
  requirements: string;
  requirementsGrid: string[] | null;
  responsibilities: string;
  responsibilitiesList: string[] | null;
  category: string;
  number: string;
  company: string;
  website: string | null;
  salary: string;
  vacancy: string;
  applyOn: string;
  tags: string[] | null;
};

const MAX_CV_SIZE = 5 * 1024 * 1024;

const ALLOWED_CV_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

const ALLOWED_CV_EXTENSIONS = [".pdf", ".doc", ".docx"];

function isAllowedCv(file: File) {
  const extension = file.name
    .slice(file.name.lastIndexOf("."))
    .toLowerCase();

  return (
    ALLOWED_CV_TYPES.includes(file.type) &&
    ALLOWED_CV_EXTENSIONS.includes(extension)
  );
}

export default function CareerDetailPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [job, setJob] = useState<Career | null>(null);
  const [jobs, setJobs] = useState<Career[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    cover: "",
  });

  const [cv, setCv] = useState<File | null>(null);
  const [cvError, setCvError] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState("");
  const [submitError, setSubmitError] = useState("");

  useEffect(() => {
    let cancelled = false;

    const id = params?.id;

    if (!id) {
      setError("Career ID is missing.");
      setLoading(false);
      return;
    }

    async function loadCareer() {
      try {
        setLoading(true);
        setError("");

        const [detailRes, listRes] = await Promise.all([
          fetch(`/api/careers/${encodeURIComponent(id)}`, {
            cache: "no-store",
          }),
          fetch("/api/careers", {
            cache: "no-store",
          }),
        ]);

        const detail = await detailRes.json();
        const list = await listRes.json();

        if (!detailRes.ok) {
          throw new Error(detail?.error || "Career not found");
        }

        if (!detail?.career) {
          throw new Error("Career not found");
        }

        if (!cancelled) {
          setJob(detail.career);

          setJobs(
            Array.isArray(list)
              ? list
              : Array.isArray(list?.careers)
                ? list.careers
                : [],
          );
        }
      } catch (err) {
        if (!cancelled) {
          setJob(null);

          setError(
            err instanceof Error
              ? err.message
              : "Could not load career",
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadCareer();

    return () => {
      cancelled = true;
    };
  }, [params?.id]);

  function handleCvChange(
    e: React.ChangeEvent<HTMLInputElement>,
  ) {
    setCvError("");

    const file = e.target.files?.[0];

    if (!file) {
      setCv(null);
      return;
    }

    if (file.size > MAX_CV_SIZE) {
      setCv(null);
      setCvError("CV file size must not exceed 5 MB.");

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      return;
    }

    if (!isAllowedCv(file)) {
      setCv(null);
      setCvError(
        "Only PDF, DOC, and DOCX files are allowed.",
      );

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      return;
    }

    setCv(file);
  }

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!job) {
      setSubmitError("Career information is not available.");
      return;
    }

    setSubmitting(true);
    setSuccess("");
    setSubmitError("");
    setCvError("");

    if (!cv) {
      setCvError("Please upload your CV.");
      setSubmitting(false);
      return;
    }

    if (cv.size > MAX_CV_SIZE) {
      setCvError("CV file size must not exceed 5 MB.");
      setSubmitting(false);
      return;
    }

    if (!isAllowedCv(cv)) {
      setCvError(
        "Only PDF, DOC, and DOCX files are allowed.",
      );
      setSubmitting(false);
      return;
    }

    try {
      const formData = new FormData();

      formData.append("careerId", job.id);
      formData.append("name", form.name);
      formData.append("email", form.email);
      formData.append("phone", form.phone);
      formData.append("coverLetter", form.cover);
      formData.append("cv", cv);

      const response = await fetch(
        "/api/career-applications",
        {
          method: "POST",
          body: formData,
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data?.error ||
            "Failed to submit your application.",
        );
      }

      setSuccess(
        "Your application has been submitted successfully. Thank you!",
      );

      setForm({
        name: "",
        email: "",
        phone: "",
        cover: "",
      });

      setCv(null);

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error) {
      setSubmitError(
        error instanceof Error
          ? error.message
          : "Failed to submit your application.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  /*
   * Loading state
   */
  if (loading) {
    return (
      <main className="min-h-screen bg-white">
        <PageHero title="Careers" />

        <div className="py-20 text-center text-sm text-gray-500">
          Loading career...
        </div>
      </main>
    );
  }

  /*
   * Error / career not found state
   *
   * IMPORTANT:
   * This prevents:
   *
   * Cannot read properties of null
   *
   * when the API returns { career: null }.
   */
  if (error || !job) {
    return (
      <main className="min-h-screen bg-white">
        <PageHero title="Careers" />

        <div className="mx-auto max-w-3xl px-6 py-20 text-center">
          <h1 className="text-3xl font-bold text-navy">
            Career not found
          </h1>

          <p className="mt-3 text-sm text-gray-500">
            {error ||
              "The career you are looking for does not exist or is no longer available."}
          </p>

          <button
            type="button"
            onClick={() => router.push("/careers")}
            className="btn btn-primary mt-7"
          >
            Back to Careers
          </button>
        </div>
      </main>
    );
  }

  /*
   * At this point TypeScript and runtime both know
   * that job exists.
   */
  const index = jobs.findIndex(
    (item) => item.id === job.id,
  );

  const previous =
    jobs.length > 1
      ? index > 0
        ? jobs[index - 1]
        : jobs[jobs.length - 1]
      : null;

  const next =
    jobs.length > 1
      ? index >= 0 && index < jobs.length - 1
        ? jobs[index + 1]
        : jobs[0]
      : null;

  const requirementsGrid =
    job.requirementsGrid ?? [];

  const responsibilities =
    job.responsibilitiesList ?? [];

  const tags = job.tags ?? [];

  return (
    <main className="min-h-screen bg-white">
      <PageHero title={job.title} />

      <div className="mx-auto w-full max-w-7xl px-6 py-10 md:py-12">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
          <div className="space-y-10 lg:col-span-8">

            {/* Job Header */}
            <div className="rounded-lg bg-orange-100 p-7 md:p-9">
              <div className="flex items-start gap-5">
                <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-lg bg-accent text-white">
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="h-10 w-10"
                  >
                    <circle cx="12" cy="12" r="3" />
                    <circle cx="4" cy="12" r="2" />
                    <circle cx="20" cy="12" r="2" />
                    <circle cx="12" cy="4" r="2" />
                    <circle cx="12" cy="20" r="2" />
                  </svg>
                </div>

                <div>
                  <div className="mb-2 flex flex-wrap gap-2">
                    <span className="rounded-full border border-gray-400/40 bg-white/50 px-3 py-1 text-[12px] font-medium text-gray-600">
                      {job.type}
                    </span>

                    {job.urgency && (
                      <span className="rounded-full border border-gray-400/40 bg-white/50 px-3 py-1 text-[12px] font-medium text-gray-600">
                        {job.urgency}
                      </span>
                    )}
                  </div>

                  <h1 className="text-3xl font-bold text-navy md:text-4xl">
                    {job.title}
                  </h1>

                  <div className="mt-2 flex items-center gap-1.5 text-sm font-medium text-navy">
                    <MapPin className="h-4 w-4" />
                    {job.location}
                  </div>
                </div>
              </div>
            </div>

            {/* Job Description */}
            <section>
              <h2 className="mb-3 text-2xl font-bold text-navy">
                Job Description
              </h2>

              <p className="text-[15px] leading-relaxed text-gray-600">
                {job.description}
              </p>
            </section>

            {/* Requirements */}
            <section>
              <h2 className="mb-3 text-2xl font-bold text-navy">
                Requirements
              </h2>

              <p className="mb-6 text-[15px] leading-relaxed text-gray-600">
                {job.requirements}
              </p>

              {requirementsGrid.length > 0 && (
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  {requirementsGrid.map((item, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-3 border border-gray-200 p-5"
                    >
                      <Check className="mt-0.5 h-5 w-5 shrink-0 text-accent" />

                      <p className="text-sm leading-relaxed text-navy">
                        {item}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </section>

            {/* Responsibilities */}
            <section>
              <h2 className="mb-3 text-2xl font-bold text-navy">
                Responsibilities
              </h2>

              <p className="mb-4 text-[15px] leading-relaxed text-gray-600">
                {job.responsibilities}
              </p>

              {responsibilities.length > 0 && (
                <ul className="space-y-2.5">
                  {responsibilities.map((item, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 text-sm font-medium text-navy"
                    >
                      <Check className="mt-0.5 h-5 w-5 shrink-0 text-accent" />

                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </section>

            {/* Tags + Share */}
            <div className="flex flex-col gap-4 border-t border-gray-200 pt-7 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex flex-wrap items-center gap-2">
                <span className="mr-1 text-sm font-medium text-navy">
                  Tags:
                </span>

                {tags.length > 0 ? (
                  tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-gray-200 px-3 py-1 text-xs text-gray-600"
                    >
                      {tag}
                    </span>
                  ))
                ) : (
                  <span className="text-xs text-gray-400">
                    No tags
                  </span>
                )}
              </div>

              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-navy">
                  Share:
                </span>

                <FaFacebook className="cursor-pointer" />
                <FaTwitter className="cursor-pointer" />
                <FaLinkedin className="cursor-pointer" />
                <FaInstagram className="cursor-pointer" />
              </div>
            </div>

            {/* Previous / Next */}
            {jobs.length > 1 && (
              <div className="flex items-center justify-between border-t border-gray-200 pt-7">
                <button
                  type="button"
                  disabled={!previous}
                  onClick={() =>
                    previous &&
                    router.push(
                      `/careers/${previous.id}`,
                    )
                  }
                  className="h-11 w-11 rounded-full border text-xl disabled:cursor-not-allowed disabled:opacity-40"
                >
                  ←
                </button>

                <span className="text-sm text-gray-500">
                  {index >= 0 ? index + 1 : 1} /{" "}
                  {jobs.length}
                </span>

                <button
                  type="button"
                  disabled={!next}
                  onClick={() =>
                    next &&
                    router.push(`/careers/${next.id}`)
                  }
                  className="h-11 w-11 rounded-full border text-xl disabled:cursor-not-allowed disabled:opacity-40"
                >
                  →
                </button>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <aside className="space-y-8 lg:col-span-4">

            {/* Job Information */}
            <div className="rounded-lg border border-gray-200 p-6">
              <h3 className="mb-5 inline-block border-b-2 border-accent pb-2 text-xl font-bold text-navy">
                Job information
              </h3>

              <div className="divide-y divide-gray-200 rounded-lg border border-gray-200 text-sm">
                {[
                  ["Category", job.category],
                  ["Number", job.number],
                  ["Company", job.company],
                  ["Website", job.website || "—"],
                  ["Salary", job.salary],
                  ["Vacancy", job.vacancy],
                  ["Apply on", job.applyOn],
                ].map(([label, value]) => (
                  <div
                    key={label}
                    className="flex p-4"
                  >
                    <span className="w-28 shrink-0 font-medium text-gray-500">
                      {label}
                    </span>

                    <span>:</span>

                    <span className="pl-3 font-medium text-navy">
                      {value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Apply Online */}
            <div className="rounded-lg border border-gray-200 p-6">
              <h3 className="mb-6 inline-block border-b-2 border-accent pb-2 text-xl font-bold text-navy">
                Apply online
              </h3>

              <form
                onSubmit={submit}
                className="space-y-4"
              >
                {/* Success */}
                {success && (
                  <div className="rounded-sm border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
                    {success}
                  </div>
                )}

                {/* Error */}
                {submitError && (
                  <div className="rounded-sm border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                    {submitError}
                  </div>
                )}

                {/* Name */}
                <input
                  required
                  value={form.name}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      name: e.target.value,
                    })
                  }
                  placeholder="Full name*"
                  className="w-full rounded-sm border border-gray-300 px-4 py-3 text-sm outline-none focus:border-accent"
                />

                {/* Email */}
                <input
                  required
                  type="email"
                  value={form.email}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      email: e.target.value,
                    })
                  }
                  placeholder="Enter email*"
                  className="w-full rounded-sm border border-gray-300 px-4 py-3 text-sm outline-none focus:border-accent"
                />

                {/* Phone */}
                <input
                  required
                  value={form.phone}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      phone: e.target.value,
                    })
                  }
                  placeholder="Phone number*"
                  className="w-full rounded-sm border border-gray-300 px-4 py-3 text-sm outline-none focus:border-accent"
                />

                {/* CV */}
                <div>
                  <label
                    htmlFor="career-cv"
                    className="mb-2 block text-sm font-medium text-navy"
                  >
                    CV / Resume*
                  </label>

                  <label
                    htmlFor="career-cv"
                    className="flex cursor-pointer items-center gap-3 rounded-sm border border-dashed border-gray-300 px-4 py-4 transition hover:border-accent"
                  >
                    <Upload className="h-5 w-5 shrink-0 text-accent" />

                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium text-navy">
                        {cv
                          ? cv.name
                          : "Choose your CV"}
                      </p>

                      <p className="mt-1 text-xs text-gray-500">
                        PDF, DOC or DOCX · Maximum 5 MB
                      </p>
                    </div>

                    <input
                      ref={fileInputRef}
                      id="career-cv"
                      type="file"
                      accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                      onChange={handleCvChange}
                      className="hidden"
                    />
                  </label>

                  {cv && !cvError && (
                    <div className="mt-2 flex items-center gap-2 text-xs text-gray-500">
                      <FileText className="h-4 w-4" />

                      <span>
                        {(cv.size / 1024 / 1024).toFixed(
                          2,
                        )}{" "}
                        MB
                      </span>
                    </div>
                  )}

                  {cvError && (
                    <p className="mt-2 text-xs text-red-600">
                      {cvError}
                    </p>
                  )}
                </div>

                {/* Cover Letter */}
                <textarea
                  required
                  value={form.cover}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      cover: e.target.value,
                    })
                  }
                  placeholder="Cover letter*"
                  className="h-28 w-full resize-none rounded-sm border border-gray-300 px-4 py-3 text-sm outline-none focus:border-accent"
                />

                {/* Submit */}
                <button
                  type="submit"
                  disabled={submitting}
                  className="btn btn-primary mt-2 w-full justify-center disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {submitting
                    ? "Submitting..."
                    : "Submit now"}
                </button>
              </form>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}