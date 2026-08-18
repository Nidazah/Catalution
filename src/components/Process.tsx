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
      <div className="mx-auto max-w-7xl px-6 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 lg:gap-12 items-stretch">
          {image && (
            <ScrollReveal className="h-full">
              <div className="relative w-full h-full min-h-[300px] md:min-h-[450px] overflow-hidden rounded-2xl md:rounded-3xl shadow-sm">
                <Image
                  src={image}
                  alt=""
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </ScrollReveal>
          )}

          <ScrollReveal delay={0.15} className="h-full">
            <div className="flex flex-col justify-center h-full rounded-2xl md:rounded-3xl bg-white/60 backdrop-blur-[2px] p-6 md:p-8 shadow-sm border border-white/40">
              <div className="mb-7">
                {eyebrow && (
                  <span className="inline-flex items-center gap-2 rounded bg-orange-100 px-2.5 py-1 text-xs font-bold tracking-wider text-accent">
                    <span className="h-1 w-1 rounded-full bg-accent" />
                    {eyebrow}
                  </span>
                )}
                {title && (
                  <h2 className="mt-3 font-display text-3xl lg:text-4xl font-bold leading-tight text-heading">
                    {title}
                  </h2>
                )}
                {description && (
                  <p className="body-lg mt-3 text-body">{description}</p>
                )}
              </div>

              {items.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-4">
                  {items.map((item, index) => (
                    <div key={`${item.title || "step"}-${index}`} className="flex flex-col">
                      <div className="flex items-center mb-2">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-navy font-display text-sm font-bold text-white">
                          {String(index + 1).padStart(2, "0")}
                        </div>
                        <div className="h-px flex-1 ml-2 border-t border-dashed border-purple-300/60" />
                      </div>
                      {item.title && (
                        <h3 className="mt-3 font-display text-lg font-semibold text-heading">
                          {item.title}
                        </h3>
                      )}
                      {item.description && (
                        <p className="body-md mt-2 leading-relaxed text-body">
                          {item.description}
                        </p>
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
