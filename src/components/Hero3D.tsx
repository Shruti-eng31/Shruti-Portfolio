"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, Sphere, Box, Torus, Wireframe, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

function FloatingObjects() {
  const group = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y = state.clock.getElapsedTime() * 0.1;
      group.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.2) * 0.1;
    }
  });

  return (
    <group ref={group}>
      {/* Central "AI Brain" - distorted sphere */}
      <Float speed={2} rotationIntensity={1} floatIntensity={2} position={[0, 0, 0]}>
        <Sphere args={[1.2, 64, 64]}>
          <MeshDistortMaterial
            color="#00E676"
            emissive="#00C853"
            emissiveIntensity={0.5}
            wireframe
            distort={0.3}
            speed={2}
          />
        </Sphere>
      </Float>

      {/* Orbiting "Data" Cubes */}
      <Float speed={3} rotationIntensity={2} floatIntensity={1.5} position={[2.5, 1, -1]}>
        <Box args={[0.6, 0.6, 0.6]}>
          <meshStandardMaterial color="#050505" opacity={0.8} transparent />
          <Wireframe stroke={"#00E676"} thickness={0.02} />
        </Box>
      </Float>
      
      <Float speed={2.5} rotationIntensity={3} floatIntensity={2} position={[-2, -1.5, 1]}>
        <Box args={[0.5, 0.5, 0.5]}>
          <meshStandardMaterial color="#00C853" emissive="#00C853" emissiveIntensity={0.5} />
        </Box>
      </Float>

      <Float speed={4} rotationIntensity={1} floatIntensity={1.5} position={[1.5, -2, -2]}>
        <Box args={[0.4, 0.4, 0.4]}>
          <meshStandardMaterial color="#050505" />
          <Wireframe stroke={"#ffffff"} thickness={0.01} />
        </Box>
      </Float>

      {/* Rotating Torus/Ring - representing connection/network */}
      <Float speed={1.5} rotationIntensity={2} floatIntensity={1} position={[0, 0, 0]}>
        <Torus args={[2.5, 0.02, 16, 100]} rotation={[Math.PI / 2, 0, 0]}>
          <meshStandardMaterial color="#00E676" emissive="#00E676" emissiveIntensity={1} />
        </Torus>
      </Float>
      
      <Float speed={1.5} rotationIntensity={2} floatIntensity={1} position={[0, 0, 0]}>
        <Torus args={[3.2, 0.01, 16, 100]} rotation={[Math.PI / 3, Math.PI / 4, 0]}>
          <meshStandardMaterial color="#ffffff" opacity={0.3} transparent />
        </Torus>
      </Float>
    </group>
  );
}

export function Hero3D() {
  return (
    <div className="w-full h-full min-h-[400px] md:min-h-[600px]">
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#00E676" />
        <FloatingObjects />
        <Environment preset="city" />
      </Canvas>
    </div>
  );
}
