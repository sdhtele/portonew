"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useSession } from "@/lib/auth-client";
import { toast } from "sonner";
import { LiquidGlassButton } from "@/components/ui/liquid-glass-button";
import { Camera, Save, User } from "lucide-react";

export default function ProfilePage() {
  const { data: session } = useSession();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: session?.user.name || "",
    email: session?.user.email || "",
    bio: "",
    website: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate saving profile
    toast.success("Profile updated successfully!");
    setIsEditing(false);
  };

  if (!session) {
    return null;
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold text-white">Profile</h1>
        <p className="text-white/80">
          Manage your public profile information
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="bg-black/20 border border-white/20 rounded-2xl">
          <CardHeader>
            <CardTitle className="text-white">Public Profile</CardTitle>
            <CardDescription className="text-white/80">
              Information that will be displayed on your public profile
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="flex items-center gap-6">
                <div className="relative">
                  <div className="bg-gradient-to-r from-blue-400 to-purple-500 w-24 h-24 rounded-full flex items-center justify-center">
                    <User className="w-12 h-12 text-white" />
                  </div>
                  <Button
                    type="button"
                    size="icon"
                    className="absolute bottom-0 right-0 rounded-full w-8 h-8 border-2 border-black bg-white text-black hover:bg-black hover:text-white"
                  >
                    <Camera className="w-4 h-4" />
                  </Button>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-white">Profile Picture</h3>
                  <p className="text-sm text-white/70">JPG, GIF or PNG. Max size of 2MB</p>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="name" className="text-white">Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="bg-black/20 border-white/20 text-white placeholder-white/50"
                  disabled={!isEditing}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-white">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="bg-black/20 border-white/20 text-white placeholder-white/50"
                  disabled={!isEditing}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio" className="text-white">Bio</Label>
                <Textarea
                  id="bio"
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  placeholder="Tell us about yourself"
                  className="bg-black/20 border-white/20 text-white placeholder-white/50"
                  disabled={!isEditing}
                  rows={4}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="website" className="text-white">Website</Label>
                <Input
                  id="website"
                  name="website"
                  value={formData.website}
                  onChange={handleChange}
                  placeholder="https://yourwebsite.com"
                  className="bg-black/20 border-white/20 text-white placeholder-white/50"
                  disabled={!isEditing}
                />
              </div>

              <div className="flex gap-3">
                {isEditing ? (
                  <>
                    <LiquidGlassButton type="submit" variant="default" className="rounded-lg py-3">
                      <Save className="mr-2 w-4 h-4" />
                      Save Changes
                    </LiquidGlassButton>
                    <LiquidGlassButton
                      type="button"
                      variant="outline"
                      className="rounded-lg py-3 border-white text-white hover:bg-white hover:text-black"
                      onClick={() => setIsEditing(false)}
                    >
                      Cancel
                    </LiquidGlassButton>
                  </>
                ) : (
                  <LiquidGlassButton
                    type="button"
                    variant="default"
                    className="rounded-lg py-3"
                    onClick={() => setIsEditing(true)}
                  >
                    Edit Profile
                  </LiquidGlassButton>
                )}
              </div>
            </form>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card className="bg-black/20 border border-white/20 rounded-2xl">
            <CardHeader>
              <CardTitle className="text-white">Profile Preview</CardTitle>
              <CardDescription className="text-white/80">
                This is how your profile will appear to visitors
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4 mb-6">
                <div className="bg-gradient-to-r from-blue-400 to-purple-500 w-16 h-16 rounded-full flex items-center justify-center">
                  <User className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">{formData.name || "Your Name"}</h3>
                  <p className="text-white/70">{formData.email}</p>
                </div>
              </div>
              <div className="space-y-4">
                {formData.bio && (
                  <div>
                    <h4 className="font-semibold text-white mb-2">Bio</h4>
                    <p className="text-white/80">{formData.bio}</p>
                  </div>
                )}
                {formData.website && (
                  <div>
                    <h4 className="font-semibold text-white mb-2">Website</h4>
                    <a href={formData.website} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
                      {formData.website}
                    </a>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-black/20 border border-white/20 rounded-2xl">
            <CardHeader>
              <CardTitle className="text-white">Account Statistics</CardTitle>
              <CardDescription className="text-white/80">
                Your portfolio activity
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/5 p-4 rounded-lg">
                  <p className="text-2xl font-bold text-white">12</p>
                  <p className="text-white/70">Projects</p>
                </div>
                <div className="bg-white/5 p-4 rounded-lg">
                  <p className="text-2xl font-bold text-white">8</p>
                  <p className="text-white/70">Published</p>
                </div>
                <div className="bg-white/5 p-4 rounded-lg">
                  <p className="text-2xl font-bold text-white">3</p>
                  <p className="text-white/70">Drafts</p>
                </div>
                <div className="bg-white/5 p-4 rounded-lg">
                  <p className="text-2xl font-bold text-white">245</p>
                  <p className="text-white/70">Views</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}