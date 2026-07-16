"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, FolderGit2, ShieldAlert, ChevronRight } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { Library3D } from "../3d/Library3D";
import { Hospital3D } from "../3d/Hospital3D";

const projects = [
  {
    id: "LMS-01",
    title: "Library Management System",
    tech: ["Python"],
    description: "Developed a Library Management System to automate catalog management, issue-return tracking, member management, CRUD operations, inventory monitoring, and search functionality.",
    github: "https://github.com/Shruti-eng31/Library-Management-System",
    demo: "#",
    status: "ARCHIVED"
  },
  {
    id: "HMS-02",
    title: "Hospital Management System",
    tech: ["C#", ".NET", "SQL Server"],
    description: "Developed a desktop application for managing patient records, doctor information, appointments, billing, authentication, SQL Server integration, CRUD operations, and efficient hospital administration.",
    github: "#",
    status: "ACTIVE"
  }
];

function ProjectDataPad({ project, index }: { project: typeof projects[0], index: number }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, rotateX: 20 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, delay: index * 0.2 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative group perspective-1000"
    >
      {/* Glow Effect */}
      <div className={`absolute inset-0 bg-primary/20 blur-2xl transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'}`} />
      
      <div className={`relative h-full flex flex-col bg-black/80 backdrop-blur-md border transition-all duration-500 rounded-xl overflow-hidden
        ${isHovered ? 'border-primary shadow-[0_0_30px_rgba(0,255,102,0.2)]' : 'border-white/10'}
      `}>
        
        {/* Holographic Scanline */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-xl">
          <div className="w-full h-[2px] bg-primary/50 shadow-[0_0_10px_#00FF66] animate-scanline opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>

        {/* Header */}
        <div className="px-6 py-4 border-b border-white/10 flex justify-between items-center bg-white/5">
          <div className="flex items-center gap-3">
            <ShieldAlert size={16} className={project.status === 'ACTIVE' ? 'text-green-500' : 'text-purple-500'} />
            <span className="font-mono text-xs tracking-widest text-muted">ID: {project.id}</span>
          </div>
          <span className={`font-mono text-[10px] uppercase px-2 py-1 rounded-sm border ${project.status === 'ACTIVE' ? 'border-green-500/50 text-green-500' : 'border-purple-500/50 text-purple-500'}`}>
            {project.status}
          </span>
        </div>

        {/* Content */}
        <div className="p-8 flex flex-col flex-1 relative z-10">
          <div className="flex justify-between items-start mb-6">
            <div className={`w-16 h-16 rounded-xl flex items-center justify-center transition-all duration-500 
              ${isHovered ? 'bg-primary/20 text-primary scale-110' : 'bg-white/5 text-muted'}
            `}>
              <FolderGit2 size={32} />
            </div>
            
            <div className="flex gap-4">
              {project.github && (
                <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-muted hover:text-white transition-colors">
                  <FaGithub size={24} />
                </a>
              )}
              {project.demo && (
                <a href={project.demo} target="_blank" rel="noopener noreferrer" className="text-muted hover:text-white transition-colors">
                  <ExternalLink size={24} />
                </a>
              )}
            </div>
          </div>
          
          <h3 className="text-3xl font-heading font-black mb-4 text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-primary transition-all duration-300">
            {project.title}
          </h3>
          
          <p className="text-muted leading-relaxed font-mono text-sm mb-8 flex-1">
            {project.description}
          </p>
          
          <div className="flex flex-wrap gap-2 mt-auto">
            {project.tech.map((tech, i) => (
              <span key={i} className="text-xs font-mono font-medium px-3 py-1 bg-primary/10 border border-primary/20 text-primary rounded-sm">
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function Projects() {
  return (
    <section id="projects" className="py-32 w-full relative z-10 bg-[#050505] overflow-hidden">
      {/* Background Matrix-like lines */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,102,0.03)_1px,transparent_1px)] bg-[size:100%_40px] pointer-events-none" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-24"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/10 text-primary font-mono text-xs uppercase tracking-widest mb-6">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            Classified Files
          </div>
          <h2 className="text-5xl md:text-7xl font-heading font-black mb-4">
            Project <span className="text-gradient-primary">Archive</span>
          </h2>
        </motion.div>

        {/* Zigzag / Staggered Layout */}
        <div className="flex flex-col gap-16 lg:gap-32 relative max-w-6xl mx-auto mb-16 px-4">
          
          {/* Connecting Line (Optional background element) */}
          <div className="absolute left-[50%] top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-primary/20 to-transparent hidden md:block -translate-x-1/2 pointer-events-none" />

          {projects.map((project, index) => {
            const isEven = index % 2 === 0;
            return (
              <div 
                key={index} 
                className={`w-full relative flex flex-col md:flex-row ${isEven ? 'justify-start' : 'justify-end'} items-center`}
              >
                {/* Connecting Node on the timeline */}
                <div className="hidden md:block absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-primary shadow-[0_0_15px_#00FF66] left-1/2 -translate-x-1/2 z-20" />
                
                {/* The Project Card */}
                <div className="w-full md:w-[45%] relative z-10">
                  <ProjectDataPad project={project} index={index} />
                </div>

                {/* The 3D Visualization (Opposite Side) */}
                <div 
                  className={`hidden md:flex absolute top-0 bottom-0 w-[45%] items-center justify-center z-0 ${isEven ? 'right-0' : 'left-0'}`}
                >
                  {project.id === 'LMS-01' && <Library3D />}
                  {project.id === 'HMS-02' && <Hospital3D />}
                </div>
              </div>
            );
          })}
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex justify-center mt-12"
        >
          <a href="/projects" className="magnetic group relative inline-flex items-center justify-center px-8 py-4 font-bold text-primary rounded-full border border-primary/50 bg-primary/10 hover:bg-primary hover:text-black transition-all duration-300 shadow-[0_0_15px_rgba(0,255,102,0.2)] hover:shadow-[0_0_30px_rgba(0,255,102,0.6)]">
            Watch More
            <ChevronRight className="ml-2 group-hover:translate-x-1 transition-transform" />
          </a>
        </motion.div>
        
      </div>
    </section>
  );
}
