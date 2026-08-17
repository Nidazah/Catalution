"use client"

import { useEffect, useState } from "react"
import PageHero from "@/components/PageHero"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"

type Service = {
  ctaLabel: string
  id: string
  title: string
  slug: string
  shortDescription?: string | null
  description: string
  icon?: string | null
  image: string
  active: boolean
  published: boolean
  sortOrder: number
}

const ServiceIcon = ({
  type,
  isHovered,
}: {
  type?: string | null
  isHovered?: boolean
}) => {
  return (
    <div
      className={`w-20 h-20 rounded-full flex items-center justify-center mb-6 shrink-0 transition-colors duration-300 ${
        isHovered ? "bg-white/20" : "bg-orange-100"
      }`}
    >
      <div
        className={`relative w-10 h-10 transition-colors duration-300 ${
          isHovered ? "text-white" : "text-accent"
        }`}
      >
        {type === "boxes" && (
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M4 4h16v16H4V4zm2 2v12h12V6H6zm2 2h8v2H8V8zm0 4h8v2H8v-2zm0 4h4v2H8v-2z" />
          </svg>
        )}

        {type === "users" && (
          <svg viewBox="0 0 24 24" fill="currentColor">
            <circle cx="12" cy="8" r="4" />
            <path d="M5.3 18.3C6.8 16.9 9.2 16 12 16s5.2.9 6.7 2.3C19.4 18.8 20 17.5 20 16c0-4.4-3.6-8-8-8S4 11.6 4 16c0 1.5.6 2.8 1.3 2.3z" />
          </svg>
        )}

        {type === "sparkles" && (
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2l2.4 7.2h7.6l-6 4.8 2.4 7.2-6-4.8-6 4.8 2.4-7.2-6-4.8h7.6z" />
          </svg>
        )}

        {type === "circledot" && (
          <svg viewBox="0 0 24 24" fill="currentColor">
            <circle cx="12" cy="12" r="10" />
            <circle cx="12" cy="12" r="4" fill="white" />
          </svg>
        )}

        {type === "repeat" && (
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 4V1L8 5l4 4V6c3.3 0 6 2.7 6 6s-2.7 6-6 6v2c4.4 0 8-3.6 8-8s-3.6-8-8-8zm0 14c-3.3 0-6-2.7-6-6s2.7-6 6-6v3l4-4-4-4V1v3z" />
          </svg>
        )}

        {!["boxes", "users", "sparkles", "circledot", "repeat"].includes(
          type ?? ""
        ) && (
          <svg viewBox="0 0 24 24" fill="currentColor">
            <circle
              cx="12"
              cy="12"
              r="9"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            />
            <circle cx="12" cy="12" r="3" />
          </svg>
        )}
      </div>
    </div>
  )
}

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  const itemsPerPage = 6

  useEffect(() => {
    async function loadServices() {
      try {
        setLoading(true)

        const response = await fetch("/api/services", {
          cache: "no-store",
        })

        if (!response.ok) {
          throw new Error("Failed to load services")
        }

        const data = await response.json()

        setServices(Array.isArray(data?.services) ? data.services : [])
      } catch (err) {
        console.error("Failed to load services:", err)
        setError("Unable to load services.")
      } finally {
        setLoading(false)
      }
    }

    loadServices()
  }, [])

  const totalPages = Math.ceil(services.length / itemsPerPage)

  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage

  const currentServices = services.slice(
    indexOfFirstItem,
    indexOfLastItem
  )

  const paginate = (pageNumber: number) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber)
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  return (
    <main className="min-h-screen bg-white pb-16">
      <PageHero title="Services" />

      <div className="w-full max-w-6xl mx-auto px-6 py-12">

        {loading && (
          <div className="flex justify-center py-20">
            <p className="text-gray-500">Loading services...</p>
          </div>
        )}

        {!loading && error && (
          <div className="text-center py-20">
            <p className="text-red-500">{error}</p>
          </div>
        )}

        {!loading && !error && services.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-500">
              No services are currently available.
            </p>
          </div>
        )}

        {!loading && !error && services.length > 0 && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentServices.map((service, idx) => {
                const globalIndex = indexOfFirstItem + idx + 1

                return (
                  <Link
                    key={service.id}
                    href={`/services/${service.slug}`}
                    className="media-card media-card--3-4 group bg-white border border-gray-300 hover:shadow-xl transition-all duration-300"
                  >
                    <div className="media-card__hover-layer opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out">
                      <Image
                        src={service.image}
                        alt={service.title}
                        fill
                        className="object-cover"
                      />

                      <div className="media-card__overlay bg-gradient-to-r from-navy/90 via-navy/70 to-transparent" />
                    </div>

                    <div className="media-card__content flex flex-col h-full p-8 transition-colors duration-300 group-hover:text-white">

                      <div className="mb-4 text-[14px] font-bold text-[#9CA3AF] group-hover:text-white/70">
                        {globalIndex.toString().padStart(2, "0")}
                      </div>

                      <ServiceIcon
                        type={service.icon}
                        isHovered={true}
                      />

                      <h3 className="text-2xl font-bold text-navy group-hover:text-white mb-3 transition-colors">
                        {service.title}
                      </h3>

                      <p className="flex-1 text-[15px] text-[#4B5563] group-hover:text-gray-200 leading-relaxed transition-colors">
                        {service.shortDescription ||
                          service.description}
                      </p>

                      <div className="mt-6 flex items-center gap-2 text-[14px] font-bold text-navy group-hover:text-white transition-colors">
                        {service.ctaLabel || "Get optimization"}

                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>

            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-12">

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
                  ←
                </button>

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
                  >
                    {number.toString().padStart(2, "0")}
                  </button>
                ))}

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
                  →
                </button>

              </div>
            )}
          </>
        )}
      </div>
    </main>
  )
}