"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Terminal, Code, BrainCircuit, ChevronRight } from "lucide-react";

const experiences = [
  {
    id: 1,
    company: "Google",
    role: "Data Science Intern",
    period: "April 2026 – June 2026",
    details: [
      "Engineered machine learning pipelines for massive datasets.",
      "Optimized SQL queries reducing latency by 40%.",
      "Developed interactive dashboards for predictive analytics.",
      "Implemented A/B testing frameworks for feature rollout."
    ],
    icon: <BrainCircuit className="text-[#00F0FF]" size={24} />,
    color: "#00F0FF"
  },
  {
    id: 2,
    company: "NexCraft",
    role: "Software Development Intern",
    period: "May 2025 – October 2025",
    details: [
      "Architected responsive UI components using Next.js and Tailwind.",
      "Built scalable RESTful APIs in Node.js.",
      "Improved frontend performance score to 98 on Lighthouse.",
      "Led migration from legacy React architecture to Server Components."
    ],
    icon: <Code className="text-[#7000FF]" size={24} />,
    color: "#7000FF"
  }
];

function TerminalCard({ exp, index }: { exp: typeof experiences[0], index: number }) {
  const cardRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "center center"]
  });

  const [isOpen, setIsOpen] = useState(false);

  const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const rotateX = useTransform(scrollYProgress, [0, 1], [45, 0]);

  return (
    <motion.div 
      ref={cardRef}
      style={{ scale, opacity, rotateX }}
      className="relative w-full max-w-4xl mx-auto mb-32 perspective-1000"
    >
      {/* Cinematic Connection Line */}
      <div className="absolute -left-4 md:-left-12 top-10 w-[2px] h-[150%] bg-gradient-to-b from-white/20 via-primary/50 to-transparent pointer-events-none" />
      
      <div 
        className="glass-panel border border-white/10 rounded-xl overflow-hidden cursor-pointer transition-all duration-500 hover:border-primary/50 hover:shadow-[0_0_30px_rgba(0,240,255,0.15)] bg-black/40 backdrop-blur-xl"
        onClick={() => setIsOpen(!isOpen)}
      >
        {/* Terminal Header */}
        <div className="bg-black/80 px-4 py-3 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
              <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
            </div>
            <span className="text-xs font-mono text-muted ml-4 tracking-widest">{exp.company.toLowerCase()}_server.exe</span>
          </div>
          <Terminal size={14} className="text-muted" />
        </div>

        {/* Terminal Content */}
        <div className="p-6 md:p-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center shadow-inner">
              {exp.icon}
            </div>
            <div>
              <h3 className="text-2xl md:text-3xl font-heading font-black text-white tracking-tighter drop-shadow-md">
                {exp.role}
              </h3>
              <div className="text-sm font-mono text-primary mt-1">{exp.company} <span className="text-muted ml-2">// {exp.period}</span></div>
            </div>
          </div>

          {/* Expandable Details */}
          <AnimatePresence>
            {isOpen && (
              <motion.div 
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <div className="mt-6 pt-6 border-t border-white/10 space-y-4">
                  {exp.details.map((detail, i) => (
                    <motion.div 
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-start gap-3"
                    >
                      <ChevronRight size={16} className="mt-1 text-primary flex-shrink-0" />
                      <p className="text-sm md:text-base font-mono text-gray-300 leading-relaxed">{detail}</p>
                    </motion.div>
                  ))}
                  
                  <motion.div 
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
                    className="pt-4 flex items-center gap-2 text-xs font-mono text-green-400"
                  >
                    <span>&gt; Process completed successfully.</span>
                    <span className="w-2 h-4 bg-green-400 animate-pulse"></span>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          
          {!isOpen && (
            <div className="mt-4 text-xs font-mono text-muted flex items-center gap-2">
              <span className="animate-pulse">&gt;</span> Click to decrypt classified files...
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export function Experience() {
  const containerRef = useRef(null);
  
  return (
    <section id="experience" ref={containerRef} className="relative w-full py-32 bg-[#050505] overflow-hidden">
      {/* Reactive Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100px_100px] pointer-events-none" />

      <div className="container mx-auto px-8 md:px-16 lg:px-32 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-24"
        >
          <h2 className="text-sm font-mono tracking-[0.4em] uppercase text-primary mb-4">Transmission Logs</h2>
          <h3 className="text-5xl md:text-7xl font-heading font-black text-white">Experience</h3>
        </motion.div>

        <div className="relative">
          {experiences.map((exp, index) => (
            <TerminalCard key={exp.id} exp={exp} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
