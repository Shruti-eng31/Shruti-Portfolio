"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Points, PointMaterial } from "@react-three/drei";

function ParticleOrb({ isExploding }: { isExploding: boolean }) {
  const pointsRef = useRef<THREE.Points>(null);
  const [positions, initialPositions] = useMemo(() => {
    const count = 5000;
    const positions = new Float32Array(count * 3);
    const initial = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      // Create sphere distribution
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      const r = 2 + Math.random() * 0.5;
      
      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);
      
      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;
      
      initial[i * 3] = x;
      initial[i * 3 + 1] = y;
      initial[i * 3 + 2] = z;
    }
    return [positions, initial];
  }, []);

  useFrame((state, delta) => {
    if (!pointsRef.current) return;
    
    if (!isExploding) {
      // Gentle rotation
      pointsRef.current.rotation.y += delta * 0.2;
      pointsRef.current.rotation.x += delta * 0.1;
    } else {
      // Explode outwards
      const positionsAttr = pointsRef.current.geometry.attributes.position;
      const array = positionsAttr.array as Float32Array;
      
      for (let i = 0; i < array.length; i += 3) {
        // Explode outward from center
        array[i] *= 1.05;
        array[i + 1] *= 1.05;
        array[i + 2] *= 1.05;
      }
      positionsAttr.needsUpdate = true;
    }
  });

  return (
    <Points ref={pointsRef} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial transparent color="#00F0FF" size={0.05} sizeAttenuation={true} depthWrite={false} blending={THREE.AdditiveBlending} />
    </Points>
  );
}

export function WelcomeScreen() {
  const [loadingPercent, setLoadingPercent] = useState(0);
  const [phase, setPhase] = useState<"loading" | "orb" | "text" | "explode" | "done">("loading");

  // Loading Sequence
  useEffect(() => {
    if (phase !== "loading") return;
    let timer: NodeJS.Timeout;
    const interval = setInterval(() => {
      setLoadingPercent((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setPhase("orb"), 500);
          return 100;
        }
        return prev + Math.floor(Math.random() * 15) + 1;
      });
    }, 150);
    return () => clearInterval(interval);
  }, [phase]);

  // Orb to Text Sequence
  useEffect(() => {
    if (phase === "orb") {
      const timer = setTimeout(() => setPhase("text"), 2000);
      return () => clearTimeout(timer);
    }
    if (phase === "text") {
      const timer = setTimeout(() => setPhase("explode"), 4000);
      return () => clearTimeout(timer);
    }
    if (phase === "explode") {
      const timer = setTimeout(() => setPhase("done"), 1500);
      return () => clearTimeout(timer);
    }
  }, [phase]);

  useEffect(() => {
    if (phase !== "done") {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [phase]);

  if (phase === "done") return null;

  return (
    <AnimatePresence>
      <motion.div
        key="cinematic-welcome"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, filter: "blur(20px)" }}
        transition={{ duration: 1.5, ease: [0.76, 0, 0.24, 1] }}
        className="fixed inset-0 z-[100] bg-black text-white flex items-center justify-center overflow-hidden"
      >
        {/* Loading Phase */}
        {phase === "loading" && (
          <motion.div 
            className="flex flex-col items-center justify-center z-50"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, scale: 1.5 }}
          >
            <div className="text-[10vw] font-heading font-light tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">
              {Math.min(loadingPercent, 100)}%
            </div>
            <div className="w-[200px] h-[1px] bg-white/20 mt-4 overflow-hidden relative">
              <motion.div 
                className="h-full bg-white shadow-[0_0_10px_#fff]"
                initial={{ width: 0 }}
                animate={{ width: `${Math.min(loadingPercent, 100)}%` }}
              />
            </div>
            <div className="mt-4 text-xs font-mono text-gray-500 tracking-[0.2em] uppercase">Initializing Neural Matrix</div>
          </motion.div>
        )}

        {/* Cinematic Orb & Text Phase */}
        {(phase === "orb" || phase === "text" || phase === "explode") && (
          <>
            <div className="absolute inset-0 z-0 opacity-60">
              <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
                <ambientLight intensity={0.5} />
                <ParticleOrb isExploding={phase === "explode"} />
              </Canvas>
            </div>

            {/* Typography Assemble */}
            <AnimatePresence>
              {phase === "text" && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  className="z-10 flex flex-col items-center text-center pointer-events-none mix-blend-difference"
                >
                  <h1 className="text-[12vw] font-heading font-bold tracking-tighter leading-none mb-2">
                    Shruti Singh
                  </h1>
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 1 }}
                    className="flex flex-wrap justify-center gap-4 text-sm md:text-xl font-mono text-primary uppercase tracking-widest"
                  >
                    <span>Full-Stack Developer</span>
                    <span>•</span>
                    <span>Data Science</span>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Flash on explode */}
            {phase === "explode" && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-white mix-blend-overlay pointer-events-none z-50"
              />
            )}
          </>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
