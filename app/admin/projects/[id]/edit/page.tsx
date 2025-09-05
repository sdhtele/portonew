"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { Project, NewProject } from "@/lib/projects";
import { createProject, updateProject, getProjectById } from "@/lib/projects-service";
import { LiquidGlassButton } from "@/components/ui/liquid-glass-button";
import { Save, ArrowLeft } from "lucide-react";

export default function ProjectForm({ params }: { params?: { id: string } }) {
  const router = useRouter();
  const isEditing = !!params?.id;
  const projectId = params?.id ? parseInt(params.id) : null;
  
  const [formData, setFormData] = useState<Partial<NewProject>>({
    title: "",
    description: "",
    imageUrl: "",
    projectLink: "",
    technologies: "",
  });
  
  const [loading, setLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isEditing && projectId) {
      const fetchProject = async () => {
        setLoading(true);
        try {
          const project = await getProjectById(projectId);
          setFormData({
            title: project.title,
            description: project.description,
            imageUrl: project.imageUrl || "",
            projectLink: project.projectLink || "",
            technologies: project.technologies || "",
          });
        } catch (error) {
          console.error("Failed to fetch project:", error);
          toast.error("Failed to load project");
          router.push("/admin/projects");
        } finally {
          setLoading(false);
        }
      };
      
      fetchProject();
    }
  }, [isEditing, projectId, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      if (isEditing && projectId) {
        await updateProject(projectId, formData);
        toast.success("Project updated successfully!");
      } else {
        await createProject(formData as NewProject);
        toast.success("Project created successfully!");
      }
      
      router.push("/admin/projects");
    } catch (error) {
      console.error("Failed to save project:", error);
      toast.error(`Failed to ${isEditing ? "update" : "create"} project`);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">{isEditing ? "Edit Project" : "Add Project"}</h1>
            <p className="text-white/80">
              {isEditing ? "Update your project details" : "Create a new portfolio project"}
            </p>
          </div>
        </div>
        
        <Card className="animate-pulse bg-black/20 border border-white/20 rounded-2xl">
          <CardHeader>
            <div className="h-6 bg-white/10 rounded w-1/3"></div>
            <div className="h-4 bg-white/10 rounded w-2/3"></div>
          </CardHeader>
          <CardContent className="space-y-6">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="space-y-2">
                <div className="h-4 bg-white/10 rounded w-1/4"></div>
                <div className="h-10 bg-white/10 rounded"></div>
              </div>
            ))}
            <div className="flex justify-end gap-3 pt-4">
              <div className="h-10 bg-white/10 rounded w-24"></div>
              <div className="h-10 bg-white/10 rounded w-24"></div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">{isEditing ? "Edit Project" : "Add Project"}</h1>
          <p className="text-white/80">
            {isEditing ? "Update your project details" : "Create a new portfolio project"}
          </p>
        </div>
      </div>
      
      <form onSubmit={handleSubmit}>
        <Card className="bg-black/20 border border-white/20 rounded-2xl">
          <CardHeader>
            <CardTitle className="text-white">Project Details</CardTitle>
            <CardDescription className="text-white/80">
              Provide information about your project
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title" className="text-white">Project Title</Label>
              <Input
                id="title"
                name="title"
                value={formData.title || ""}
                onChange={handleChange}
                required
                placeholder="My Awesome Project"
                className="bg-black/20 border-white/20 text-white placeholder-white/50"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description" className="text-white">Description</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description || ""}
                onChange={handleChange}
                required
                placeholder="Describe your project in detail..."
                rows={5}
                className="bg-black/20 border-white/20 text-white placeholder-white/50"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="imageUrl" className="text-white">Image URL</Label>
                <Input
                  id="imageUrl"
                  name="imageUrl"
                  value={formData.imageUrl || ""}
                  onChange={handleChange}
                  placeholder="https://example.com/project-image.jpg"
                  className="bg-black/20 border-white/20 text-white placeholder-white/50"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="projectLink" className="text-white">Project Link</Label>
                <Input
                  id="projectLink"
                  name="projectLink"
                  value={formData.projectLink || ""}
                  onChange={handleChange}
                  placeholder="https://myproject.example.com"
                  className="bg-black/20 border-white/20 text-white placeholder-white/50"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="technologies" className="text-white">Technologies</Label>
              <Input
                id="technologies"
                name="technologies"
                value={formData.technologies || ""}
                onChange={handleChange}
                placeholder="React, TypeScript, Node.js, PostgreSQL"
                className="bg-black/20 border-white/20 text-white placeholder-white/50"
              />
              <p className="text-sm text-white/70">
                Separate technologies with commas
              </p>
            </div>
            
            <div className="flex justify-end gap-3 pt-4">
              <LiquidGlassButton
                type="button"
                variant="outline"
                onClick={() => router.push("/admin/projects")}
                disabled={isSubmitting}
                className="border-white text-white hover:bg-white hover:text-black rounded-lg py-3"
              >
                <ArrowLeft className="mr-2 w-4 h-4" />
                Cancel
              </LiquidGlassButton>
              <LiquidGlassButton type="submit" disabled={isSubmitting} variant="default" className="rounded-lg py-3">
                {isSubmitting ? (
                  <>
                    <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></span>
                    {isEditing ? "Updating..." : "Creating..."}
                  </>
                ) : (
                  <>
                    <Save className="mr-2 w-4 h-4" />
                    {isEditing ? "Update Project" : "Create Project"}
                  </>
                )}
              </LiquidGlassButton>
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  );
}