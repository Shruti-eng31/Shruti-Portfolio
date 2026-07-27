import { WelcomeScreen } from "@/components/WelcomeScreen";
import { Navbar } from "@/components/Navbar";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Experience } from "@/components/sections/Experience";
import { Projects } from "@/components/sections/Projects";
import { DataScienceProjects } from "@/components/sections/DataScienceProjects";
import { Skills } from "@/components/sections/Skills";
import { Education } from "@/components/sections/Education";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <WelcomeScreen />
      <AnimatedBackground />
      <Navbar />
      
      <div className="flex flex-col w-full">
        <Hero />
        <About />
        <Experience />
        <Projects />
        <DataScienceProjects />
        <Skills />
        <Education />
        <Contact />
      </div>
      
      <Footer />
    </>
  );
}
