"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Download } from "lucide-react";
import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Environment } from "@react-three/drei";
import * as THREE from "three";

function FloatingBlobs() {
  const meshRef1 = useRef<THREE.Mesh>(null);
  const meshRef2 = useRef<THREE.Mesh>(null);
  const meshRef3 = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (meshRef1.current) meshRef1.current.rotation.y = time * 0.2;
    if (meshRef2.current) meshRef2.current.rotation.x = time * 0.3;
    if (meshRef3.current) meshRef3.current.rotation.z = time * 0.1;
  });

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <Environment preset="city" />
      
      <Float speed={2} rotationIntensity={1} floatIntensity={2} floatingRange={[-1, 1]}>
        <mesh ref={meshRef1} position={[-4, 1, -5]} scale={1.5}>
          <sphereGeometry args={[1, 64, 64]} />
          <MeshDistortMaterial color="#00F0FF" envMapIntensity={1} clearcoat={1} clearcoatRoughness={0.1} metalness={0.8} roughness={0.2} distort={0.4} speed={2} />
        </mesh>
      </Float>

      <Float speed={3} rotationIntensity={2} floatIntensity={3} floatingRange={[-2, 2]}>
        <mesh ref={meshRef2} position={[4, -2, -8]} scale={2}>
          <torusGeometry args={[1, 0.4, 32, 100]} />
          <MeshDistortMaterial color="#7000FF" envMapIntensity={1} clearcoat={1} clearcoatRoughness={0.1} metalness={0.8} roughness={0.2} distort={0.2} speed={3} />
        </mesh>
      </Float>

      <Float speed={1.5} rotationIntensity={1.5} floatIntensity={1.5} floatingRange={[-1, 1]}>
        <mesh ref={meshRef3} position={[0, -4, -4]} scale={1.2}>
          <icosahedronGeometry args={[1, 0]} />
          <MeshDistortMaterial color="#0088FF" envMapIntensity={1} clearcoat={1} clearcoatRoughness={0.1} metalness={0.8} roughness={0.2} distort={0.3} speed={1} />
        </mesh>
      </Float>
    </>
  );
}

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const titleWords = ["Creating", "Billion", "Dollar", "Experiences"];

  return (
    <section ref={containerRef} id="home" className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden">
      {/* 3D Background */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
          <FloatingBlobs />
        </Canvas>
      </div>

      {/* Grid Overlay */}
      <div className="absolute inset-0 z-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,black,transparent)] pointer-events-none" />

      {/* Main Content */}
      <motion.div style={{ y, opacity }} className="relative z-10 flex flex-col items-center text-center px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="px-4 py-2 rounded-full border border-primary/30 bg-black/20 backdrop-blur-md mb-8 inline-flex items-center gap-2"
        >
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse shadow-[0_0_10px_var(--primary)]" />
          <span className="text-sm md:text-base font-mono uppercase tracking-widest text-primary">Systems Architect & Developer</span>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 mb-6">
          {titleWords.map((word, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 50, rotateX: -90 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{
                duration: 0.8,
                delay: i * 0.15 + 0.5,
                type: "spring",
                damping: 12,
                stiffness: 100
              }}
              className="text-6xl md:text-8xl lg:text-[9rem] font-heading font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-500 drop-shadow-2xl"
            >
              {word}
            </motion.span>
          ))}
        </div>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="text-lg md:text-xl text-muted max-w-2xl mt-6 font-light leading-relaxed"
        >
          Engineering scalable web applications, machine learning solutions, and immersive interactive architectures for the future.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.8 }}
          className="flex flex-col sm:flex-row items-center gap-6 mt-12"
        >
          <a href="#projects" className="magnetic group relative inline-flex items-center justify-center px-8 py-4 font-bold text-black bg-primary rounded-full overflow-hidden transition-all hover:scale-110 shadow-[0_0_20px_var(--primary)] hover:shadow-[0_0_40px_var(--primary)]">
            {/* Liquid effect overlay */}
            <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
            <span className="relative flex items-center gap-2 mix-blend-difference text-white">
              Explore Portfolio <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform duration-300" />
            </span>
          </a>
          
          <a href="/resume.pdf" target="_blank" className="magnetic group relative inline-flex items-center justify-center px-8 py-4 font-bold text-white rounded-full border border-white/20 bg-white/5 backdrop-blur-md overflow-hidden transition-all hover:scale-105 hover:bg-white/10">
            <span className="flex items-center gap-2">
              <Download size={20} className="group-hover:-translate-y-1 transition-transform duration-300" /> View Resume
            </span>
          </a>
        </motion.div>
      </motion.div>
      
      {/* Scroll indicator */}
      <motion.div 
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs font-mono tracking-widest text-muted uppercase">Scroll</span>
        <div className="w-[1px] h-[60px] bg-white/20 relative overflow-hidden">
          <motion.div 
            className="absolute top-0 left-0 w-full h-1/3 bg-primary"
            animate={{ top: ["-30%", "100%"] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          />
        </div>
      </motion.div>
    </section>
  );
}
