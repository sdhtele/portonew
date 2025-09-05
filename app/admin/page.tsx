"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Project } from "@/lib/projects";
import { getProjects } from "@/lib/projects-service";
import { Badge } from "@/components/ui/badge";
import { 
  FolderOpen, 
  PlusCircle, 
  Users, 
  Eye, 
  Calendar,
  ExternalLink
} from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";
import { LiquidGlassButton } from "@/components/ui/liquid-glass-button";

export default function AdminDashboard() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await getProjects();
        setProjects(data);
      } catch (error) {
        console.error("Failed to fetch projects:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  // Stats for the dashboard
  const stats = [
    {
      title: "Total Projects",
      value: projects.length,
      icon: FolderOpen,
      color: "bg-blue-500",
    },
    {
      title: "Published",
      value: projects.filter(p => p.projectLink).length,
      icon: ExternalLink,
      color: "bg-green-500",
    },
    {
      title: "Recent Projects",
      value: projects.filter(p => {
        const weekAgo = new Date();
        weekAgo.setDate(weekAgo.getDate() - 7);
        return new Date(p.createdAt) > weekAgo;
      }).length,
      icon: Calendar,
      color: "bg-purple-500",
    },
  ];

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Dashboard</h1>
          <p className="text-white/80">
            Welcome to your portfolio admin dashboard
          </p>
        </div>
        <LiquidGlassButton asChild variant="default">
          <Link href="/admin/projects/new">
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Project
          </Link>
        </LiquidGlassButton>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat, index) => (
          <Card key={index} className="bg-black/20 border border-white/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-white">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-white/70" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Projects */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="lg:col-span-4 bg-black/20 border border-white/20">
          <CardHeader>
            <CardTitle className="text-white">Recent Projects</CardTitle>
            <CardDescription className="text-white/80">
              Your latest portfolio projects
            </CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center animate-pulse">
                    <div className="bg-white/10 rounded w-16 h-16" />
                    <div className="ml-4 space-y-2 flex-1">
                      <div className="h-4 bg-white/10 rounded w-3/4"></div>
                      <div className="h-3 bg-white/10 rounded w-1/2"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : projects.length > 0 ? (
              <div className="space-y-4">
                {projects.slice(0, 3).map((project) => (
                  <div key={project.id} className="flex items-center">
                    {project.imageUrl ? (
                      <div className="relative w-16 h-16 rounded-md overflow-hidden">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={project.imageUrl}
                          alt={project.title}
                          className="object-cover w-full h-full filter grayscale hover:grayscale-0 transition-all duration-300"
                        />
                      </div>
                    ) : (
                      <div className="bg-gradient-to-r from-blue-400 to-purple-500 w-16 h-16 rounded-md" />
                    )}
                    <div className="ml-4 space-y-1">
                      <p className="text-sm font-medium leading-none text-white">
                        {project.title}
                      </p>
                      <p className="text-sm text-white/70">
                        Created {format(new Date(project.createdAt), "MMM dd, yyyy")}
                      </p>
                    </div>
                    <div className="ml-auto flex gap-2">
                      <Badge variant="secondary" className="bg-white/10 text-white border border-white/20">
                        {project.projectLink ? "Published" : "Draft"}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <FolderOpen className="mx-auto h-12 w-12 text-white/50" />
                <h3 className="mt-4 font-medium text-white">No projects yet</h3>
                <p className="text-sm text-white/70">
                  Create your first project to get started
                </p>
                <LiquidGlassButton asChild className="mt-4" variant="outline">
                  <Link href="/admin/projects/new">Create Project</Link>
                </LiquidGlassButton>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="lg:col-span-3 bg-black/20 border border-white/20">
          <CardHeader>
            <CardTitle className="text-white">Quick Actions</CardTitle>
            <CardDescription className="text-white/80">
              Common tasks to manage your portfolio
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3">
              <LiquidGlassButton asChild variant="outline" className="justify-start">
                <Link href="/admin/projects">
                  <FolderOpen className="mr-2 h-4 w-4" />
                  View All Projects
                </Link>
              </LiquidGlassButton>
              <LiquidGlassButton asChild variant="outline" className="justify-start">
                <Link href="/admin/projects/new">
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Add New Project
                </Link>
              </LiquidGlassButton>
              <LiquidGlassButton asChild variant="outline" className="justify-start">
                <Link href="/admin/profile">
                  <Users className="mr-2 h-4 w-4" />
                  Update Profile
                </Link>
              </LiquidGlassButton>
              <LiquidGlassButton asChild variant="outline" className="justify-start">
                <Link href="/">
                  <Eye className="mr-2 h-4 w-4" />
                  View Public Site
                </Link>
              </LiquidGlassButton>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}