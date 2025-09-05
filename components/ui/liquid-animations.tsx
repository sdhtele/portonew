"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";

interface SmoothRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  threshold?: number;
  slideDistance?: number;
}

export const SmoothReveal = ({
  children,
  className = "",
  delay = 0,
  duration = 0.5,
  threshold = 0.1,
  slideDistance = 15,
}: SmoothRevealProps) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold,
  });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (inView) {
      const timer = setTimeout(() => setIsVisible(true), delay);
      return () => clearTimeout(timer);
    }
  }, [inView, delay]);

  return (
    <div ref={ref} className={className}>
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, y: slideDistance }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: slideDistance }}
            transition={{ duration, ease: "easeOut" }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

interface LiquidGlassCardProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  hoverEffect?: boolean;
}

export const LiquidGlassCard = ({
  children,
  className = "",
  delay = 0,
  duration = 0.5,
  hoverEffect = true,
}: LiquidGlassCardProps) => {
  return (
    <motion.div
      className={cn(
        "bg-black/20 backdrop-blur-lg rounded-md md:rounded-lg lg:rounded-xl border border-white/20 shadow-white md:shadow-white-md relative overflow-hidden",
        className
      )}
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration, delay }}
      whileHover={hoverEffect ? { 
        y: -2,
        boxShadow: "0 8px 12px -4px rgba(255, 255, 255, 0.1), 0 4px 4px -4px rgba(255, 255, 255, 0.05)"
      } : {}}
    >
      {/* Liquid glass effect layers for black and white theme */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500"></div>
      <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-white/5 opacity-0 hover:opacity-20 transition-opacity duration-700 blur-md md:blur-lg"></div>
      
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
};

interface ParallaxSectionProps {
  children: React.ReactNode;
  className?: string;
  speed?: number;
}

export const ParallaxSection = ({
  children,
  className = "",
  speed = 0.5,
}: ParallaxSectionProps) => {
  return (
    <motion.div
      className={className}
      style={{
        y: typeof window !== 'undefined' ? window.scrollY * speed : 0,
      }}
      transition={{ type: "spring", stiffness: 100 }}
    >
      {children}
    </motion.div>
  );
};

// Helper function to generate cn utility if not available
function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}