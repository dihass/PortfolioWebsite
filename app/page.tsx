import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Projects from "@/components/sections/Projects";
import Experience from "@/components/sections/Experience";
import Contact from "@/components/sections/Contact";
import {
  T1Neural,
  T2Radar,
  T3ColumnBurst,
  T4Membrane,
  T5Convergence,
} from "@/components/ui/SectionTransitions";

export default function Home() {
  return (
    <main className="bg-[#060912] min-h-screen">
      <Hero />
      <T1Neural />
      <About />
      <T2Radar />
      <Skills />
      <T3ColumnBurst />
      <Projects />
      <T4Membrane />
      <Experience />
      <T5Convergence />
      <Contact />
      <Footer />
    </main>
  );
}
