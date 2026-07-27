"use client";

import { useRef, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Float, useTexture } from "@react-three/drei";
import * as THREE from "three";

function LogoMesh() {
  const texture = useTexture("/aether-x.png");
  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <mesh>
        <planeGeometry args={[5, 5]} />
        <meshStandardMaterial map={texture} transparent={true} side={THREE.DoubleSide} />
      </mesh>
    </Float>
  );
}

export function Aether3D() {
  return (
    <div className="w-full h-full min-h-[400px] flex items-center justify-center relative cursor-grab active:cursor-grabbing">
      <div className="absolute inset-0 bg-blue-500/10 blur-[120px] rounded-full scale-75 opacity-50 pointer-events-none" />
      
      <Canvas camera={{ position: [0, 0, 6], fov: 50 }}>
        <ambientLight intensity={0.8} />
        <directionalLight position={[5, 5, 5]} intensity={1} color="#ffffff" />
        <directionalLight position={[-5, -5, -5]} intensity={0.5} color="#ffffff" />
        
        <Suspense fallback={null}>
          <LogoMesh />
        </Suspense>
        
        <OrbitControls 
          enableZoom={false} 
          enablePan={false} 
          autoRotate 
          autoRotateSpeed={1} 
        />
      </Canvas>
    </div>
  );
}
