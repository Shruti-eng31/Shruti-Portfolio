"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Float, RoundedBox } from "@react-three/drei";
import * as THREE from "three";

function PhoneBase() {
  return (
    <group position={[0, -1.5, 0]} rotation={[-Math.PI / 2, 0, -Math.PI / 6]}>
      {/* Phone Body */}
      <RoundedBox args={[4.5, 8, 0.3]} radius={0.3} smoothness={4} position={[0, 0, 0]}>
        <meshStandardMaterial color="#dbeafe" />
      </RoundedBox>
      {/* Screen */}
      <mesh position={[0, 0, 0.16]}>
        <planeGeometry args={[4, 7.5]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
      {/* Home button */}
      <mesh position={[0, -3.3, 0.17]}>
        <circleGeometry args={[0.2, 32]} />
        <meshStandardMaterial color="#bfdbfe" />
      </mesh>
    </group>
  );
}

function ClosedBook({ position, rotation, coverColor }: any) {
  return (
    <group position={position} rotation={rotation}>
      {/* Cover */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[2.5, 3.5, 0.5]} />
        <meshStandardMaterial color={coverColor} />
      </mesh>
      {/* Pages */}
      <mesh position={[0.1, 0, 0]}>
        <boxGeometry args={[2.4, 3.4, 0.4]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
      {/* Page lines texture mock */}
      <mesh position={[1.31, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[0.3, 3.3]} />
        <meshStandardMaterial color="#e2e8f0" />
      </mesh>
    </group>
  );
}

function OpenBook() {
  return (
    <group position={[1.5, 0.5, -1.5]} rotation={[0.2, -Math.PI / 4, 0.1]}>
      {/* Cover Backing */}
      <mesh position={[0, 0, -0.05]}>
        <boxGeometry args={[4.6, 3.6, 0.1]} />
        <meshStandardMaterial color="#5e17eb" />
      </mesh>
      {/* Left Pages */}
      <mesh position={[-1.1, 0, 0.1]} rotation={[0, -0.2, 0]}>
        <boxGeometry args={[2.2, 3.4, 0.15]} />
        <meshStandardMaterial color="#f8fafc" />
      </mesh>
      {/* Right Pages */}
      <mesh position={[1.1, 0, 0.1]} rotation={[0, 0.2, 0]}>
        <boxGeometry args={[2.2, 3.4, 0.15]} />
        <meshStandardMaterial color="#f8fafc" />
      </mesh>
    </group>
  );
}

function FloatingPanels() {
  return (
    <group position={[-2.5, 0, 1.5]} rotation={[0, Math.PI / 6, 0]}>
      <Float speed={3} rotationIntensity={0.2} floatIntensity={1}>
        {/* Panel 1 */}
        <mesh position={[0, 0.5, 0]}>
          <boxGeometry args={[1.5, 0.8, 0.05]} />
          <meshStandardMaterial color="#ffffff" transparent opacity={0.8} />
        </mesh>
        <mesh position={[0, 0.5, 0.03]}>
           <planeGeometry args={[1.2, 0.1]} />
           <meshBasicMaterial color="#3b82f6" />
        </mesh>
        <mesh position={[0, 0.3, 0.03]}>
           <planeGeometry args={[0.8, 0.05]} />
           <meshBasicMaterial color="#94a3b8" />
        </mesh>
      </Float>
      
      <Float speed={2} rotationIntensity={0.4} floatIntensity={1.5}>
        {/* Panel 2 */}
        <mesh position={[-0.5, -0.5, 0.5]}>
          <boxGeometry args={[1.2, 0.6, 0.05]} />
          <meshStandardMaterial color="#ffffff" transparent opacity={0.6} />
        </mesh>
      </Float>
    </group>
  );
}

function IsometricScene() {
  const group = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (group.current) {
      // Gentle floating animation for the entire scene
      group.current.position.y = Math.sin(state.clock.elapsedTime * 1.5) * 0.1;
    }
  });

  return (
    <group ref={group}>
      <PhoneBase />
      
      {/* Books Stack */}
      <group position={[0, 0.4, 0.5]} rotation={[0, -Math.PI / 6, 0]}>
        {/* Back Book */}
        <ClosedBook position={[0.6, 0, -0.4]} rotation={[0, 0, 0]} coverColor="#5e17eb" />
        {/* Middle Book */}
        <ClosedBook position={[0.3, 0, 0]} rotation={[0, 0.1, 0]} coverColor="#ff7a00" />
        {/* Front Book */}
        <ClosedBook position={[0, 0, 0.4]} rotation={[0, 0.2, 0]} coverColor="#5e17eb" />
        
        {/* Little bookmark on middle book */}
        <mesh position={[0.3, 1.8, 0]} rotation={[0, 0.1, 0]}>
          <boxGeometry args={[0.2, 0.4, 0.05]} />
          <meshBasicMaterial color="#fbbf24" />
        </mesh>
      </group>

      <OpenBook />
      <FloatingPanels />
    </group>
  );
}

export function Library3D() {
  return (
    <div className="w-full h-full min-h-[400px] flex items-center justify-center relative cursor-grab active:cursor-grabbing">
      {/* Background glow matching the vibe */}
      <div className="absolute inset-0 bg-purple-500/10 blur-[120px] rounded-full scale-75 opacity-50 pointer-events-none" />
      
      <Canvas camera={{ position: [6, 4, 8], fov: 40 }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 15, 10]} intensity={1.5} color="#ffffff" />
        <directionalLight position={[-10, 5, -5]} intensity={0.5} color="#5e17eb" />
        
        <IsometricScene />
        
        <OrbitControls 
          enableZoom={false} 
          enablePan={false} 
          autoRotate 
          autoRotateSpeed={0.5} 
          maxPolarAngle={Math.PI / 2 - 0.1}
        />
      </Canvas>
    </div>
  );
}
