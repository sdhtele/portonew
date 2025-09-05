"use client";

import { useEffect, useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LiquidGlassButton } from "@/components/ui/liquid-glass-button";
import { Badge } from "@/components/ui/badge";
import { Project } from "@/lib/projects";
import { getProjects } from "@/lib/projects-service";
import { Github, ExternalLink, Mail, Phone, MapPin, Sparkles, Code, Palette, Zap, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import { motion, useAnimation, useInView } from "framer-motion";
import { useInView as useInViewObserver } from "react-intersection-observer";
import { SmoothReveal, LiquidGlassCard } from "@/components/ui/liquid-animations";

// Animated text component for typewriter effect
const AnimatedText = ({ text, className = "" }: { text: string; className?: string }) => {
  const [displayedText, setDisplayedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, 50);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text]);

  return (
    <span className={className}>
      {displayedText}
      <span className="animate-pulse">|</span>
    </span>
  );
};

// Animated counter component with black and white theme
const AnimatedCounter = ({ value, duration = 2000 }: { value: number; duration?: number }) => {
  const [count, setCount] = useState(0);
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      controls.start({ opacity: 1, y: 0 });
      let start = 0;
      const increment = value / (duration / 16);
      const timer = setInterval(() => {
        start += increment;
        if (start >= value) {
          setCount(value);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);
      return () => clearInterval(timer);
    }
  }, [isInView, value, duration, controls]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={controls}
      className="text-4xl md:text-5xl font-bold text-white"
    >
      {count}+
    </motion.div>
  );
};

