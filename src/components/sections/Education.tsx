"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { GraduationCap, BookOpen, ChevronRight } from "lucide-react";

export function Education() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [30, 0, -30]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);

  const coursework = [
    "Artificial Intelligence", "Data Science", "Software Engineering", 
    "DBMS", "Operating Systems", "Computer Networks", "DSA"
  ];

  return (
    <section id="education" ref={containerRef} className="py-32 w-full relative z-10 bg-[#050505] overflow-hidden flex flex-col items-center justify-center min-h-[80vh]">
      
      {/* Dynamic Grid Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,240,255,0.1)_0%,transparent_70%)] pointer-events-none" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col items-center">
        
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 text-primary font-mono text-sm uppercase tracking-[0.3em] mb-4">
            <GraduationCap size={16} /> Academic Credentials
          </div>
          <h2 className="text-5xl md:text-7xl font-heading font-black text-white">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">Education</span>
          </h2>
        </motion.div>

        <div className="w-full max-w-4xl perspective-1000">
          <motion.div
            style={{ rotateX, scale }}
            className="relative w-full glass-panel border border-white/20 rounded-2xl p-1 lg:p-2 bg-gradient-to-b from-white/10 to-black/80 backdrop-blur-2xl shadow-[0_30px_60px_rgba(0,0,0,0.5),0_0_40px_rgba(0,240,255,0.1)]"
          >
            {/* Inner Border */}
            <div className="relative w-full h-full border border-white/10 rounded-xl p-8 md:p-12 overflow-hidden bg-black/40">
              
              {/* Holographic Watermark */}
              <div className="absolute -right-20 -bottom-20 opacity-5 pointer-events-none">
                <GraduationCap size={400} />
              </div>

              {/* Glowing Corner Accents */}
              <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-primary rounded-tl-xl" />
              <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-primary rounded-tr-xl" />
              <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-primary rounded-bl-xl" />
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-primary rounded-br-xl" />

              <div className="flex flex-col md:flex-row gap-10 items-start relative z-10">
                {/* University Emblem Placeholder */}
                <div className="w-32 h-32 rounded-2xl bg-gradient-to-br from-primary/30 to-primary-dark/10 border border-primary/40 flex flex-shrink-0 items-center justify-center text-primary shadow-[0_0_30px_rgba(0,240,255,0.3)] relative">
                  <div className="absolute inset-2 border border-primary/20 rounded-xl" />
                  <GraduationCap size={64} className="drop-shadow-[0_0_10px_rgba(0,240,255,1)]" />
                </div>
                
                <div className="flex-1">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary font-mono text-xs mb-4">
                    STATUS: COMPLETED
                  </div>
                  
                  <h3 className="text-4xl md:text-5xl font-heading font-black text-white mb-2 tracking-tight">Bennett University</h3>
                  <p className="text-xl text-gray-400 font-medium mb-8 font-mono">Bachelor of Technology in Computer Science and Engineering</p>
                  
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-white font-bold mb-4 uppercase tracking-widest text-sm">
                      <BookOpen size={18} className="text-primary" /> Key Directives (Coursework)
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {coursework.map((course, i) => (
                        <div key={i} className="flex items-center gap-2 group">
                          <ChevronRight size={14} className="text-primary opacity-50 group-hover:opacity-100 transition-opacity group-hover:translate-x-1 duration-300" />
                          <span className="text-sm font-mono text-gray-300 group-hover:text-white transition-colors">
                            {course}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
        
      </div>
    </section>
  );
}
