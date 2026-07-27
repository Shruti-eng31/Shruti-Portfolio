"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Html, Stars, Float } from "@react-three/drei";
import * as THREE from "three";

const skillCategories = [
  { title: "Python", color: "#3776AB", description: "Core Backend & Data Science" },
  { title: "TypeScript", color: "#3178C6", description: "Type-Safe Architectures" },
  { title: "React/Next.js", color: "#61DAFB", description: "Frontend Engineering" },
  { title: "PyTorch/TF", color: "#FF00FF", description: "Deep Learning Models" },
  { title: "LLMs/RAG", color: "#10B981", description: "Generative AI Systems" },
  { title: "SQL/NoSQL", color: "#F29111", description: "Database Management" },
  { title: "Cloud/DevOps", color: "#FF9900", description: "AWS, GCP, CI/CD" },
];

function TextRing() {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state, delta) => {
    if (groupRef.current) {
      // Rotate the entire ring slowly
      groupRef.current.rotation.y += delta * 0.25;
      // Add a slight cinematic wobble
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
      groupRef.current.rotation.z = Math.cos(state.clock.elapsedTime * 0.3) * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Inner Glowing Torus (The Circle) */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[5, 0.02, 16, 100]} />
        <meshBasicMaterial color="#00FF66" transparent opacity={0.4} wireframe />
      </mesh>
      
      {/* Outer faint Torus for depth */}
      <mesh rotation={[Math.PI / 2, 0, 0]} scale={1.05}>
        <torusGeometry args={[5, 0.01, 16, 100]} />
        <meshBasicMaterial color="#00AA33" transparent opacity={0.15} />
      </mesh>

      {/* The Text Elements */}
      {skillCategories.map((skill, index) => {
        const angle = (index / skillCategories.length) * Math.PI * 2;
        const radius = 5;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;

        return (
          <group key={index} position={[x, 0, z]}>
            <Html center distanceFactor={15} zIndexRange={[100, 0]}>
              <div className="group relative cursor-pointer flex flex-col items-center">
                <div 
                  className="font-heading font-black text-xl md:text-3xl whitespace-nowrap transition-all duration-500 text-white/50 hover:text-white hover:scale-125"
                  style={{ textShadow: `0 0 20px ${skill.color}` }}
                >
                  {skill.title}
                </div>
                <div className="absolute top-full mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                  <div className="px-4 py-2 bg-black/80 border border-white/20 rounded-full backdrop-blur-md">
                    <span className="text-sm font-mono text-white/90 whitespace-nowrap">
                      {skill.description}
                    </span>
                  </div>
                </div>
              </div>
            </Html>
          </group>
        );
      })}
    </group>
  );
}

function HolographicCircleScene() {
  const { viewport } = useThree();
  const scale = Math.min(1, viewport.width / 15); // Scale down on mobile to fit the ring
  
  // Use a simple check for mobile to disable OrbitControls entirely on small screens
  // This prevents OrbitControls from attaching touch listeners that hijack vertical scrolling
  const isDesktop = typeof window !== "undefined" ? window.innerWidth > 768 : true;

  return (
    <group scale={scale}>
      <ambientLight intensity={0.2} />
      <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />
      
      {/* Central Floating Core (Optional, keeps it anchored visually) */}
      <Float speed={2} floatIntensity={0.5}>
        <mesh>
          <sphereGeometry args={[0.5, 16, 16]} />
          <meshBasicMaterial color="#00FF66" wireframe transparent opacity={0.2} />
        </mesh>
        <Html center>
          <div className="w-2 h-2 rounded-full bg-primary shadow-[0_0_15px_#00FF66] animate-pulse"></div>
        </Html>
      </Float>

      <TextRing />
      
      {isDesktop && (
        <OrbitControls 
          enableZoom={false} 
          enablePan={false} 
          enableRotate={true}
          autoRotate 
          autoRotateSpeed={0.5} 
          maxPolarAngle={Math.PI / 1.5}
          minPolarAngle={Math.PI / 3}
        />
      )}
    </group>
  );
}

export function Skills() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section id="skills" ref={containerRef} className="relative w-full min-h-[100svh] md:h-[120vh] bg-black overflow-hidden flex flex-col items-center justify-center py-20">
      
      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1 }}
        className="absolute top-32 z-10 text-center pointer-events-none"
      >
        <h2 className="text-sm font-mono tracking-[0.4em] uppercase text-primary mb-2">Technical Arsenal</h2>
        <h3 className="text-5xl md:text-7xl font-heading font-black text-white drop-shadow-md">
          The <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00FF66] to-[#00AA33]">Ecosystem</span>
        </h3>
        <p className="mt-4 text-muted max-w-xl mx-auto text-sm md:text-base hidden md:block">
          Interact with the holographic ring. Rotate the circle to explore my capabilities.
        </p>
      </motion.div>

      {/* 3D Canvas */}
      <div className="absolute inset-0 z-0">
        <Canvas 
          camera={{ position: [0, 5, 16], fov: 45 }}
          style={{ touchAction: 'auto' }}
          className="pointer-events-auto"
        >
          <HolographicCircleScene />
        </Canvas>
      </div>
      
      {/* Overlay Vignette for cinematic feel */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)] z-10" />
    </section>
  );
}
