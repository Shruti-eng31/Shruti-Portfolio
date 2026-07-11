"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, FolderGit2, ShieldAlert } from "lucide-react";
import { FaGithub } from "react-icons/fa";

const projects = [
  {
    id: "LMS-01",
    title: "Library Management System",
    tech: ["Python"],
    description: "Developed a Library Management System to automate catalog management, issue-return tracking, member management, CRUD operations, inventory monitoring, and search functionality.",
    github: "#",
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
        ${isHovered ? 'border-primary shadow-[0_0_30px_rgba(0,240,255,0.2)]' : 'border-white/10'}
      `}>
        
        {/* Holographic Scanline */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-xl">
          <div className="w-full h-[2px] bg-primary/50 shadow-[0_0_10px_#00F0FF] animate-scanline opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>

        {/* Header */}
        <div className="px-6 py-4 border-b border-white/10 flex justify-between items-center bg-white/5">
          <div className="flex items-center gap-3">
            <ShieldAlert size={16} className={project.status === 'ACTIVE' ? 'text-green-500' : 'text-orange-500'} />
            <span className="font-mono text-xs tracking-widest text-muted">ID: {project.id}</span>
          </div>
          <span className={`font-mono text-[10px] uppercase px-2 py-1 rounded-sm border ${project.status === 'ACTIVE' ? 'border-green-500/50 text-green-500' : 'border-orange-500/50 text-orange-500'}`}>
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
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,240,255,0.03)_1px,transparent_1px)] bg-[size:100%_40px] pointer-events-none" />
      
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {projects.map((project, index) => (
            <ProjectDataPad key={index} project={project} index={index} />
          ))}
        </div>
        
      </div>
    </section>
  );
}
