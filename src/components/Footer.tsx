"use client";

import { ArrowUp } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export function Footer() {
  const footerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: footerRef,
    offset: ["start end", "end end"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, 0]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0.3, 1]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.9, 1]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer ref={footerRef} className="relative w-full overflow-hidden bg-black pt-32 pb-12 border-t border-white/5">
      {/* Background Marquee Text */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[200vw] flex overflow-hidden opacity-5 pointer-events-none select-none mix-blend-screen">
        <motion.div 
          animate={{ x: [0, -1000] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="flex whitespace-nowrap"
        >
          <span className="text-[15vw] font-heading font-black text-transparent bg-clip-text bg-gradient-to-r from-primary to-[#7000FF] px-8">SHRUTI SINGH</span>
          <span className="text-[15vw] font-heading font-black text-transparent bg-clip-text bg-gradient-to-r from-[#7000FF] to-primary px-8">DATA SCIENCE</span>
          <span className="text-[15vw] font-heading font-black text-transparent bg-clip-text bg-gradient-to-r from-primary to-[#7000FF] px-8">FULL STACK</span>
          <span className="text-[15vw] font-heading font-black text-transparent bg-clip-text bg-gradient-to-r from-[#7000FF] to-primary px-8">SHRUTI SINGH</span>
        </motion.div>
      </div>

      <motion.div 
        style={{ y, opacity, scale }}
        className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
      >
        <div className="flex flex-col items-center justify-center text-center max-w-3xl mx-auto mb-24">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-[#7000FF] p-[2px] mb-8 shadow-[0_0_30px_rgba(0,240,255,0.3)] hover:shadow-[0_0_50px_rgba(112,0,255,0.5)] transition-shadow duration-500 cursor-pointer" onClick={scrollToTop}>
            <div className="w-full h-full rounded-2xl bg-black flex items-center justify-center">
              <span className="text-3xl font-heading font-black text-white">S</span>
            </div>
          </div>
          <h2 className="text-4xl md:text-5xl font-heading font-black text-white mb-6">
            Building intelligent systems for the <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-[#7000FF]">future.</span>
          </h2>
          <p className="text-gray-400 text-lg md:text-xl font-mono">
            Always open to discussing product design work or partnership opportunities.
          </p>
        </div>

        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent mb-8" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-6 text-sm font-mono tracking-widest text-gray-500 uppercase">
            <a href="#about" className="hover:text-primary transition-colors">About</a>
            <a href="#projects" className="hover:text-primary transition-colors">Projects</a>
            <a href="#skills" className="hover:text-primary transition-colors">Skills</a>
          </div>
          
          <div className="flex items-center gap-4">
            <p className="text-gray-500 text-sm font-mono">
              &copy; {new Date().getFullYear()} SHRUTI. ALL SYSTEMS ONLINE.
            </p>
            <button 
              onClick={scrollToTop}
              className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-primary/20 hover:border-primary hover:text-primary transition-all hover:-translate-y-2 group"
            >
              <ArrowUp size={16} className="group-hover:animate-bounce" />
            </button>
          </div>
        </div>
      </motion.div>
    </footer>
  );
}