export default function Home() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const heroRef = useRef<HTMLDivElement>(null);
  const [ref, inView] = useInViewObserver({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await getProjects();
        setProjects(data.slice(0, 3)); // Show only the first 3 projects
      } catch (error) {
        console.error("Gagal mengambil proyek:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <div className="min-h-screen bg-black">
      {/* Enhanced Hero Section with Black and White Theme */}
      <div className="relative overflow-hidden min-h-screen flex items-center" ref={heroRef}>
        {/* Background pattern for black and white theme */}
        <div className="absolute inset-0 bg-diagonal-lines opacity-5"></div>
        
        {/* Animated background elements for black and white theme */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div 
            className="absolute -top-40 -right-40 w-80 h-80 border-2 border-white rounded-full opacity-10"
            animate={{ 
              x: [0, 50, 0],
              y: [0, -50, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
          <motion.div 
            className="absolute -bottom-40 -left-40 w-80 h-80 border-2 border-white rounded-full opacity-10"
            animate={{ 
              x: [0, -50, 0],
              y: [0, 50, 0],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
          <motion.div 
            className="absolute top-40 left-40 w-80 h-80 border-2 border-white rounded-full opacity-10"
            animate={{ 
              x: [0, 30, 0],
              y: [0, -30, 0],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        </div>
        
        <div className="container mx-auto px-4 py-12 md:py-20 relative z-10">
          <div className="flex flex-col items-center text-center max-w-5xl mx-auto px-4">
            {/* Enhanced profile badge with black and white animation */}
            <motion.div 
              className="relative mb-6 md:mb-8"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <motion.div 
                className="absolute inset-0 border border-white rounded-full opacity-20"
                animate={{ 
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
              />
              
              {/* Profile Card with black and white theme */}
              <div className="relative w-28 h-28 md:w-40 md:h-40 rounded-full bg-black border-2 md:border-4 border-white mx-auto flex items-center justify-center shadow-white-lg">
                <span className="text-3xl md:text-5xl font-bold text-white">
                  N
                </span>
              </div>
              
              <motion.div 
                className="absolute -bottom-1 -right-1 w-6 h-6 md:w-8 md:h-8 rounded-full bg-white border-2 md:border-4 border-black flex items-center justify-center shadow-md"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
                whileHover={{ rotate: 360 }}
              >
                <Sparkles className="w-3 h-3 md:w-4 md:h-4 text-black" />
              </motion.div>
            </motion.div>
            
            {/* Enhanced title with black and white styling */}
            <motion.h1 
              className="text-3xl md:text-5xl font-extrabold mb-3 md:mb-4 text-white"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              ngnawfal
            </motion.h1>
            
            <motion.h2 
              className="text-base md:text-xl font-medium text-white mb-4 md:mb-6 px-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Pengembang Full Stack & <span className="font-bold">Penggemar UI/UX</span>
            </motion.h2>
            
            <motion.div
              className="text-sm md:text-base text-white mb-6 md:mb-8 px-4 max-w-4xl"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <p className="mb-2 md:mb-3">
                Saya membangun aplikasi web yang <span className="font-bold underline">indah</span>,{" "}
                <span className="font-bold underline">berfungsi</span>, dan{" "}
                <span className="font-bold underline">berkinerja tinggi</span>
              </p>
              <AnimatedText 
                text="dengan teknologi modern dan pengalaman digital yang luar biasa."
                className="font-medium"
              />
            </motion.div>
            
            {/* Stats section with animated counters */}
            <motion.div 
              className="grid grid-cols-3 gap-3 md:gap-4 mb-8 md:mb-12 w-full max-w-xs md:max-w-md"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <div className="text-center">
                <AnimatedCounter value={50} />
                <p className="text-white text-xs md:text-sm mt-1">Proyek</p>
              </div>
              <div className="text-center">
                <AnimatedCounter value={5} />
                <p className="text-white text-xs md:text-sm mt-1">Tahun</p>
              </div>
              <div className="text-center">
                <AnimatedCounter value={30} />
                <p className="text-white text-xs md:text-sm mt-1">Klien</p>
              </div>
            </motion.div>
            
            {/* Enhanced CTA buttons with black and white theme */}
            <motion.div 
              className="flex flex-wrap justify-center gap-3 md:gap-4 mb-8 md:mb-12"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link href="/projects">
                  <LiquidGlassButton variant="outline" size="md" animated className="px-5 py-3 md:px-7 md:py-4 text-sm md:text-base font-bold border border-white text-white hover:bg-white hover:text-black rounded-lg">
                    <Zap className="mr-1.5 h-3.5 w-3.5 md:mr-2 md:h-4 md:w-4" />
                    Lihat Karya Saya
                    <ArrowRight className="ml-1.5 h-3.5 w-3.5 md:ml-2 md:h-4 md:w-4" />
                  </LiquidGlassButton>
                </Link>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link href="/contact">
                  <LiquidGlassButton variant="default" size="md" animated className="px-5 py-3 md:px-7 md:py-4 text-sm md:text-base font-bold bg-white text-black hover:bg-black hover:text-white hover:border-white hover:border rounded-lg">
                    <Mail className="mr-1.5 h-3.5 w-3.5 md:mr-2 md:h-4 md:w-4" />
                    Hubungi Saya
                  </LiquidGlassButton>
                </Link>
              </motion.div>
            </motion.div>
            
            {/* Theme Toggle */}
            <motion.div 
              className="flex gap-3 md:gap-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
            >
              <ThemeToggle />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Enhanced Featured Projects with black and white theme */}
      <SmoothReveal>
        <div className="container mx-auto px-4 py-12 md:py-20" ref={ref}>
          <div className="text-center mb-8 md:mb-16">
            <h2 className="text-2xl md:text-4xl font-bold mb-3 md:mb-6 text-white">
              Proyek Unggulan
            </h2>
            <p className="text-sm md:text-base text-white max-w-4xl mx-auto px-4">
              Berikut adalah beberapa karya terbaru saya. Setiap proyek mencerminkan passion saya terhadap kode yang bersih,
              desain yang indah, dan pengalaman pengguna yang luar biasa.
            </p>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="animate-pulse overflow-hidden rounded-xl md:rounded-2xl bg-black border border-white/20">
                  <div className="bg-white/10 aspect-video rounded-t-xl md:rounded-t-2xl" />
                  <CardHeader>
                    <div className="h-5 bg-white/10 rounded w-3/4 mb-2"></div>
                    <div className="h-3 bg-white/10 rounded w-full"></div>
                  </CardHeader>
                </Card>
              ))}
            </div>
          ) : projects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
              {projects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -3 }}
                  className="h-full"
                >
                  <LiquidGlassCard className="h-full overflow-hidden group border border-white/20 rounded-xl md:rounded-2xl">
                    <div className="relative aspect-video overflow-hidden rounded-t-xl md:rounded-t-2xl bg-black">
                      {project.imageUrl ? (
                        <Image
                          src={project.imageUrl}
                          alt={project.title}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-110 filter grayscale hover:grayscale-0"
                        />
                      ) : (
                        <div className="bg-white/10 w-full h-full" />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <Badge variant="secondary" className="absolute top-3 right-3 text-xs bg-white/10 backdrop-blur-sm px-2 py-1 md:px-3 md:py-1.5 rounded-full shadow-md border border-white/20 text-white">
                        Unggulan
                      </Badge>
                    </div>
                    <CardHeader className="pb-2 md:pb-3 flex-grow">
                      <CardTitle className="flex items-center justify-between text-base md:text-lg text-white">
                        {project.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="mt-auto">
                      <p className="text-white/80 line-clamp-3 mb-3 md:mb-6 text-xs md:text-sm">
                        {project.description}
                      </p>
                      <Link href={`/projects/${project.id}`}>
                        <LiquidGlassButton variant="outline" className="w-full py-2 md:py-3 text-xs md:text-base font-medium border-white text-white hover:bg-white hover:text-black rounded-md">
                          Lihat Proyek
                          <ExternalLink className="ml-1.5 w-3 h-3 md:ml-2 md:w-4 md:h-4" />
                        </LiquidGlassButton>
                      </Link>
                    </CardContent>
                  </LiquidGlassCard>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 md:py-16">
              <p className="text-white text-base md:text-xl">Belum ada proyek tersedia.</p>
            </div>
          )}

          <div className="text-center mt-8 md:mt-12">
            <Link href="/projects">
              <LiquidGlassButton variant="outline" className="rounded-full text-base md:text-lg px-6 py-3 md:px-8 md:py-4 border-white text-white hover:bg-white hover:text-black">
                Lihat Semua Proyek
                <ExternalLink className="ml-2 w-4 h-4 md:ml-2 md:w-5 md:h-5" />
              </LiquidGlassButton>
            </Link>
          </div>
        </div>
      </SmoothReveal>

      {/* Enhanced Skills Section with black and white theme */}
      <SmoothReveal>
        <div className="container mx-auto px-4 py-12 md:py-20">
          <div className="rounded-xl md:rounded-2xl p-4 md:p-8 border border-white/20 bg-black/50">
            <div className="text-center mb-6 md:mb-12">
              <h2 className="text-xl md:text-3xl font-bold mb-3 md:mb-6 text-white">
                Teknologi yang Saya Gunakan
              </h2>
              <p className="text-xs md:text-base text-white max-w-4xl mx-auto px-4">
                Saya mengkhususkan diri dalam membangun aplikasi web modern menggunakan teknologi terdepan.
              </p>
            </div>
            
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-6">
              {[
                { name: "React", icon: "⚛️" },
                { name: "Next.js", icon: "▲" },
                { name: "TypeScript", icon: "📝" },
                { name: "Node.js", icon: "🟢" },
                { name: "Tailwind CSS", icon: "🎨" },
                { name: "PostgreSQL", icon: "🐘" },
                { name: "Drizzle ORM", icon: "🔧" },
                { name: "Framer Motion", icon: "💫" },
                { name: "GraphQL", icon: "📊" },
                { name: "Docker", icon: "🐳" },
                { name: "AWS", icon: "☁️" },
                { name: "UI/UX Design", icon: "✨" }
              ].map((tech, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -3 }}
                  className="h-full"
                >
                  {/* Skill Card with black and white theme */}
                  <LiquidGlassCard className="h-full flex flex-col items-center justify-center p-3 md:p-6 border border-white/20 hover:bg-white/10 rounded-lg md:rounded-xl">
                    <motion.div 
                      className="text-xl md:text-3xl mb-2 md:mb-4 group-hover:scale-110 transition-transform duration-300"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                    >
                      {tech.icon}
                    </motion.div>
                    <div className="font-bold text-xs md:text-base text-white group-hover:text-white transition-colors text-center">
                      {tech.name}
                    </div>
                  </LiquidGlassCard>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </SmoothReveal>

      {/* Enhanced Contact CTA with black and white theme */}
      <SmoothReveal>
        <div className="container mx-auto px-4 py-12 md:py-24">
          <div className="max-w-5xl mx-auto text-center relative">
            {/* Decorative elements */}
            <motion.div 
              className="absolute -top-8 -left-8 w-24 h-24 md:-top-16 md:-left-16 md:w-48 md:h-48 border border-white/10 rounded-full -z-10"
              animate={{ 
                x: [0, 5, 0],
                y: [0, -5, 0],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            />
            <motion.div 
              className="absolute -bottom-8 -right-8 w-24 h-24 md:-bottom-16 md:-right-16 md:w-48 md:h-48 border border-white/10 rounded-full -z-10"
              animate={{ 
                x: [0, -5, 0],
                y: [0, 5, 0],
              }}
              transition={{
                duration: 12,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            />
            
            <div className="relative rounded-xl md:rounded-2xl p-6 md:p-12 border border-white/20 bg-black/50 shadow-white-lg">
              <motion.h2 
                className="text-xl md:text-3xl font-bold mb-3 md:mb-6 text-white"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                Tertarik Bekerja Sama?
              </motion.h2>
              <motion.p 
                className="text-xs md:text-base text-white mb-6 md:mb-10 max-w-3xl mx-auto px-4"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                Saya selalu terbuka untuk mendiskusikan peluang baru, proyek kreatif, atau kolaborasi potensial.
              </motion.p>
              <motion.div 
                className="flex flex-wrap justify-center gap-3 md:gap-8"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link href="/contact">
                    <LiquidGlassButton variant="default" size="md" animated className="px-5 py-3 md:px-10 md:py-6 text-xs md:text-xl font-bold bg-white text-black hover:bg-black hover:text-white hover:border-white hover:border rounded-lg">
                      <Mail className="mr-1.5 w-3 h-3 md:mr-3 md:w-6 md:h-6" />
                      Hubungi Saya
                    </LiquidGlassButton>
                  </Link>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link href="/projects">
                    <LiquidGlassButton variant="outline" size="md" animated className="px-5 py-3 md:px-10 md:py-6 text-xs md:text-xl font-bold border border-white text-white hover:bg-white hover:text-black rounded-lg">
                      Lihat Semua Proyek
                    </LiquidGlassButton>
                  </Link>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </SmoothReveal>
    </div>
  );
}