"use client";

import { motion } from "framer-motion";
import { ChevronLeft } from "lucide-react";

export default function ProjectsPage() {
  return (
    <main className="min-h-screen bg-[#050505] text-white py-32 relative overflow-hidden">
      {/* Background Matrix-like lines */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,102,0.03)_1px,transparent_1px)] bg-[size:100%_40px] pointer-events-none" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <a href="/" className="inline-flex items-center text-primary hover:text-white transition-colors mb-12 group">
          <ChevronLeft className="mr-2 group-hover:-translate-x-1 transition-transform" /> Back to Terminal
        </a>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/10 text-primary font-mono text-xs uppercase tracking-widest mb-6">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            Expanded Archive
          </div>
          <h1 className="text-5xl md:text-7xl font-heading font-black mb-6">
            All <span className="text-primary">Projects</span>
          </h1>
          <p className="text-xl text-muted max-w-2xl font-mono">
            A comprehensive list of all projects, tools, and algorithms. Add your new projects down below.
          </p>
        </motion.div>

        {/* ADD YOUR NEW PROJECTS HERE */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {/* Placeholder for new project 1 */}
          <div className="p-8 border border-white/10 rounded-xl bg-white/5 backdrop-blur-sm hover:border-primary/50 transition-colors group cursor-pointer">
            <h3 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors">New Project Slot</h3>
            <p className="text-muted mb-6 font-mono text-sm">Replace this section with your next awesome project details.</p>
            <div className="flex gap-2">
              <span className="text-xs font-mono px-2 py-1 bg-white/10 rounded-sm">Tech 1</span>
              <span className="text-xs font-mono px-2 py-1 bg-white/10 rounded-sm">Tech 2</span>
            </div>
          </div>

          {/* Placeholder for new project 2 */}
          <div className="p-8 border border-white/10 rounded-xl bg-white/5 backdrop-blur-sm hover:border-primary/50 transition-colors group cursor-pointer">
            <h3 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors">New Project Slot</h3>
            <p className="text-muted mb-6 font-mono text-sm">Replace this section with your next awesome project details.</p>
            <div className="flex gap-2">
              <span className="text-xs font-mono px-2 py-1 bg-white/10 rounded-sm">Tech 1</span>
              <span className="text-xs font-mono px-2 py-1 bg-white/10 rounded-sm">Tech 2</span>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}
