"use client";

import { useEffect, useState, useRef } from "react";

export function CustomCursor() {
  const [mounted, setMounted] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || !cursorRef.current || !dotRef.current) return;
    
    let mouseX = -100;
    let mouseY = -100;
    let isMoving = false;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      isMoving = true;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Particle system for Fire
    const particles: HTMLDivElement[] = [];
    const poolSize = 80; 
    
    for (let i = 0; i < poolSize; i++) {
      const p = document.createElement("div");
      p.style.position = "fixed";
      p.style.top = "0";
      p.style.left = "0";
      p.style.pointerEvents = "none";
      p.style.borderRadius = "50%";
      p.style.zIndex = "9998"; // Behind the white dot
      p.style.mixBlendMode = "screen";
      p.style.opacity = "0";
      p.style.filter = "blur(3px)"; // Softens the particles to look like real fire
      cursorRef.current.appendChild(p);
      particles.push(p);
    }

    let particleIndex = 0;  
    let animationFrameId: number;

    const emitParticle = () => {
      if (mouseX < 0 || mouseY < 0) return;

      const p = particles[particleIndex];
      particleIndex = (particleIndex + 1) % poolSize;

      // Randomize size between 10px and 35px
      const size = Math.random() * 25 + 10;
      const startX = mouseX - size / 2 + (Math.random() - 0.5) * 15;
      const startY = mouseY - size / 2 + (Math.random() - 0.5) * 15;
      
      const colors = ["#fff200", "#ff8800", "#ff3300", "#cc0000"];
      const color = colors[Math.floor(Math.random() * colors.length)];

      p.style.width = `${size}px`;
      p.style.height = `${size}px`;
      p.style.backgroundColor = color;
      p.style.boxShadow = `0 0 ${size * 1.5}px ${color}`;

      // Flames drift upwards and slightly sideways
      const endY = startY - (Math.random() * 80 + 40); 
      const endX = startX + (Math.random() - 0.5) * 40;

      p.animate([
        { transform: `translate(${startX}px, ${startY}px) scale(1)`, opacity: 0.8 },
        { transform: `translate(${endX}px, ${endY}px) scale(0)`, opacity: 0 }
      ], {
        duration: Math.random() * 400 + 300, // 300ms to 700ms
        easing: "cubic-bezier(0.25, 1, 0.5, 1)",
      });
    };

    const loop = () => {
      // Emit 1 particle constantly, and 2 extra if moving for a dense trail
      emitParticle();
      if (isMoving) {
        emitParticle();
        emitParticle();
      }
      isMoving = false;
      animationFrameId = requestAnimationFrame(loop);
    };

    loop();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
      if (cursorRef.current) {
        cursorRef.current.innerHTML = ""; // Cleanup on unmount
      }
    };
  }, [mounted]);

  if (!mounted) return null;

  return (
    <>
      <div ref={cursorRef} className="hidden md:block" />
      
      {/* Intense White/Yellow Core Dot */}
      <div 
        ref={dotRef}
        className="fixed top-0 left-0 w-4 h-4 bg-white rounded-full pointer-events-none z-[9999] hidden md:block shadow-[0_0_20px_#fff200,0_0_40px_#ff8800]"
        style={{ transform: "translate(-100px, -100px) translate(-50%, -50%)" }}
      />
    </>
  );
}
