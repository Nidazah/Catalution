"use client";

import Image from "next/image";
import ScrollReveal from "./ScrollReveal";

export type ProcessItem = {
  title?: string;
  description?: string;
  image?: string;
  meta?: string;
  link?: string;
};

type ProcessProps = {
  eyebrow?: string;
  title?: string;
  description?: string;
  image?: string;
  primaryButtonLabel?: string;
  primaryButtonUrl?: string;
  items?: ProcessItem[];
};

export default function Process({
  eyebrow,
  title,
  description,
  image,
  items = [],
}: ProcessProps) {
  if (!title && !items.length) return null;

  return (
    <section className="bg-[#F1EDFF] py-12 md:py-16">
      <div className="mx-auto w-full max-w-7xl px-6">
        <div className="cms-layout-content-image grid grid-cols-1 items-stretch gap-6 md:grid-cols-2 md:gap-8 lg:gap-12">

          {/* Main CMS Image */}
          {image && (
            <ScrollReveal className="cms-layout-role-image h-full">
              <div className="relative h-full min-h-[300px] w-full overflow-hidden rounded-2xl shadow-sm md:min-h-[450px] md:rounded-3xl">
                <Image
                  src={image}
                  alt={title || "Process"}
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </ScrollReveal>
          )}

          <ScrollReveal className="cms-layout-role-content h-full" delay={0.15}>
            <div className="flex h-full flex-col justify-center rounded-2xl border border-white/40 bg-white/60 p-6 shadow-sm backdrop-blur-[2px] md:rounded-3xl md:p-8">

              {/* Heading */}
              <div className="mb-7">
                {eyebrow && (
                  <span className="inline-flex items-center gap-2 rounded bg-orange-100 px-2.5 py-1 text-xs font-bold tracking-wider text-accent">
                    <span className="h-1 w-1 rounded-full bg-accent" />
                    {eyebrow}
                  </span>
                )}

                {title && (
                  <h2 className="mt-3 font-display text-3xl font-bold leading-tight text-heading lg:text-4xl">
                    {title}
                  </h2>
                )}

                {description && (
                  <p className="body-lg mt-3 text-body">
                    {description}
                  </p>
                )}
              </div>

              {/* CMS Items */}
              {items.length > 0 && (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 sm:gap-4">
                  {items.map((item, index) => (
                    <div
                      key={`${item.title || "step"}-${index}`}
                      className="flex flex-col"
                    >
                      {/* Item Image */}
                      {item.image && item.image.trim() !== "" ? (
                        <div className="relative mb-4 h-32 w-full overflow-hidden rounded-xl bg-[#eee9f8]">
                          <Image
                            src={item.image}
                            alt={item.title || `Process step ${index + 1}`}
                            fill
                            className="object-cover object-center transition-transform duration-500 hover:scale-105"
                            sizes="(max-width: 640px) 100vw, 33vw"
                          />
                        </div>
                      ) : null}

                      {/* Number */}
                      <div className="mb-2 flex items-center">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-navy font-display text-sm font-bold text-white">
                          {String(index + 1).padStart(2, "0")}
                        </div>

                        <div className="ml-2 h-px flex-1 border-t border-dashed border-purple-300/60" />
                      </div>

                      {/* Title */}
                      {item.title && (
                        <h3 className="mt-3 font-display text-lg font-semibold text-heading">
                          {item.title}
                        </h3>
                      )}

                      {/* Meta */}
                      {item.meta && (
                        <p className="mt-1 text-sm font-medium text-accent">
                          {item.meta}
                        </p>
                      )}

                      {/* Description */}
                      {item.description && (
                        <p className="body-md mt-2 leading-relaxed text-body">
                          {item.description}
                        </p>
                      )}

                      {/* Link */}
                      {item.link && (
                        <a
                          href={item.link}
                          className="mt-3 text-sm font-semibold text-accent underline underline-offset-4"
                        >
                          Learn more
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              )}

            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}