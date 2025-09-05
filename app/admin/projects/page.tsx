"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { 
  PlusCircle, 
  Search, 
  Edit, 
  Trash2, 
  ExternalLink,
  Calendar,
  FolderOpen
} from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";
import { Project } from "@/lib/projects";
import { getProjects, deleteProject } from "@/lib/projects-service";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { LiquidGlassButton } from "@/components/ui/liquid-glass-button";

export default function AdminProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState<Project | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await getProjects();
        setProjects(data);
        setFilteredProjects(data);
      } catch (error) {
        console.error("Failed to fetch projects:", error);
        toast.error("Failed to load projects");
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
        project.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredProjects(filtered);
    } else {
      setFilteredProjects(projects);
    }
  }, [searchTerm, projects]);

  const handleDeleteClick = (project: Project) => {
    setProjectToDelete(project);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (!projectToDelete) return;
    
    try {
      await deleteProject(projectToDelete.id);
      setProjects(projects.filter(p => p.id !== projectToDelete.id));
      setFilteredProjects(filteredProjects.filter(p => p.id !== projectToDelete.id));
      toast.success("Project deleted successfully");
    } catch (error) {
      console.error("Failed to delete project:", error);
      toast.error("Failed to delete project");
    } finally {
      setDeleteDialogOpen(false);
      setProjectToDelete(null);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Projects</h1>
          <p className="text-white/80">
            Manage your portfolio projects
          </p>
        </div>
        <LiquidGlassButton asChild variant="default">
          <Link href="/admin/projects/new">
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Project
          </Link>
        </LiquidGlassButton>
      </div>

      <Card className="bg-black/20 border border-white/20 rounded-2xl">
        <CardHeader>
          <CardTitle className="text-white">All Projects</CardTitle>
          <CardDescription className="text-white/80">
            View and manage all your portfolio projects
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-white/70" />
              <Input
                placeholder="Search projects..."
                className="pl-8 bg-black/20 border-white/20 text-white placeholder-white/50"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center animate-pulse h-16">
                  <div className="bg-white/10 rounded w-12 h-12" />
                  <div className="ml-4 space-y-2 flex-1">
                    <div className="h-4 bg-white/10 rounded w-1/4"></div>
                    <div className="h-3 bg-white/10 rounded w-1/2"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : filteredProjects.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow className="border-white/20 hover:bg-white/5">
                  <TableHead className="text-white">Project</TableHead>
                  <TableHead className="text-white">Status</TableHead>
                  <TableHead className="text-white">Created</TableHead>
                  <TableHead className="text-right text-white">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProjects.map((project) => (
                  <TableRow key={project.id} className="border-white/20 hover:bg-white/5">
                    <TableCell>
                      <div className="font-medium text-white">{project.title}</div>
                      <div className="text-sm text-white/70 line-clamp-1">
                        {project.description}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={project.projectLink ? "default" : "secondary"} className="bg-white/10 text-white border border-white/20">
                        {project.projectLink ? "Published" : "Draft"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center text-white/70">
                        <Calendar className="mr-2 h-4 w-4" />
                        {format(new Date(project.createdAt), "MMM dd, yyyy")}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        {project.projectLink && (
                          <LiquidGlassButton variant="ghost" size="icon" asChild className="text-white hover:bg-white hover:text-black">
                            <Link href={project.projectLink} target="_blank">
                              <ExternalLink className="h-4 w-4" />
                            </Link>
                          </LiquidGlassButton>
                        )}
                        <LiquidGlassButton variant="ghost" size="icon" asChild className="text-white hover:bg-white hover:text-black">
                          <Link href={`/admin/projects/${project.id}/edit`}>
                            <Edit className="h-4 w-4" />
                          </Link>
                        </LiquidGlassButton>
                        <LiquidGlassButton 
                          variant="ghost" 
                          size="icon"
                          onClick={() => handleDeleteClick(project)}
                          className="text-red-400 hover:bg-red-400 hover:text-black"
                        >
                          <Trash2 className="h-4 w-4" />
                        </LiquidGlassButton>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="text-center py-12">
              <FolderOpen className="mx-auto h-12 w-12 text-white/50" />
              <h3 className="mt-4 font-medium text-white">No projects found</h3>
              <p className="text-sm text-white/70 mb-4">
                {searchTerm ? "Try adjusting your search terms" : "Create your first project to get started"}
              </p>
              <LiquidGlassButton asChild variant="default">
                <Link href="/admin/projects/new">
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Add Project
                </Link>
              </LiquidGlassButton>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent className="bg-black border border-white/20">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white">Are you sure?</AlertDialogTitle>
            <AlertDialogDescription className="text-white/80">
              This action cannot be undone. This will permanently delete the project{" "}
              <span className="font-semibold">
                {projectToDelete?.title}
              </span>{" "}
              and remove all associated data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-black/20 border-white/20 text-white hover:bg-white hover:text-black">Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={confirmDelete}
              className="bg-red-500 hover:bg-red-600"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}