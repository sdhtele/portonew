"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSession, signIn, signUp } from "@/lib/auth-client";
import { toast } from "sonner";
import { LiquidGlassButton } from "@/components/ui/liquid-glass-button";

export default function LoginPage() {
  const router = useRouter();
  const { data: session } = useSession();
  const [isSignUp, setIsSignUp] = useState(false);
  const [credentials, setCredentials] = useState({
    email: "",
    password: ""
  });
  const [isLoading, setIsLoading] = useState(false);

  // If already logged in, redirect to dashboard
  useEffect(() => {
    if (session) {
      router.push("/admin");
    }
  }, [session, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      if (isSignUp) {
        // For demo purposes, we'll allow sign up
        // In a real app, you might want to restrict this
        const response = await signUp.email({
          email: credentials.email,
          password: credentials.password,
          name: "Admin User"
        });
        
        if (response.error) {
          toast.error(response.error.message);
        } else {
          toast.success("Account created successfully! Please sign in.");
          setIsSignUp(false);
        }
      } else {
        const response = await signIn.email({
          email: credentials.email,
          password: credentials.password,
        });
        
        if (response.error) {
          toast.error(response.error.message);
        } else {
          toast.success("Logged in successfully!");
          router.push("/admin");
        }
      }
    } catch (error) {
      toast.error("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (session) {
    return null;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black p-4">
      <div className="w-full max-w-md">
        <Card className="bg-black/20 backdrop-blur-lg border border-white/20 rounded-2xl">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-white">Admin {isSignUp ? "Sign Up" : "Login"}</CardTitle>
            <CardDescription className="text-white/80">
              {isSignUp 
                ? "Create an account to access the dashboard" 
                : "Enter your credentials to access the dashboard"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-white">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={credentials.email}
                  onChange={handleChange}
                  required
                  placeholder="admin@example.com"
                  className="bg-black/20 border-white/20 text-white placeholder-white/50"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-white">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={credentials.password}
                  onChange={handleChange}
                  required
                  placeholder="••••••••"
                  className="bg-black/20 border-white/20 text-white placeholder-white/50"
                />
              </div>

              <LiquidGlassButton 
                type="submit" 
                className="w-full rounded-lg md:rounded-full py-3"
                disabled={isLoading}
                variant="default"
              >
                {isLoading ? (
                  <>
                    <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></span>
                    {isSignUp ? "Creating Account..." : "Signing In..."}
                  </>
                ) : (
                  isSignUp ? "Sign Up" : "Sign In"
                )}
              </LiquidGlassButton>
            </form>
            
            <div className="mt-6 text-center text-sm">
              <LiquidGlassButton 
                variant="ghost" 
                onClick={() => setIsSignUp(!isSignUp)}
                className="p-0 h-auto text-white hover:text-black"
              >
                {isSignUp 
                  ? "Already have an account? Sign In" 
                  : "Don't have an account? Sign Up"}
              </LiquidGlassButton>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}