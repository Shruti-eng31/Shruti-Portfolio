"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

import Image from "next/image";

export function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section id="about" ref={sectionRef} className="relative w-full min-h-screen py-32 overflow-hidden bg-background">
      {/* Background Noise & Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent z-0 pointer-events-none" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 h-full flex flex-col lg:flex-row items-center gap-12">
        
        {/* Left Side - Profile Picture */}
        <div className="w-full lg:w-1/2 h-[50vh] lg:h-[80vh] relative flex items-center justify-center">
          <motion.div 
            style={{ y, opacity }} 
            className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96"
          >
            {/* Glowing Backdrop */}
            <div className="absolute inset-0 bg-primary/20 rounded-full blur-[100px] animate-pulse" />
            
            {/* Image Container */}
            <div className="relative w-full h-full rounded-2xl overflow-hidden glass-panel border border-primary/30 p-2 shadow-[0_0_50px_rgba(0,240,255,0.2)]">
              <div className="relative w-full h-full rounded-xl overflow-hidden">
                <Image 
                  src="/profile.jpg" 
                  alt="Shruti Singh" 
                  fill 
                  className="object-cover hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
              </div>
            </div>
          </motion.div>
          {/* Floating Achievement Stats */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="absolute top-[20%] left-0 glass-panel p-4 rounded-xl border-l-4 border-l-primary shadow-2xl"
          >
            <div className="text-3xl font-heading font-black text-foreground">500+</div>
            <div className="text-xs text-primary font-mono uppercase tracking-widest">DSA Problems</div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="absolute bottom-[20%] right-0 glass-panel p-4 rounded-xl border-r-4 border-r-primary-dark shadow-2xl text-right"
          >
            <div className="text-3xl font-heading font-black text-foreground">2+</div>
            <div className="text-xs text-primary font-mono uppercase tracking-widest">Years Exp.</div>
          </motion.div>
        </div>

        {/* Right Side - Storytelling */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h2 className="text-sm font-mono tracking-[0.3em] uppercase text-primary mb-4">Origin Story</h2>
            <h3 className="text-5xl md:text-6xl font-heading font-bold mb-8 tracking-tighter">
              Bridging the gap between <span className="text-gradient-primary">Data</span> and <span className="text-gradient-primary">Design</span>.
            </h3>
          </motion.div>

          <div className="space-y-6 relative border-l border-foreground/10 pl-8 ml-4">
            {[
              {
                title: "The Architect",
                text: "I specialize in building end-to-end intelligent systems. From developing scalable backend APIs to fine-tuning machine learning models, I construct the unseen frameworks that power modern products."
              },
              {
                title: "The Visionary",
                text: "Data isn't just numbers—it's a narrative. My expertise in Predictive AI, RAG, and Computer Vision allows me to extract profound insights and build software that understands context."
              },
              {
                title: "The Artisan",
                text: "A powerful backend is meaningless without an intuitive interface. As a UI/UX architect, I craft pixel-perfect, immersive frontend experiences that captivate users and make complex data beautiful."
              }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: i * 0.2 }}
                className="relative group"
              >
                <div className="absolute -left-[41px] top-1 w-4 h-4 rounded-full bg-primary/20 border border-primary flex items-center justify-center group-hover:scale-150 group-hover:bg-primary transition-all duration-300">
                  <div className="w-1 h-1 bg-foreground rounded-full"></div>
                </div>
                <h4 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">{item.title}</h4>
                <p className="text-muted leading-relaxed text-base group-hover:text-foreground/90 transition-colors">
                  {item.text}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-12"
          >
            <a href="mailto:professionalshrutisingh@gmail.com" className="magnetic inline-flex items-center gap-4 px-8 py-4 rounded-full glass border border-foreground/20 hover:bg-foreground/10 transition-colors group">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse shadow-[0_0_10px_var(--primary)]"></span>
              <span className="font-mono text-sm tracking-widest text-foreground uppercase group-hover:text-primary transition-colors">Initialize Connection</span>
            </a>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
