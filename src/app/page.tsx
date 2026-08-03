import Hero from "@/components/Hero";
import Services from "@/components/Services";
import About from "@/components/About";
import Process from "@/components/Process";
import Marquee from "@/components/Marquee";
import Work from "@/components/Work";
import Team from "@/components/Team";
import CaseStudy from "@/components/Case-Study";
import Price from "@/components/Price";
import Testimonials from "@/components/Testimonials";
import CTA from "@/components/CTA";

export default function Home() {
  return (
    <main>
      <Hero />
      <Services />
      <About />
      <Process />
      <Marquee />
      <Work />
      <Team />
      <CaseStudy />
      <Price />
      <Testimonials />
      <CTA />
    </main>
  );
}

