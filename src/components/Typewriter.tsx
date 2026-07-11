"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const roles = [
  "Data Scientist",
  "AI Engineer",
  "Full Stack Developer",
  "ML Research Enthusiast",
];

export function Typewriter() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setIndex((prev) => (prev + 1) % roles.length);
    }, 3000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="h-[40px] md:h-[60px] overflow-hidden relative">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -40, opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="absolute inset-0 flex items-center"
        >
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-heading font-bold text-gradient-primary">
            {roles[index]}
          </h2>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
