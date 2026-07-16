"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Float, RoundedBox } from "@react-three/drei";
import * as THREE from "three";

// Red Cross Component
function RedCross({ position, scale = 1 }: any) {
  return (
    <group position={position} scale={scale}>
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[0.2, 0.6, 0.05]} />
        <meshStandardMaterial color="#ef4444" />
      </mesh>
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[0.6, 0.2, 0.05]} />
        <meshStandardMaterial color="#ef4444" />
      </mesh>
    </group>
  );
}

function Monitor() {
  return (
    <group position={[0, 0, -1]}>
      {/* Stand Base */}
      <mesh position={[0, -1.8, 0]}>
        <boxGeometry args={[1.5, 0.1, 1]} />
        <meshStandardMaterial color="#e2e8f0" />
      </mesh>
      {/* Stand Neck */}
      <mesh position={[0, -1, -0.2]}>
        <boxGeometry args={[0.4, 1.6, 0.2]} />
        <meshStandardMaterial color="#334155" />
      </mesh>
      {/* Monitor Body */}
      <RoundedBox args={[4.2, 3.2, 0.2]} radius={0.1} smoothness={4} position={[0, 0.2, 0]}>
        <meshStandardMaterial color="#1e293b" />
      </RoundedBox>
      {/* Screen */}
      <mesh position={[0, 0.2, 0.11]}>
        <planeGeometry args={[4, 3]} />
        <meshStandardMaterial color="#f8fafc" />
      </mesh>
      
      {/* On-Screen Elements */}
      {/* Stethoscope loop mock */}
      <mesh position={[-0.5, 0.5, 0.12]}>
         <torusGeometry args={[0.4, 0.05, 16, 32]} />
         <meshStandardMaterial color="#ef4444" />
      </mesh>
      <mesh position={[-0.5, -0.2, 0.12]}>
         <cylinderGeometry args={[0.05, 0.05, 1.4]} />
         <meshStandardMaterial color="#ef4444" />
      </mesh>
      {/* Red Button */}
      <mesh position={[0.2, -0.8, 0.12]}>
        <boxGeometry args={[1.5, 0.4, 0.05]} />
        <meshStandardMaterial color="#ef4444" />
      </mesh>
      <mesh position={[0.2, -0.8, 0.13]}>
        <planeGeometry args={[1.2, 0.2]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>
      
      {/* List items mock */}
      <mesh position={[1, 1, 0.12]}><boxGeometry args={[0.8, 0.15, 0.05]} /><meshBasicMaterial color="#cbd5e1" /></mesh>
      <mesh position={[1, 0.7, 0.12]}><boxGeometry args={[0.8, 0.15, 0.05]} /><meshBasicMaterial color="#cbd5e1" /></mesh>
      <mesh position={[1, 0.4, 0.12]}><boxGeometry args={[0.8, 0.15, 0.05]} /><meshBasicMaterial color="#cbd5e1" /></mesh>
    </group>
  );
}

function Clipboard() {
  return (
    <group position={[1.5, -1.8, 1]} rotation={[-Math.PI / 2, 0, -0.2]}>
      {/* Board */}
      <RoundedBox args={[2, 2.8, 0.1]} radius={0.05} position={[0, 0, 0]}>
        <meshStandardMaterial color="#0f172a" />
      </RoundedBox>
      {/* Paper */}
      <mesh position={[0, -0.1, 0.06]}>
        <boxGeometry args={[1.8, 2.5, 0.02]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
      {/* Clip */}
      <mesh position={[0, 1.2, 0.08]}>
        <boxGeometry args={[0.6, 0.2, 0.1]} />
        <meshStandardMaterial color="#fbbf24" />
      </mesh>
      {/* Pen */}
      <group position={[0.4, 0, 0.1]} rotation={[0, 0, 0.2]}>
        <mesh position={[0,0,0]}><cylinderGeometry args={[0.04, 0.04, 1.2]} /><meshStandardMaterial color="#ef4444" /></mesh>
        <mesh position={[0, 0.6, 0]}><cylinderGeometry args={[0.04, 0, 0.2]} /><meshStandardMaterial color="#fbbf24" /></mesh>
      </group>
      
      {/* Paper Lines */}
      <mesh position={[0, 0.6, 0.08]}><planeGeometry args={[1.4, 0.02]} /><meshBasicMaterial color="#94a3b8" /></mesh>
      <mesh position={[0, 0.3, 0.08]}><planeGeometry args={[1.4, 0.02]} /><meshBasicMaterial color="#94a3b8" /></mesh>
      <mesh position={[0, 0, 0.08]}><planeGeometry args={[1.4, 0.02]} /><meshBasicMaterial color="#94a3b8" /></mesh>
    </group>
  );
}

function PillBottle() {
  return (
    <group position={[-2, -1, 0.5]}>
      {/* Bottle Body */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.4, 0.4, 1.2]} />
        <meshStandardMaterial color="#3b82f6" />
      </mesh>
      {/* Label */}
      <mesh position={[0, -0.1, 0]}>
        <cylinderGeometry args={[0.41, 0.41, 0.7]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
      {/* Red Cross on Label */}
      <RedCross position={[0, -0.1, 0.42]} scale={0.5} />
      
      {/* Cap */}
      <mesh position={[0, 0.7, 0]}>
        <cylinderGeometry args={[0.42, 0.42, 0.3]} />
        <meshStandardMaterial color="#ef4444" />
      </mesh>
    </group>
  );
}

function Pills() {
  return (
    <group position={[0.5, -1.8, 1.5]}>
      {/* Capsule 1 */}
      <group position={[0, 0.1, 0]} rotation={[Math.PI / 2, 0.3, 0]}>
         <mesh position={[0, 0.2, 0]}><cylinderGeometry args={[0.1, 0.1, 0.4]} /><meshStandardMaterial color="#ef4444" /></mesh>
         <mesh position={[0, -0.2, 0]}><cylinderGeometry args={[0.1, 0.1, 0.4]} /><meshStandardMaterial color="#ffffff" /></mesh>
         <mesh position={[0, 0.4, 0]}><sphereGeometry args={[0.1]} /><meshStandardMaterial color="#ef4444" /></mesh>
         <mesh position={[0, -0.4, 0]}><sphereGeometry args={[0.1]} /><meshStandardMaterial color="#ffffff" /></mesh>
      </group>
      
      {/* Capsule 2 */}
      <group position={[0.4, 0.1, -0.3]} rotation={[Math.PI / 2, -0.5, 0]}>
         <mesh position={[0, 0.2, 0]}><cylinderGeometry args={[0.1, 0.1, 0.4]} /><meshStandardMaterial color="#ef4444" /></mesh>
         <mesh position={[0, -0.2, 0]}><cylinderGeometry args={[0.1, 0.1, 0.4]} /><meshStandardMaterial color="#ffffff" /></mesh>
         <mesh position={[0, 0.4, 0]}><sphereGeometry args={[0.1]} /><meshStandardMaterial color="#ef4444" /></mesh>
         <mesh position={[0, -0.4, 0]}><sphereGeometry args={[0.1]} /><meshStandardMaterial color="#ffffff" /></mesh>
      </group>
    </group>
  );
}

function DoctorPanel() {
  return (
    <group position={[-2.5, 1.5, 0]} rotation={[0, 0.2, 0]}>
      <Float speed={2} floatIntensity={1} rotationIntensity={0.2}>
        <mesh position={[0, 0, 0]}>
           <boxGeometry args={[1.8, 2.2, 0.1]} />
           <meshStandardMaterial color="#f8fafc" />
        </mesh>
        
        {/* Doctor Silhouette */}
        {/* Body */}
        <mesh position={[0, -0.5, 0.06]}>
           <cylinderGeometry args={[0.6, 0.6, 1]} />
           <meshStandardMaterial color="#e2e8f0" />
        </mesh>
        {/* Tie */}
        <mesh position={[0, -0.3, 0.61]}>
           <boxGeometry args={[0.1, 0.4, 0.1]} />
           <meshStandardMaterial color="#ef4444" />
        </mesh>
        {/* Head */}
        <mesh position={[0, 0.3, 0.1]}>
           <sphereGeometry args={[0.4]} />
           <meshStandardMaterial color="#fcd34d" />
        </mesh>
        {/* Hair */}
        <mesh position={[0, 0.5, 0.1]}>
           <sphereGeometry args={[0.42, 32, 32, 0, Math.PI * 2, 0, Math.PI / 2]} />
           <meshStandardMaterial color="#1e293b" />
        </mesh>
        
        {/* Chat Bubble */}
        <mesh position={[1, 0.8, 0.1]}>
          <boxGeometry args={[0.6, 0.4, 0.05]} />
          <meshStandardMaterial color="#fbbf24" />
        </mesh>
        <mesh position={[-1, 0.5, 0.1]}>
          <boxGeometry args={[0.6, 0.4, 0.05]} />
          <meshStandardMaterial color="#ef4444" />
        </mesh>
        <RedCross position={[-1, 0.5, 0.13]} scale={0.4} />
      </Float>
    </group>
  );
}

function IsometricHospitalScene() {
  const group = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (group.current) {
      group.current.position.y = Math.sin(state.clock.elapsedTime * 1.5) * 0.1;
    }
  });

  return (
    <group ref={group} scale={0.8} position={[0, 0.5, 0]}>
      <Monitor />
      <Clipboard />
      <PillBottle />
      <Pills />
      <DoctorPanel />
    </group>
  );
}

export function Hospital3D() {
  return (
    <div className="w-full h-full min-h-[400px] flex items-center justify-center relative cursor-grab active:cursor-grabbing">
      {/* Background glow matching the vibe */}
      <div className="absolute inset-0 bg-blue-500/10 blur-[120px] rounded-full scale-75 opacity-50 pointer-events-none" />
      
      <Canvas camera={{ position: [8, 6, 8], fov: 40 }}>
        <ambientLight intensity={0.8} />
        <directionalLight position={[10, 15, 10]} intensity={1.5} color="#ffffff" />
        <directionalLight position={[-10, 5, -5]} intensity={0.5} color="#3b82f6" />
        
        <IsometricHospitalScene />
        
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
