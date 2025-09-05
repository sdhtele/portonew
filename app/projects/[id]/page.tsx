"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Project } from "@/lib/projects";
import { getProjectById } from "@/lib/projects-service";
import { ExternalLink, ArrowLeft, Calendar, Code, Zap, Globe, Smartphone, Monitor } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { LiquidGlassButton } from "@/components/ui/liquid-glass-button";
import { LiquidGlassCard } from "@/components/ui/liquid-animations";
import { motion } from "framer-motion";

export default function ProjectDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const projectId = parseInt(params.id);
        if (isNaN(projectId)) {
          throw new Error("Invalid project ID");
        }
        
        const data = await getProjectById(projectId);
        setProject(data);
      } catch (err) {
        console.error("Failed to fetch project:", err);
        setError("Project not found");
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchProject();
    }
  }, [params.id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black py-10 md:py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="animate-pulse">
              <div className="h-5 bg-white/10 rounded w-1/4 mb-6"></div>
              <div className="bg-white/10 aspect-video rounded-lg mb-6"></div>
              <div className="h-7 bg-white/10 rounded w-3/4 mb-3"></div>
              <div className="h-3 bg-white/10 rounded w-full mb-1"></div>
              <div className="h-3 bg-white/10 rounded w-full mb-1"></div>
              <div className="h-3 bg-white/10 rounded w-2/3 mb-6"></div>
              <div className="grid grid-cols-2 gap-3 mb-6">
                <div className="h-8 bg-white/10 rounded"></div>
                <div className="h-8 bg-white/10 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="min-h-screen bg-black py-10 md:py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center py-12 md:py-16">
            <div className="text-4xl md:text-5xl mb-4 text-white/20">😢</div>
            <h1 className="text-2xl md:text-3xl font-bold mb-3 md:mb-4 text-white">Project Not Found</h1>
            <p className="text-white/80 text-xs md:text-base mb-6 md:mb-8">
              The project you're looking for doesn't exist or may have been removed.
            </p>
            <LiquidGlassButton asChild variant="outline" className="rounded-md md:rounded-lg px-4 py-2 md:px-6 md:py-3 text-xs md:text-base border-white text-white hover:bg-white hover:text-black">
              <Link href="/projects">Back to Projects</Link>
            </LiquidGlassButton>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black py-10 md:py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <LiquidGlassButton 
            variant="ghost" 
            onClick={() => router.back()} 
            className="mb-4 md:mb-6 text-white hover:text-black text-xs md:text-sm rounded-md md:rounded-lg px-3 py-1.5 md:px-4 md:py-2"
          >
            <ArrowLeft className="mr-1.5 w-3.5 h-3.5 md:mr-2 md:w-4 md:h-4" />
            Back
          </LiquidGlassButton>

          {project.imageUrl && (
            <div className="relative aspect-video rounded-lg overflow-hidden mb-6 md:mb-8 shadow-white">
              <Image
                src={project.imageUrl}
                alt={project.title}
                fill
                className="object-cover filter grayscale hover:grayscale-0 transition-all duration-500"
              />
            </div>
          )}

          <div className="flex flex-wrap items-center justify-between gap-3 md:gap-4 mb-4 md:mb-6">
            <h1 className="text-xl md:text-2xl font-bold text-white">{project.title}</h1>
            <div className="flex gap-1.5 md:gap-2">
              {project.projectLink && (
                <LiquidGlassButton asChild variant="outline" className="rounded-md md:rounded-lg px-2 py-1.5 md:px-4 md:py-2 text-xs md:text-sm border-white text-white hover:bg-white hover:text-black">
                  <Link href={project.projectLink} target="_blank">
                    <ExternalLink className="mr-1.5 w-3 h-3 md:mr-2 md:w-4 md:h-4" />
                    Live Demo
                  </Link>
                </LiquidGlassButton>
              )}
            </div>
          </div>

          <div className="prose prose-sm dark:prose-invert max-w-none mb-6 md:mb-8">
            <p className="text-sm md:text-base text-white/80">
              {project.description}
            </p>
          </div>

          {project.technologies && (
            <LiquidGlassCard className="mb-6 md:mb-8 bg-black/20 border border-white/20 rounded-xl md:rounded-2xl">
              <CardHeader>
                <CardTitle className="flex items-center text-white text-base md:text-lg">
                  <Code className="mr-2 w-4 h-4 md:mr-2.5 md:w-5 md:h-5" />
                  Technologies Used
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.split(',').map((tech, index) => (
                    <Badge key={index} variant="secondary" className="text-xs md:text-sm py-1 px-2 md:py-1.5 md:px-3 bg-white/10 border border-white/20 text-white rounded-full">
                      {tech.trim()}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </LiquidGlassCard>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-8">
            <LiquidGlassCard className="bg-black/20 border border-white/20 rounded-xl">
              <CardContent className="p-4 md:p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-white/10 rounded-lg">
                    <Globe className="w-5 h-5 md:w-6 md:h-6 text-white" />
                  </div>
                  <h3 className="font-bold text-white text-sm md:text-base">Web App</h3>
                </div>
                <p className="text-white/80 text-xs md:text-sm">
                  Fully responsive web application optimized for all devices
                </p>
              </CardContent>
            </LiquidGlassCard>

            <LiquidGlassCard className="bg-black/20 border border-white/20 rounded-xl">
              <CardContent className="p-4 md:p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-white/10 rounded-lg">
                    <Smartphone className="w-5 h-5 md:w-6 md:h-6 text-white" />
                  </div>
                  <h3 className="font-bold text-white text-sm md:text-base">Mobile First</h3>
                </div>
                <p className="text-white/80 text-xs md:text-sm">
                  Designed with mobile-first approach for optimal UX
                </p>
              </CardContent>
            </LiquidGlassCard>

            <LiquidGlassCard className="bg-black/20 border border-white/20 rounded-xl">
              <CardContent className="p-4 md:p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-white/10 rounded-lg">
                    <Zap className="w-5 h-5 md:w-6 md:h-6 text-white" />
                  </div>
                  <h3 className="font-bold text-white text-sm md:text-base">High Performance</h3>
                </div>
                <p className="text-white/80 text-xs md:text-sm">
                  Optimized for speed and efficiency with modern techniques
                </p>
              </CardContent>
            </LiquidGlassCard>
          </div>

          <div className="flex items-center text-xs md:text-sm text-white/70 mb-8 md:mb-12">
            <Calendar className="mr-2 w-3.5 h-3.5 md:mr-2.5 md:w-4 md:h-4" />
            <span>
              Created on {new Date(project.createdAt).toLocaleDateString('id-ID', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </span>
          </div>

          <div className="flex justify-center">
            <LiquidGlassButton 
              variant="outline" 
              onClick={() => router.back()}
              className="rounded-md md:rounded-lg px-6 py-2 md:px-8 md:py-3 text-xs md:text-base border-white text-white hover:bg-white hover:text-black"
            >
              Back to Projects
            </LiquidGlassButton>
          </div>
        </div>
      </div>
    </div>
  );
}