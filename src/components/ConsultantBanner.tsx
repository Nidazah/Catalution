import Button from "./Button"; // ✅ Import your Button component

export default function ConsultantBanner() {
  return (
    <section className="w-full bg-[#1A73E8] py-12 md:py-14 overflow-hidden relative">
      {/* Decorative background curves */}
      <div className="absolute top-[-200px] left-[-200px] w-[400px] h-[400px] bg-white/5 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute bottom-[-200px] right-[-200px] w-[400px] h-[400px] bg-white/5 rounded-full blur-2xl pointer-events-none" />

      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-center md:justify-between gap-6 md:gap-12">
          
          {/* Left: Text */}
          <h2 className="text-3xl md:text-4xl lg:text-[42px] font-bold text-white tracking-tight text-center md:text-left">
            GET CONSULTANT NOW!
          </h2>

          {/* Right: Button - ✅ Replaced <Link> with Button */}
          <Button
            href="/contact"
            size="md"
            className="bg-white !text-[#0B1426] [&_svg]:!text-white transition-transform hover:scale-105"
          >
            Lets talk now
          </Button>

        </div>
      </div>
    </section>
  );
}