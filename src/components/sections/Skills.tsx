"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Html, Stars, Float } from "@react-three/drei";
import * as THREE from "three";

const skillCategories = [
  { title: "Python", color: "#3776AB", radius: 2, speed: 0.5, size: 0.3, description: "Core Backend & Data Science" },
  { title: "TypeScript", color: "#3178C6", radius: 3, speed: 0.8, size: 0.25, description: "Type-Safe Architectures" },
  { title: "React/Next.js", color: "#61DAFB", radius: 4, speed: 0.4, size: 0.4, description: "Frontend Engineering" },
  { title: "PyTorch/TF", color: "#EE4C2C", radius: 5, speed: 0.6, size: 0.35, description: "Deep Learning Models" },
  { title: "LLMs/RAG", color: "#10B981", radius: 6, speed: 0.3, size: 0.45, description: "Generative AI Systems" },
  { title: "SQL/NoSQL", color: "#F29111", radius: 7, speed: 0.7, size: 0.3, description: "Database Management" },
  { title: "Cloud/DevOps", color: "#FF9900", radius: 8, speed: 0.45, size: 0.3, description: "AWS, GCP, CI/CD" },
];

function SkillPlanet({ data, index }: { data: any, index: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state, delta) => {
    if (groupRef.current) {
      // Orbit around the center
      groupRef.current.rotation.y += delta * data.speed * 0.2;
    }
    if (meshRef.current) {
      // Rotate the planet itself
      meshRef.current.rotation.y += delta;
      meshRef.current.rotation.x += delta * 0.5;
    }
  });

  return (
    <group ref={groupRef}>
      <group position={[data.radius, 0, 0]}>
        <mesh 
          ref={meshRef} 
          onPointerOver={() => setHovered(true)} 
          onPointerOut={() => setHovered(false)}
        >
          <sphereGeometry args={[data.size, 32, 32]} />
          <meshStandardMaterial 
            color={data.color} 
            emissive={data.color} 
            emissiveIntensity={hovered ? 2 : 0.5} 
            roughness={0.2}
            metalness={0.8}
            wireframe={hovered}
          />
        </mesh>
        
        {/* Glow / Aura */}
        <mesh scale={1.2}>
          <sphereGeometry args={[data.size, 32, 32]} />
          <meshBasicMaterial color={data.color} transparent opacity={hovered ? 0.4 : 0.1} blending={THREE.AdditiveBlending} />
        </mesh>

        <Html distanceFactor={15} center zIndexRange={[100, 0]}>
          <motion.div 
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: hovered ? 1 : 0.5, scale: hovered ? 1.2 : 1 }}
            className={`px-3 py-1 rounded-full whitespace-nowrap transition-all duration-300 pointer-events-none
              ${hovered ? 'bg-black/80 border border-white/50 backdrop-blur-md' : 'bg-transparent'}
            `}
          >
            <div className={`font-mono font-bold text-sm ${hovered ? 'text-white text-shadow-glow' : 'text-white/50'}`} style={{ textShadow: hovered ? `0 0 10px ${data.color}` : 'none' }}>
              {data.title}
            </div>
            {hovered && (
              <div className="text-[10px] text-gray-300 mt-1">{data.description}</div>
            )}
          </motion.div>
        </Html>
      </group>
      
      {/* Orbit Ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[data.radius - 0.02, data.radius + 0.02, 64]} />
        <meshBasicMaterial color={data.color} transparent opacity={0.1} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}

function SolarSystem() {
  return (
    <>
      <ambientLight intensity={0.2} />
      <pointLight position={[0, 0, 0]} intensity={2} color="#00F0FF" />
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      
      {/* Central Sun / Core */}
      <Float speed={2} floatIntensity={0.5}>
        <mesh>
          <sphereGeometry args={[1, 64, 64]} />
          <meshBasicMaterial color="#00F0FF" wireframe />
        </mesh>
        <mesh scale={1.2}>
          <sphereGeometry args={[1, 64, 64]} />
          <meshBasicMaterial color="#00F0FF" transparent opacity={0.2} blending={THREE.AdditiveBlending} />
        </mesh>
        <Html center>
          <div className="text-white font-heading font-black text-2xl tracking-tighter drop-shadow-[0_0_15px_#00F0FF]">CORE</div>
        </Html>
      </Float>

      {/* Planets */}
      {skillCategories.map((skill, index) => (
        <SkillPlanet key={index} data={skill} index={index} />
      ))}
      
      <OrbitControls 
        enableZoom={false} 
        enablePan={false} 
        autoRotate 
        autoRotateSpeed={0.5} 
        maxPolarAngle={Math.PI / 1.5}
        minPolarAngle={Math.PI / 3}
      />
    </>
  );
}

export function Skills() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section id="skills" ref={containerRef} className="relative w-full h-[120vh] bg-black overflow-hidden flex flex-col items-center justify-center py-20">
      
      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1 }}
        className="absolute top-32 z-10 text-center pointer-events-none"
      >
        <h2 className="text-sm font-mono tracking-[0.4em] uppercase text-primary mb-2">Technical Arsenal</h2>
        <h3 className="text-5xl md:text-7xl font-heading font-black text-white drop-shadow-md">
          The <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00F0FF] to-[#0088FF]">Ecosystem</span>
        </h3>
        <p className="mt-4 text-muted max-w-xl mx-auto text-sm md:text-base">
          Interact with the neural network of my capabilities. Rotate the system to explore.
        </p>
      </motion.div>

      {/* 3D Canvas */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 5, 12], fov: 45 }}>
          <SolarSystem />
        </Canvas>
      </div>
      
      {/* Overlay Vignette for cinematic feel */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)] z-10" />
    </section>
  );
}
