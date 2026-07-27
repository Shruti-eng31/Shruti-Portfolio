"use client";

import { motion } from "framer-motion";
import { ChevronLeft } from "lucide-react";
import { ProjectDataPad, ProjectType } from "../../../components/sections/Projects";
import { Netflix3D } from "../../../components/3d/Netflix3D";
import { Customer3D } from "../../../components/3d/Customer3D";

const dataScienceProjectsList: ProjectType[] = [
  {
    id: "DS-02",
    title: "Netflix Data Analysis & Dashboard",
    tech: ["Python", "Pandas", "Scikit-Learn", "Streamlit"],
    description: "An end-to-end Data Science and Business Intelligence portfolio project analyzing the global Netflix catalog, featuring a recommendation engine and interactive dashboard.",
    github: "https://github.com/Shruti-eng31/Netflix-Data-Analysis",
    demo: "https://netflix-data-analysis-eqbwfrjetdrtqyumkarqna.streamlit.app/",
    status: "ACTIVE"
  },
  {
    id: "DS-03",
    title: "Customer Churn Analysis & Prediction",
    tech: ["Python", "Streamlit", "Scikit-Learn", "XGBoost"],
    description: "An end-to-end Data Science portfolio project that simulates a real-world enterprise analytics platform. Designed to analyze customer behavior, identify churn patterns, and predict customer churn using Machine Learning.",
    github: "https://github.com/Shruti-eng31/Customer-Churn-Analysis",
    demo: "https://customer-churn-analysis-rpejbsauh6rfrxfejsypzh.streamlit.app/",
    status: "ACTIVE"
  }
];

export default function DataScienceProjectsPage() {
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
            Data Science <span className="text-primary">Projects</span>
          </h1>
          <p className="text-xl text-muted max-w-2xl mx-auto font-mono">
            A comprehensive list of Data Science, Machine Learning, and Analytics projects. Add your new data science projects down below.
          </p>
        </motion.div>

        {/* Zigzag / Staggered Layout */}
        <div className="flex flex-col gap-16 lg:gap-32 relative max-w-6xl mx-auto mb-16 px-4">
          
          {/* Connecting Line (Optional background element) */}
          <div className="absolute left-[50%] top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-primary/20 to-transparent hidden md:block -translate-x-1/2 pointer-events-none" />

          {dataScienceProjectsList.map((project, index) => {
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
                  {project.id === 'DS-02' && <Netflix3D />}
                  {project.id === 'DS-03' && <Customer3D />}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
