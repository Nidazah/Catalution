"use client";

import { useEffect, useState } from "react";

type CareerApplication = {
  id: string;
  careerId: string;
  careerTitle: string;

  name: string;
  email: string;
  phone: string;
  coverLetter: string;

  cvUrl: string;
  cvFileName: string;
  cvFileType: string;
  cvFileSize: number;

  status: string;

  createdAt: string;
  updatedAt: string;

  career?: {
    id: string;
    title: string;
    department: string;
    location: string;
    type: string;
  };
};

const statuses = [
  "NEW",
  "REVIEWING",
  "SHORTLISTED",
  "REJECTED",
  "HIRED",
];

function formatFileSize(bytes: number) {
  if (bytes < 1024) {
    return `${bytes} B`;
  }

  if (bytes < 1024 * 1024) {
    return `${(bytes / 1024).toFixed(1)} KB`;
  }

  return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
}

function statusClasses(status: string) {
  switch (status) {
    case "SHORTLISTED":
      return "border-green-200 bg-green-50 text-green-700";

    case "REJECTED":
      return "border-red-200 bg-red-50 text-red-700";

    case "HIRED":
      return "border-blue-200 bg-blue-50 text-blue-700";

    case "REVIEWING":
      return "border-yellow-200 bg-yellow-50 text-yellow-700";

    default:
      return "border-gray-200 bg-gray-50 text-gray-700";
  }
}

