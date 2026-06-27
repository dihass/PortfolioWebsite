import dynamic from "next/dynamic";
import Hero from "@/components/sections/Hero";
import ParticleScrollFlowClient from "@/components/ui/ParticleScrollFlowClient";

const Projects   = dynamic(() => import("@/components/sections/Projects"));
const Skills     = dynamic(() => import("@/components/sections/Skills"));
const Experience = dynamic(() => import("@/components/sections/Experience"));
const Contact    = dynamic(() => import("@/components/sections/Contact"));
const Footer     = dynamic(() => import("@/components/layout/Footer"));

export default function Home() {
  return (
    <main className="bg-cream min-h-screen">
      <div className="rainbow-bar" />
      <ParticleScrollFlowClient />
      <Hero />
      <Projects />
      <Skills />
      <Experience />
      <Contact />
      <Footer />
    </main>
  );
}
