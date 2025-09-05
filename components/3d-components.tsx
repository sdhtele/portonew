"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

interface Interactive3DCardProps {
  children: React.ReactNode;
  className?: string;
}

export const Interactive3DCard = ({ children, className = "" }: Interactive3DCardProps) => {
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateY = ((x - centerX) / centerX) * 10;
    const rotateX = ((centerY - y) / centerY) * 10;
    
    setRotate({ x: rotateX, y: rotateY });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotate({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={cardRef}
      className={`relative overflow-hidden rounded-2xl ${className} bg-black/20 border border-white/20`}
      style={{
        transformStyle: "preserve-3d",
        transform: `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg) ${isHovered ? 'translateZ(20px)' : 'translateZ(0)'}`,
        transition: "transform 0.1s ease-out",
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
};

interface Floating3DObjectProps {
  className?: string;
  children: React.ReactNode;
  floatIntensity?: number;
}

export const Floating3DObject = ({ className = "", children, floatIntensity = 15 }: Floating3DObjectProps) => {
  return (
    <motion.div
      className={`${className} bg-black/20 border border-white/20 rounded-xl`}
      animate={{
        y: [0, -floatIntensity, 0],
        rotateX: [0, 5, 0],
        rotateY: [0, -5, 0],
      }}
      transition={{
        duration: 6,
        repeat: Infinity,
        repeatType: "reverse",
      }}
      style={{
        transformStyle: "preserve-3d",
      }}
      whileHover={{
        scale: 1.1,
        rotate: 10,
      }}
    >
      <div className="p-4 relative">
        {children}
      </div>
    </motion.div>
  );
};

interface GlowingOrbProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

export const GlowingOrb = ({ 
  size = "md", 
  className = ""
}: GlowingOrbProps) => {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-16 h-16",
    lg: "w-24 h-24",
  };

  return (
    <motion.div
      className={`${sizeClasses[size]} bg-white rounded-full ${className}`}
      animate={{
        scale: [1, 1.2, 1],
        opacity: [0.3, 0.6, 0.3],
        x: [0, 10, 0],
        y: [0, -10, 0],
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        repeatType: "reverse",
      }}
      style={{
        boxShadow: "0 0 30px rgba(255, 255, 255, 0.4)",
      }}
      whileHover={{
        scale: 1.3,
      }}
    />
  );
};

interface RotatingCubeProps {
  size?: number;
  className?: string;
}

export const RotatingCube = ({ 
  size = 50, 
  className = ""
}: RotatingCubeProps) => {
  return (
    <motion.div
      className={`bg-white/20 border border-white/30 ${className}`}
      style={{
        width: size,
        height: size,
        transformStyle: "preserve-3d",
      }}
      animate={{
        rotateX: 360,
        rotateY: 360,
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: "linear",
      }}
    >
      <div className="absolute inset-0 border border-white/20"></div>
      <div className="absolute inset-0 border border-white/20 transform rotateY(180deg) translateZ(6px)"></div>
      <div className="absolute inset-0 border border-white/20 transform rotateX(90deg) translateZ(6px)"></div>
      <div className="absolute inset-0 border border-white/20 transform rotateX(-90deg) translateZ(6px)"></div>
      <div className="absolute inset-0 border border-white/20 transform rotateY(90deg) translateZ(6px)"></div>
      <div className="absolute inset-0 border border-white/20 transform rotateY(-90deg) translateZ(6px)"></div>
    </motion.div>
  );
};