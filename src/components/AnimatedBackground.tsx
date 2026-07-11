"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { useTheme } from "next-themes";

export function AnimatedBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!containerRef.current || !mounted) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    
    // Clear previous canvas if theme changes
    while (containerRef.current.firstChild) {
      containerRef.current.removeChild(containerRef.current.firstChild);
    }
    containerRef.current.appendChild(renderer.domElement);

    // Create particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 700;
    const posArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 10;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

    const isLightMode = resolvedTheme === 'light';

    const material = new THREE.PointsMaterial({
      size: 0.015,
      color: isLightMode ? 0x00A86B : 0x00E676,
      transparent: true,
      opacity: isLightMode ? 0.4 : 0.8,
      blending: isLightMode ? THREE.NormalBlending : THREE.AdditiveBlending,
      sizeAttenuation: true
    });

    const particlesMesh = new THREE.Points(particlesGeometry, material);
    scene.add(particlesMesh);

    camera.position.z = 2;

    // Mouse interaction
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const windowHalfX = window.innerWidth / 2;
    const windowHalfY = window.innerHeight / 2;

    const onDocumentMouseMove = (event: MouseEvent) => {
      mouseX = (event.clientX - windowHalfX);
      mouseY = (event.clientY - windowHalfY);
    };

    document.addEventListener('mousemove', onDocumentMouseMove);

    // Animation Loop
    const clock = new THREE.Clock();
    let animationFrameId: number;

    const animate = () => {
      const elapsedTime = clock.getElapsedTime();
      
      targetX = mouseX * 0.001;
      targetY = mouseY * 0.001;
      
      particlesMesh.rotation.y += 0.001;
      particlesMesh.rotation.x += 0.0005;

      particlesMesh.rotation.y += 0.05 * (targetX - particlesMesh.rotation.y);
      particlesMesh.rotation.x += 0.05 * (targetY - particlesMesh.rotation.x);

      // Add wave effect to particles
      const positions = particlesGeometry.attributes.position.array as Float32Array;
      for (let i = 0; i < particlesCount; i++) {
        const i3 = i * 3;
        const x = positions[i3];
        const y = positions[i3 + 1];
        positions[i3 + 2] = Math.sin(elapsedTime + x) * 0.2 + Math.cos(elapsedTime + y) * 0.2;
      }
      particlesGeometry.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('mousemove', onDocumentMouseMove);
      cancelAnimationFrame(animationFrameId);
      if (containerRef.current) {
        while (containerRef.current.firstChild) {
          containerRef.current.removeChild(containerRef.current.firstChild);
        }
      }
      particlesGeometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, [resolvedTheme, mounted]);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none">
      {/* Animated glowing blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 rounded-full dark:mix-blend-screen mix-blend-multiply filter blur-[100px] opacity-50 animate-blob"></div>
      <div className="absolute top-[20%] right-[-10%] w-[50%] h-[50%] bg-primary-dark/20 rounded-full dark:mix-blend-screen mix-blend-multiply filter blur-[120px] opacity-40 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-[-20%] left-[20%] w-[60%] h-[60%] bg-emerald-500/10 rounded-full dark:mix-blend-screen mix-blend-multiply filter blur-[130px] opacity-60 animate-blob animation-delay-4000"></div>
      
      {/* Three.js Particles */}
      <div 
        ref={containerRef} 
        className="absolute inset-0 opacity-100"
      />
    </div>
  );
}
