"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Project } from "@/lib/projects";
import { getProjects } from "@/lib/projects-service";
import { Search, ExternalLink, Filter, Grid, List, Calendar, User, Code, Zap } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Interactive3DCard } from "@/components/3d-components";
import { LiquidGlassButton } from "@/components/ui/liquid-glass-button";
import { LiquidGlassCard } from "@/components/ui/liquid-animations";

// Animated text component with black and white theme
const AnimatedText = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Project card with enhanced animations for black and white theme
const ProjectCard = ({ 
  project, 
  viewMode 
}: { 
  project: Project; 
  viewMode: "grid" | "list";
}) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -5 }}
    >
      {/* 3D Interactive Project Card with black and white theme */}
      <Interactive3DCard 
        className={`overflow-hidden transition-all duration-500 rounded-xl md:rounded-2xl border-0 bg-black/20 backdrop-blur-sm group flex ${viewMode === "list" ? "flex-row" : "flex-col"} border border-white/20`}
      >
        <Card 
          className="bg-transparent border-0 shadow-none"
        >
          <div className={`relative ${viewMode === "list" ? "w-2/5" : "w-full"}`}>
            {project.imageUrl ? (
              <div className={`relative ${viewMode === "list" ? "aspect-video" : "aspect-video"}`}>
                <Image
                  src={project.imageUrl}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110 filter grayscale hover:grayscale-0"
                />
              </div>
            ) : (
              <div className={`bg-white/10 ${viewMode === "list" ? "h-full" : "aspect-video"}`} />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <Badge variant="secondary" className="absolute top-4 right-4 text-xs md:text-sm bg-white/10 backdrop-blur-sm px-2 py-1 md:px-3 md:py-1.5 rounded-full shadow-lg border border-white/20 text-white">
              Unggulan
            </Badge>
            {project.projectLink && (
              <motion.div
                initial={{ scale: 0 }}
                whileHover={{ scale: 1 }}
                className="absolute top-4 right-4"
              >
                <LiquidGlassButton 
                  variant="outline" 
                  size="icon"
                  asChild
                  className="rounded-full w-8 h-8 md:w-10 md:h-10 border-white text-white hover:bg-white hover:text-black"
                >
                  <Link href={project.projectLink} target="_blank">
                    <ExternalLink className="w-3 h-3 md:w-4 md:h-4" />
                  </Link>
                </LiquidGlassButton>
              </motion.div>
            )}
          </div>
          <div className={`flex flex-col ${viewMode === "list" ? "w-3/5" : "w-full"}`}>
            <CardHeader className={viewMode === "list" ? "pb-3" : ""}>
              <CardTitle className="flex items-center justify-between text-base md:text-xl text-white">
                {project.title}
                <div className="flex items-center gap-1 text-xs text-white/70">
                  <Calendar className="w-3 h-3" />
                  {new Date(project.createdAt).toLocaleDateString('id-ID')}
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className={`flex flex-col ${viewMode === "list" ? "flex-grow" : ""}`}>
              <p className="text-white/80 line-clamp-3 mb-4 text-xs md:text-sm">
                {project.description}
              </p>
              {project.technologies && (
                <div className="flex flex-wrap gap-1 md:gap-2 mb-4">
                  {project.technologies.split(',').map((tech, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Badge 
                        variant="secondary" 
                        className="text-xs bg-white/10 backdrop-blur-sm px-2 py-0.5 md:px-2.5 md:py-1 rounded-full hover:bg-white/20 transition-colors border border-white/20 text-white"
                      >
                        {tech.trim()}
                      </Badge>
                    </motion.div>
                  ))}
                </div>
              )}
              <div className="mt-auto">
                <LiquidGlassButton asChild variant="outline" className="w-full rounded-md md:rounded-lg py-2 md:py-3 text-xs md:text-base font-medium border-white text-white hover:bg-white hover:text-black">
                  <Link href={`/projects/${project.id}`}>
                    Lihat Detail
                    <ExternalLink className="ml-1.5 w-3 h-3 md:ml-2 md:w-4 md:h-4" />
                  </Link>
                </LiquidGlassButton>
              </div>
            </CardContent>
          </div>
        </Card>
      </Interactive3DCard>
    </motion.div>
  );
};

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await getProjects();
        setProjects(data);
        setFilteredProjects(data);
      } catch (error) {
        console.error("Gagal mengambil proyek:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const filtered = projects.filter(project => 
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (project.technologies && project.technologies.toLowerCase().includes(searchTerm.toLowerCase()))
      );
      setFilteredProjects(filtered);
    } else {
      setFilteredProjects(projects);
    }
  }, [searchTerm, projects]);

  return (
    <div className="min-h-screen bg-black py-12 md:py-16">
      <div className="container mx-auto px-4">
        {/* Enhanced Header with black and white theme */}
        <AnimatedText className="text-center mb-8 md:mb-12">
          <h1 className="text-2xl md:text-4xl font-extrabold mb-3 md:mb-6 text-white">
            Proyek Saya
          </h1>
          <p className="text-xs md:text-base text-white max-w-4xl mx-auto px-4">
            Jelajahi portofolio aplikasi web saya, menunjukkan keterampilan saya dalam desain dan pengembangan.
          </p>
        </AnimatedText>

        {/* Enhanced Search and Filter Bar with black and white theme */}
        <motion.div 
          className="max-w-4xl mx-auto mb-8 md:mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="relative">
            <Search className="absolute left-3 md:left-4 top-1/2 transform -translate-y-1/2 text-white w-4 h-4 md:w-5 md:h-5" />
            <Input
              placeholder="Cari proyek berdasarkan judul, deskripsi, atau teknologi..."
              className="pl-10 md:pl-12 pr-24 md:pr-32 py-3 md:py-4 rounded-lg md:rounded-full text-xs md:text-base shadow-white border border-white/20 focus:border-white transition-all duration-300 bg-black/20 backdrop-blur-sm text-white placeholder-white/50"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="absolute right-3 md:right-4 top-1/2 transform -translate-y-1/2 flex gap-1.5 md:gap-2">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.9 }}>
                <LiquidGlassButton 
                  variant={viewMode === "grid" ? "default" : "outline"} 
                  size="icon"
                  className="rounded-full w-8 h-8 md:w-10 md:h-10 border-white text-white hover:bg-white hover:text-black"
                  onClick={() => setViewMode("grid")}
                >
                  <Grid className="w-3.5 h-3.5 md:w-4 md:h-4" />
                </LiquidGlassButton>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.9 }}>
                <LiquidGlassButton 
                  variant={viewMode === "list" ? "default" : "outline"} 
                  size="icon"
                  className="rounded-full w-8 h-8 md:w-10 md:h-10 border-white text-white hover:bg-white hover:text-black"
                  onClick={() => setViewMode("list")}
                >
                  <List className="w-3.5 h-3.5 md:w-4 md:h-4" />
                </LiquidGlassButton>
              </motion.div>
            </div>
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div 
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className={`grid ${viewMode === "grid" ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1 gap-4 md:gap-6"} gap-4 md:gap-6`}
            >
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Card key={i} className="animate-pulse overflow-hidden rounded-xl md:rounded-2xl bg-black/20 border border-white/20">
                  <div className="bg-white/10 aspect-video rounded-t-xl md:rounded-t-2xl" />
                  <CardHeader>
                    <div className="h-5 bg-white/10 rounded w-3/4 mb-2"></div>
                    <div className="h-3 bg-white/10 rounded w-full"></div>
                  </CardHeader>
                </Card>
              ))}
            </motion.div>
          ) : filteredProjects.length > 0 ? (
            <motion.div 
              key="projects"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className={`grid ${viewMode === "grid" ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1 gap-4 md:gap-6"} gap-4 md:gap-6`}
            >
              {filteredProjects.map((project) => (
                <ProjectCard key={project.id} project={project} viewMode={viewMode} />
              ))}
            </motion.div>
          ) : (
            <motion.div 
              key="no-results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-12 md:py-24"
            >
              <div className="text-4xl md:text-7xl mb-4 md:mb-8 text-white/20">🔍</div>
              <h3 className="text-xl md:text-3xl font-bold mb-3 md:mb-4 text-white">Tidak ada proyek ditemukan</h3>
              <p className="text-xs md:text-base text-white/80 mb-6 md:mb-8 max-w-2xl mx-auto px-4">
                Coba sesuaikan kata kunci pencarian Anda untuk menemukan apa yang Anda cari.
              </p>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.9 }}>
                <LiquidGlassButton 
                  onClick={() => setSearchTerm("")} 
                  variant="outline" 
                  size="md"
                  className="rounded-md md:rounded-lg px-4 py-2 md:px-8 md:py-4 text-xs md:text-base border-white text-white hover:bg-white hover:text-black"
                >
                  Bersihkan Pencarian
                </LiquidGlassButton>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}