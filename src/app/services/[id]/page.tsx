import { notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Boxes, Check, CircleDot, Play, Repeat2, Sparkles, Users, Waves } from "lucide-react"
import PageHero from "@/components/PageHero"
import ServiceFAQ from "@/components/ServiceFAQ"
import ServicesSidebar from "@/components/ServicesSidebar"
import { prisma } from "@/lib/prisma"

type Feature = { title: string; description: string; icon: string }
const iconMap = { waves: Waves, boxes: Boxes, users: Users, sparkles: Sparkles, circledot: CircleDot, repeat: Repeat2 }

function readStringArray(value: unknown): string[] {
  return Array.isArray(value) ? value.filter((item): item is string => typeof item === "string") : []
}

function readFeatures(value: unknown): Feature[] {
  if (!Array.isArray(value)) return []
  return value
    .filter((item): item is Feature => 
      typeof item === "object" && 
      item !== null && 
      typeof (item as Feature).title === "string" && 
      typeof (item as Feature).description === "string"
    )
    .map(item => ({ 
      title: (item as Feature).title, 
      description: (item as Feature).description, 
      icon: (item as Feature).icon || "sparkles" 
    }))
}

type FAQItem = { q: string; a: string }

export default async function ServicePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  const service = await prisma.service.findFirst({
    where: {
      slug: id,
      active: true,
      published: true,
    },
  })

  if (!service) {
    notFound()
  }

  const [services, features, overviewItems, faqSection] = await Promise.all([
    prisma.service.findMany({ 
      where: { active: true, published: true }, 
      orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }], 
      select: { id: true, slug: true, title: true } 
    }),
    Promise.resolve(readFeatures(service.features)),
    Promise.resolve(readStringArray(service.overviewItems)),
    prisma.contentSection.findFirst({ 
      where: { sectionKey: "FAQ", published: true } 
    }),
  ])

  const faqItems: FAQItem[] = Array.isArray(faqSection?.items)
    ? (faqSection.items as unknown as { title: string; description: string }[])
        .filter((item) => item && typeof item.title === "string" && typeof item.description === "string")
        .map((item) => ({ q: item.title, a: item.description }))
    : []

  const currentIndex = services.findIndex(item => item.id === service.id)
  const previous = currentIndex > 0 ? services[currentIndex - 1] : null
  const next = currentIndex >= 0 && currentIndex < services.length - 1 ? services[currentIndex + 1] : null
  const heroImage2 = service.heroImage2 || service.image
  const fullDescription = service.fullDescription || service.description

  return (
    <main className="service-detail min-h-screen bg-white">
      <PageHero title={service.title} />
      <div className="mx-auto w-full max-w-6xl px-6 py-16">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="space-y-12 lg:col-span-8">
            <div className="flex items-center justify-between">
              <div>
                {previous ? (
                  <Link 
                    href={`/services/${previous.slug}`} 
                    aria-label="Previous service" 
                    className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-gray-300 text-gray-600 hover:border-accent hover:text-accent"
                  >
                    <span aria-hidden>←</span>
                  </Link>
                ) : (
                  <div className="h-11 w-11" />
                )}
              </div>
              {next ? (
                <Link 
                  href={`/services/${next.slug}`} 
                  aria-label="Next service" 
                  className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-gray-300 text-gray-600 hover:border-accent hover:text-accent"
                >
                  <span aria-hidden>→</span>
                </Link>
              ) : (
                <div className="h-11 w-11" />
              )}
            </div>

            <div className="relative aspect-[16/9] w-full overflow-hidden bg-gray-100">
              <Image 
                src={service.image} 
                alt={service.title} 
                fill 
                priority 
                className="object-cover" 
                sizes="(max-width: 1024px) 100vw, 66vw" 
              />
            </div>

            <div>
              <h1 className="mb-4 text-3xl font-bold leading-tight text-navy md:text-4xl">
                {service.title}
              </h1>
              <div className="space-y-4 text-[15px] leading-relaxed text-gray-600">
                <p>{fullDescription}</p>
                {service.shortDescription && <p>{service.shortDescription}</p>}
              </div>
            </div>

            {overviewItems.length > 0 && (
              <div>
                <h2 className="mb-3 text-2xl font-bold text-navy">Service overview</h2>
                <p className="mb-6 text-[15px] leading-relaxed text-gray-600">
                  Key outcomes and benefits of {service.title}.
                </p>
                <div className="grid grid-cols-1 border-l border-t border-gray-300 md:grid-cols-2">
                  {overviewItems.map((item, index) => (
                    <div 
                      key={`${item}-${index}`} 
                      className="flex items-start gap-3 border-b border-r border-gray-300 bg-white p-5"
                    >
                      <Check className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                      <p className="text-[14px] font-medium leading-relaxed text-navy">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-100">
                <Image 
                  src={service.image} 
                  alt={`${service.title} detail`} 
                  fill 
                  className="object-cover" 
                  sizes="(max-width: 768px) 100vw, 50vw" 
                />
              </div>
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-100">
                <Image 
                  src={heroImage2} 
                  alt={`${service.title} secondary`} 
                  fill 
                  className="object-cover" 
                  sizes="(max-width: 768px) 100vw, 50vw" 
                />
              </div>
            </div>

            {features.length > 0 && (
              <div>
                <h2 className="mb-3 text-2xl font-bold text-navy">Key features</h2>
                <p className="mb-6 text-[15px] leading-relaxed text-gray-600">
                  Explore the capabilities included in our {service.title} engagement.
                </p>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                  {features.map((feature, index) => {
                    const Icon = iconMap[feature.icon as keyof typeof iconMap] ?? Sparkles
                    return (
                      <div key={`${feature.title}-${index}`} className="rounded-sm bg-orange-100 p-6">
                        <Icon className="mb-4 h-7 w-7 text-accent" />
                        <h4 className="mb-2 text-[17px] font-bold text-navy">{feature.title}</h4>
                        <p className="text-[14px] leading-relaxed text-[#4B5563]">{feature.description}</p>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}

            <div className="relative mt-4 aspect-[21/9] w-full overflow-hidden bg-navy">
              <Image 
                src={heroImage2} 
                alt="" 
                fill 
                className="object-cover opacity-60" 
                sizes="(max-width: 1024px) 100vw, 66vw" 
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white shadow-xl">
                  <Play className="ml-1 h-8 w-8 fill-navy text-navy" />
                </div>
              </div>
            </div>

            <div className="mt-12">
              <h2 className="mb-6 text-2xl font-bold text-navy">General questions</h2>
              <ServiceFAQ items={faqItems} />
            </div>
          </div>

          <div className="space-y-10 lg:col-span-4">
            <ServicesSidebar activeId={service.id} />
            <div className="relative flex h-[420px] flex-col justify-between overflow-hidden border border-gray-300 bg-white p-6">
              <div className="absolute inset-0 z-0">
                <Image 
                  src={service.image} 
                  alt="" 
                  fill 
                  className="object-cover opacity-20 grayscale" 
                  sizes="(max-width: 1024px) 100vw, 33vw" 
                />
                <div className="absolute inset-0 bg-gradient-to-b from-navy/80 via-navy/60 to-navy/90" />
              </div>
              <div className="relative z-10 pt-2">
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-lg bg-accent text-white">
                  <Waves className="h-7 w-7" />
                </div>
                <h3 className="mb-3 text-2xl font-bold leading-tight text-white">
                  Need help?<br />Feel free to contact us
                </h3>
                <p className="max-w-[220px] text-sm leading-relaxed text-orange-100/80">
                  Talk to our team about how {service.title} can support your business.
                </p>
              </div>
              <div className="relative z-10">
                <Link 
                  href={service.ctaUrl || "/contact"} 
                  className="inline-flex items-center gap-3 rounded-full bg-white py-2 pl-2 pr-6 text-[14px] font-semibold text-navy shadow-lg hover:bg-gray-100"
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-accent text-white">
                    <ArrowRight className="h-4 w-4" />
                  </span>
                  {service.ctaLabel}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}