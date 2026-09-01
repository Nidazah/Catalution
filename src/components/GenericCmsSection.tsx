import Link from "next/link";

type CmsItem = {
  title?: string;
  description?: string;
  image?: string;
  meta?: string;
  link?: string;
  icon?: string;
  badge?: string;
  tags?: string[];
};

type Props = {
  eyebrow?: string | null;
  title?: string | null;
  description?: string | null;
  image?: string | null;
  primaryButtonLabel?: string | null;
  primaryButtonUrl?: string | null;
  secondaryButtonLabel?: string | null;
  secondaryButtonUrl?: string | null;
  items?: CmsItem[];
};

function ActionLink({ label, href, secondary = false }: { label?: string | null; href?: string | null; secondary?: boolean }) {
  if (!label || !href) return null;
  const className = secondary
    ? "inline-flex items-center justify-center rounded-full border border-[#dfe2e8] bg-white px-5 py-3 text-sm font-semibold text-[#151525] transition hover:border-[#4B1D96] hover:text-[#4B1D96]"
    : "inline-flex items-center justify-center rounded-full bg-[#4B1D96] px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90";

  if (href.startsWith("#") || href.startsWith("/") || href.startsWith("mailto:") || href.startsWith("tel:")) {
    return <Link href={href} className={className}>{label}</Link>;
  }

  return <a href={href} className={className} target="_blank" rel="noreferrer">{label}</a>;
}

export default function GenericCmsSection({
  eyebrow,
  title,
  description,
  image,
  primaryButtonLabel,
  primaryButtonUrl,
  secondaryButtonLabel,
  secondaryButtonUrl,
  items = [],
}: Props) {
  const visibleItems = items.filter((item) => item && (item.title || item.description || item.image || item.icon));

  return (
    <section className="relative w-full overflow-hidden bg-white py-14 sm:py-16 lg:py-20">
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="grid gap-10 lg:grid-cols-[1fr_0.85fr] lg:items-center">
          <div>
            {eyebrow ? (
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-[#4B1D96]">{eyebrow}</p>
            ) : null}
            {title ? (
              <h2 className="max-w-3xl text-3xl font-bold tracking-tight text-[#151525] sm:text-4xl lg:text-5xl">{title}</h2>
            ) : null}
            {description ? (
              <p className="mt-5 max-w-2xl text-base leading-7 text-[#5e6270] sm:text-lg">{description}</p>
            ) : null}

            {(primaryButtonLabel && primaryButtonUrl) || (secondaryButtonLabel && secondaryButtonUrl) ? (
              <div className="mt-7 flex flex-wrap gap-3">
                <ActionLink label={primaryButtonLabel} href={primaryButtonUrl} />
                <ActionLink label={secondaryButtonLabel} href={secondaryButtonUrl} secondary />
              </div>
            ) : null}
          </div>

          {image ? (
            <div className="overflow-hidden rounded-3xl border border-[#e7e9ef] bg-[#f7f7f9] shadow-sm">
              <img src={image} alt={title || "Section image"} className="h-full max-h-[440px] w-full object-cover" />
            </div>
          ) : null}
        </div>

        {visibleItems.length > 0 ? (
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {visibleItems.map((item, index) => (
              <article key={`${item.title || "item"}-${index}`} className="group overflow-hidden rounded-2xl border border-[#e7e9ef] bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
                {item.image ? (
                  <div className="aspect-[16/10] overflow-hidden bg-[#f7f7f9]">
                    <img src={item.image} alt={item.title || "Item image"} className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.02]" />
                  </div>
                ) : null}
                <div className="p-6">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      {item.icon ? <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#ece6f7] text-sm font-bold text-[#4B1D96]">{item.icon}</span> : null}
                      <div>
                        {item.meta ? <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#4B1D96]">{item.meta}</p> : null}
                        {item.title ? <h3 className="font-bold text-[#151525]">{item.title}</h3> : null}
                      </div>
                    </div>
                    {item.badge ? <span className="rounded-full bg-[#f1eff6] px-3 py-1 text-xs font-semibold text-[#4B1D96]">{item.badge}</span> : null}
                  </div>

                  {item.description ? <p className="mt-3 text-sm leading-6 text-[#626674]">{item.description}</p> : null}

                  {item.tags?.length ? (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {item.tags.map((tag, tagIndex) => <span key={`${tag}-${tagIndex}`} className="rounded-full bg-[#f4f4f6] px-2.5 py-1 text-xs text-[#626674]">{tag}</span>)}
                    </div>
                  ) : null}

                  {item.link ? (
                    <div className="mt-5">
                      <ActionLink label="Learn more →" href={item.link} secondary />
                    </div>
                  ) : null}
                </div>
              </article>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}