export default function CareerApplicationsAdminPage() {
  const [applications, setApplications] = useState<
    CareerApplication[]
  >([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [selected, setSelected] =
    useState<CareerApplication | null>(null);

  async function loadApplications() {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        "/api/admin/career-applications",
        {
          cache: "no-store",
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data?.error ||
            "Failed to load applications.",
        );
      }

      setApplications(data.applications ?? []);
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Failed to load applications.",
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadApplications();
  }, []);

  async function updateStatus(
    id: string,
    status: string,
  ) {
    try {
      const response = await fetch(
        `/api/admin/career-applications/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            status,
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data?.error ||
            "Failed to update application status.",
        );
      }

      setApplications((current) =>
        current.map((application) =>
          application.id === id
            ? {
                ...application,
                status,
              }
            : application,
        ),
      );

      setSelected((current) =>
        current?.id === id
          ? {
              ...current,
              status,
            }
          : current,
      );
    } catch (error) {
      alert(
        error instanceof Error
          ? error.message
          : "Failed to update status.",
      );
    }
  }

  async function deleteApplication(id: string) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this application?",
    );

    if (!confirmed) {
      return;
    }

    try {
      const response = await fetch(
        `/api/admin/career-applications/${id}`,
        {
          method: "DELETE",
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data?.error ||
            "Failed to delete application.",
        );
      }

      setApplications((current) =>
        current.filter(
          (application) =>
            application.id !== id,
        ),
      );

      if (selected?.id === id) {
        setSelected(null);
      }
    } catch (error) {
      alert(
        error instanceof Error
          ? error.message
          : "Failed to delete application.",
      );
    }
  }

  if (loading) {
    return (
      <div className="p-8">
        <h1 className="text-3xl font-bold text-navy">
          Career Applications
        </h1>

        <div className="py-20 text-center text-sm text-gray-500">
          Loading applications...
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-8">
      <div className="mb-8 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-navy">
            Career Applications
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Applications submitted through the Careers
            page.
          </p>
        </div>

        <div className="rounded-full bg-orange-100 px-4 py-2 text-sm font-semibold text-navy">
          {applications.length}{" "}
          {applications.length === 1
            ? "Application"
            : "Applications"}
        </div>
      </div>

      {error && (
        <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-700">
          {error}
        </div>
      )}

      {applications.length === 0 ? (
        <div className="rounded-xl border border-gray-200 bg-white p-12 text-center">
          <h2 className="text-xl font-semibold text-navy">
            No applications yet
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            Applications submitted from the Careers page
            will appear here.
          </p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1000px] text-left">
              <thead className="border-b border-gray-200 bg-gray-50">
                <tr>
                  <th className="px-5 py-4 text-sm font-semibold text-navy">
                    Applicant
                  </th>

                  <th className="px-5 py-4 text-sm font-semibold text-navy">
                    Position
                  </th>

                  <th className="px-5 py-4 text-sm font-semibold text-navy">
                    Phone
                  </th>

                  <th className="px-5 py-4 text-sm font-semibold text-navy">
                    CV
                  </th>

                  <th className="px-5 py-4 text-sm font-semibold text-navy">
                    Status
                  </th>

                  <th className="px-5 py-4 text-sm font-semibold text-navy">
                    Date
                  </th>

                  <th className="px-5 py-4 text-sm font-semibold text-navy">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {applications.map((application) => (
                  <tr key={application.id}>
                    <td className="px-5 py-4">
                      <div className="font-semibold text-navy">
                        {application.name}
                      </div>

                      <div className="text-sm text-gray-500">
                        {application.email}
                      </div>
                    </td>

                    <td className="px-5 py-4">
                      <div className="font-medium text-navy">
                        {application.careerTitle}
                      </div>

                      {application.career
                        ?.department && (
                        <div className="text-xs text-gray-500">
                          {
                            application.career
                              .department
                          }
                        </div>
                      )}
                    </td>

                    <td className="px-5 py-4 text-sm text-gray-600">
                      {application.phone}
                    </td>

                    <td className="px-5 py-4">
                      <a
                        href={application.cvUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        download={application.cvFileName}
                        className="inline-flex items-center rounded-lg bg-navy px-4 py-2 text-xs font-semibold text-white transition hover:opacity-90"
                      >
                        Download CV
                      </a>

                      <div className="mt-1 text-[11px] text-gray-400">
                        {formatFileSize(
                          application.cvFileSize,
                        )}
                      </div>
                    </td>

                    <td className="px-5 py-4">
                      <select
                        value={application.status}
                        onChange={(e) =>
                          updateStatus(
                            application.id,
                            e.target.value,
                          )
                        }
                        className={`rounded-full border px-3 py-2 text-xs font-medium outline-none ${statusClasses(
                          application.status,
                        )}`}
                      >
                        {statuses.map((status) => (
                          <option
                            key={status}
                            value={status}
                          >
                            {status}
                          </option>
                        ))}
                      </select>
                    </td>

                    <td className="px-5 py-4 text-sm text-gray-500">
                      {new Date(
                        application.createdAt,
                      ).toLocaleDateString()}
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() =>
                            setSelected(
                              application,
                            )
                          }
                          className="rounded-lg bg-navy px-4 py-2 text-xs font-semibold text-white"
                        >
                          View
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            deleteApplication(
                              application.id,
                            )
                          }
                          className="rounded-lg border border-red-200 px-4 py-2 text-xs font-semibold text-red-600"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white p-6 md:p-8">
            <div className="mb-6 flex items-start justify-between">
              <div>
                <h2 className="text-2xl font-bold text-navy">
                  Application Details
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  {selected.careerTitle}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setSelected(null)}
                className="text-2xl text-gray-400 hover:text-gray-700"
                aria-label="Close"
              >
                ×
              </button>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <div>
                  <label className="text-xs font-semibold uppercase text-gray-400">
                    Applicant
                  </label>

                  <p className="mt-1 text-lg font-semibold text-navy">
                    {selected.name}
                  </p>
                </div>

                <div>
                  <label className="text-xs font-semibold uppercase text-gray-400">
                    Position
                  </label>

                  <p className="mt-1 text-lg font-semibold text-navy">
                    {selected.careerTitle}
                  </p>
                </div>

                <div>
                  <label className="text-xs font-semibold uppercase text-gray-400">
                    Email
                  </label>

                  <p className="mt-1 text-sm text-gray-700">
                    {selected.email}
                  </p>
                </div>

                <div>
                  <label className="text-xs font-semibold uppercase text-gray-400">
                    Phone
                  </label>

                  <p className="mt-1 text-sm text-gray-700">
                    {selected.phone}
                  </p>
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold uppercase text-gray-400">
                  Application Status
                </label>

                <select
                  value={selected.status}
                  onChange={(e) =>
                    updateStatus(
                      selected.id,
                      e.target.value,
                    )
                  }
                  className="mt-2 rounded-lg border border-gray-200 px-4 py-2 text-sm outline-none focus:border-accent"
                >
                  {statuses.map((status) => (
                    <option
                      key={status}
                      value={status}
                    >
                      {status}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold uppercase text-gray-400">
                  CV / Resume
                </label>

                <div className="mt-2 flex items-center justify-between rounded-xl border border-gray-200 bg-gray-50 p-4">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-navy">
                      {selected.cvFileName}
                    </p>

                    <p className="mt-1 text-xs text-gray-500">
                      {selected.cvFileType} ·{" "}
                      {formatFileSize(
                        selected.cvFileSize,
                      )}
                    </p>
                  </div>

                  <a
                    href={selected.cvUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    download={selected.cvFileName}
                    className="ml-4 shrink-0 rounded-lg bg-accent px-4 py-2 text-xs font-semibold text-white"
                  >
                    Download CV
                  </a>
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold uppercase text-gray-400">
                  Cover Letter
                </label>

                <div className="mt-2 whitespace-pre-wrap rounded-xl border border-gray-200 bg-gray-50 p-5 text-sm leading-relaxed text-gray-700">
                  {selected.coverLetter}
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold uppercase text-gray-400">
                  Applied
                </label>

                <p className="mt-1 text-sm text-gray-600">
                  {new Date(
                    selected.createdAt,
                  ).toLocaleString()}
                </p>
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setSelected(null)}
                  className="btn btn-primary"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}