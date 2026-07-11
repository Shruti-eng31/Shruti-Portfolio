"use client";

import { useRef, useState, ReactNode } from "react";
import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate } from "framer-motion";
import { cn } from "@/lib/utils";

interface PremiumCardProps {
  children: ReactNode;
  className?: string;
  glow?: boolean;
}

export function PremiumCard({ children, className, glow = false }: PremiumCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"]);

  const backgroundX = useTransform(mouseXSpring, [-0.5, 0.5], ["0%", "100%"]);
  const backgroundY = useTransform(mouseYSpring, [-0.5, 0.5], ["0%", "100%"]);
  const background = useMotionTemplate`radial-gradient(circle at ${backgroundX} ${backgroundY}, rgba(255,255,255,0.1) 0%, transparent 60%)`;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className={cn(
        "relative rounded-2xl glass-panel p-1 transition-all duration-300",
        glow && isHovered ? "glow border-primary/50" : "border-primary/10",
        className
      )}
    >
      {/* Glossy Reflection */}
      {isHovered && (
        <motion.div
          className="absolute inset-0 z-10 pointer-events-none rounded-2xl opacity-50"
          style={{ background }}
        />
      )}
      
      <div
        className="w-full h-full bg-[#0a0a0a]/80 rounded-[14px] p-6 sm:p-8 backdrop-blur-xl relative z-0"
        style={{ transform: "translateZ(20px)" }}
      >
        {children}
      </div>
    </motion.div>
  );
}
