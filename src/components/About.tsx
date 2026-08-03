import Image from "next/image";

export default function AboutSection() {
  return (
    <section className="relative w-full overflow-hidden bg-[#f5f6f8] py-16 md:py-20 lg:py-[68px]">
      <style>{`
        @keyframes floatY {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        .animate-float-slow {
          animation: floatY 4s ease-in-out infinite;
        }

        @keyframes spinSlow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        .animate-spin-slow {
          animation: spinSlow 8s linear infinite;
        }
      `}</style>

      <div className="mx-auto grid max-w-[1020px] grid-cols-1 items-center gap-14 px-6 md:grid-cols-[390px_1fr] md:gap-[68px] lg:px-0">
        {/* =====================================================
            LEFT IMAGE AREA
        ====================================================== */}
        <div className="relative mx-auto w-full max-w-[390px]">
          {/* Main image */}
          <div className="relative h-[450px] w-full overflow-hidden rounded-[3px] md:h-[420px]">
            <Image
              src="/images/about/h5-about-1.webp"
              alt="Team collaborating around a laptop"
              fill
              priority
              sizes="390px"
              className="object-cover"
            />

            {/* Bottom dark gradient */}
            <div className="absolute inset-x-0 bottom-0 h-[125px] bg-gradient-to-t from-[#07162e]/95 via-[#07162e]/40 to-transparent" />

            {/* Reach 20M */}
            <div className="absolute bottom-7 left-4">
              <p className="text-[31px] font-light leading-none tracking-tight text-white">
                Reach <span className="font-bold text-white">20M</span>
              </p>
            </div>
          </div>

          {/* =================================================
              AWARD BADGE
          ================================================== */}
          <div className="absolute -left-[17px] top-[112px] z-20 flex h-[91px] w-[91px] items-center justify-center rounded-full border-[5px] border-white bg-[#1674ed] shadow-md">
            {/* Circular text — rotates continuously */}
            <svg
              viewBox="0 0 120 120"
              className="absolute inset-0 h-full w-full animate-spin-slow"
            >
              <defs>
                <path
                  id="badgeCircle"
                  d="M 60,60 m -44,0 a 44,44 0 1,1 88,0 a 44,44 0 1,1 -88,0"
                />
              </defs>

              <text
                fill="white"
                fontSize="7.2"
                fontWeight="600"
                letterSpacing="1.5"
              >
                <textPath href="#badgeCircle" startOffset="1%">
                  AWARD WINNING AGENCY • SINCE 2019 •
                </textPath>
              </text>
            </svg>

            {/* Center icon — stays upright, doesn't rotate */}
            <div className="relative flex h-[35px] w-[35px] items-center justify-center rounded-full bg-white/10">
              <svg
                viewBox="0 0 24 24"
                className="h-[20px] w-[20px]"
                fill="none"
              >
                <path
                  d="M12 2L15 9L22 9.5L16.5 14L18.5 21L12 17L5.5 21L7.5 14L2 9.5L9 9L12 2Z"
                  fill="white"
                />
              </svg>
            </div>
          </div>

        </div>

        {/* =====================================================
            RIGHT CONTENT
        ====================================================== */}
        <div className="relative max-w-[460px]">
          {/* Label */}
          <span className="inline-flex items-center bg-[#e8f0ff] px-[6px] py-[3px] text-[8px] font-bold uppercase tracking-[0.7px] text-[#1472ed]">
            • About Our Company
          </span>

          {/* Heading */}
          <h2 className="mt-[10px] max-w-[440px] text-[29px] font-bold leading-[1.08] tracking-[-1.2px] text-[#07162e] md:text-[27px] lg:text-[28px]">
            Crafting success tailored
            <br />
            solution for each &amp; every
            <br />
            challenges
          </h2>

          {/* Description */}
          <p className="mt-[10px] max-w-[420px] text-[8px] font-normal leading-[1.65] text-[#626b78]">
            Our mission is to empowers businesses off our all size too thrive in
            an businesses changing marketplaces. In toda dynamics business
            environment, the key to the success lies Our mission is to empower.
            Our consultancy excels in providing quick solutions tailored.
          </p>

          {/* =================================================
              STATS CARD
          ================================================== */}
          <div className="mt-[12px] flex h-[79px] max-w-[259px] bg-[#e3e9f0]">
            {/* First stat */}
            <div className="flex flex-1 flex-col justify-center px-[15px]">
              <p className="text-[36px] font-bold leading-none tracking-[-1.5px] text-[#07162e]">
                8.5x
              </p>

              <p className="mt-[6px] text-[8px] font-medium text-[#263247]">
                Faster growth
              </p>
            </div>

            {/* Divider */}
            <div className="my-[10px] w-px bg-white" />

            {/* Second stat */}
            <div className="relative flex flex-1 flex-col justify-center px-[15px]">
              {/* Small blue dot */}
              <span className="absolute -left-[3px] top-1/2 h-[5px] w-[5px] -translate-y-1/2 rounded-full border border-[#1674ed] bg-white" />

              <p className="text-[36px] font-bold leading-none tracking-[-1.5px] text-[#07162e]">
                20M
              </p>

              <p className="mt-[6px] text-[8px] font-medium text-[#263247]">
                Reach worldwide
              </p>
            </div>
          </div>

          {/* =================================================
                SMALL STATIC FLOATING IMAGE (behind button)
            ================================================== */}
            <div className="absolute -bottom-[61px] right-[20px] z-10 hidden h-[128px] w-[128px] overflow-hidden border-[3px] border-white shadow-lg md:block">
              <Image
                src="/images/about/h5-about-2.webp"
                alt="Colleagues reviewing documents"
                fill
                sizes="128px"
                className="object-cover"
              />
            </div>

          {/* =================================================
              CTA
          ================================================== */}
          <button className="group relative mt-[15px] flex h-[30px] items-center gap-[7px] overflow-hidden rounded-full bg-[#07162e] py-[3px] pl-[3px] pr-[15px] text-[8px] font-semibold text-white">
            {/* Expanding blue background */}
            <span
              aria-hidden
              className="absolute left-[3px] top-1/2 h-[24px] w-[24px] -translate-y-1/2 rounded-full bg-[#1674ed] transition-all duration-500 ease-out group-hover:left-0 group-hover:top-0 group-hover:h-full group-hover:w-full group-hover:translate-y-0"
            />

            {/* Arrow */}
            <span className="relative z-10 flex h-[24px] w-[24px] items-center justify-center rounded-full bg-[#1674ed] transition-colors duration-300 group-hover:bg-[#07162e]">
              <svg
                viewBox="0 0 24 24"
                className="h-[12px] w-[12px]"
                fill="none"
              >
                <path
                  d="M5 12h14M13 6l6 6-6 6"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>

            <span className="relative z-10">Know More</span>
          </button>
        </div>
      </div>
    </section>
  );
}