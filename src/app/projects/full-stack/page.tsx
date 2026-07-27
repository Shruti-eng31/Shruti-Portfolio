"use client";

import { motion } from "framer-motion";
import { ChevronLeft } from "lucide-react";
import { ProjectDataPad, ProjectType } from "../../../components/sections/Projects";
import { Library3D } from "../../../components/3d/Library3D";
import { Hospital3D } from "../../../components/3d/Hospital3D";
import { Aether3D } from "../../../components/3d/Aether3D";
import { Cosmos3D } from "../../../components/3d/Cosmos3D";
import { Eda3D } from "../../../components/3d/Eda3D";

const fullStackProjects: ProjectType[] = [
  {
    id: "AEX-02",
    title: "Aether-X",
    tech: ["React", "TypeScript", "Node.js"],
    description: "A cutting-edge software solution designed to solve complex problems with modern technologies. Built with performance and scalability in mind.",
    github: "https://github.com/Shruti-eng31/Aether-X",
    demo: "https://shrutisingh-aether-x-olive.vercel.app/",
    status: "ACTIVE"
  },
  {
    id: "EDA-01",
    title: "Advanced EDA & Feature Engineering",
    tech: ["Python", "Pandas", "Jupyter", "Scikit-Learn"],
    description: "An advanced Exploratory Data Analysis (EDA) and Feature Engineering project. It involves deep data analysis, preprocessing, and extracting meaningful features for machine learning pipelines.",
    github: "https://github.com/Shruti-eng31/advanced-eda-feature-engineering",
    demo: "",
    status: "ACTIVE"
  },
  {
    id: "COS-03",
    title: "Cosmos Explorer",
    tech: ["React", "Next.js"],
    description: "A web application to explore space data, celestial bodies, and cosmic events, powered by modern web technologies.",
    github: "https://github.com/Shruti-eng31/cosmos-explorer",
    demo: "",
    status: "ACTIVE"
  },
  {
    id: "LMS-01",
    title: "Library Management System",
    tech: ["Java", "Spring Boot", "MySQL"],
    description: "A comprehensive library management system for tracking books, members, and issuing records with a modern backend architecture.",
    github: "https://github.com/Shruti-eng31/LMS",
    demo: "",
    status: "ARCHIVED"
  },
  {
    id: "HMS-02",
    title: "Hospital Management System",
    tech: ["Python", "Django", "PostgreSQL"],
    description: "An integrated healthcare solution managing patient records, appointments, and billing with role-based access control.",
    github: "https://github.com/Shruti-eng31/HMS",
    demo: "",
    status: "ARCHIVED"
  }
];

export default function FullStackProjectsPage() {
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
          className="mb-16 text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/10 text-primary font-mono text-xs uppercase tracking-widest mb-6">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            Expanded Archive
          </div>
          <h1 className="text-5xl md:text-7xl font-heading font-black mb-6">
            Full-Stack <span className="text-primary">Projects</span>
          </h1>
          <p className="text-xl text-muted max-w-2xl mx-auto font-mono">
            A comprehensive list of full-stack web applications, tools, and platforms. Add your new full-stack projects down below.
          </p>
        </motion.div>

        {/* Zigzag / Staggered Layout */}
        <div className="flex flex-col gap-16 lg:gap-32 relative max-w-6xl mx-auto mb-16 px-4">
          
          {/* Connecting Line (Optional background element) */}
          <div className="absolute left-[50%] top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-primary/20 to-transparent hidden md:block -translate-x-1/2 pointer-events-none" />

          {fullStackProjects.map((project, index) => {
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
                  {project.id === 'AEX-02' && <Aether3D />}
                  {project.id === 'COS-03' && <Cosmos3D />}
                  {project.id === 'EDA-01' && <Eda3D />}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
