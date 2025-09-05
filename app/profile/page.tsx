"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Project } from "@/lib/projects";
import { getProjects } from "@/lib/projects-service";
import { ExternalLink, Mail, MapPin, Calendar, User, Code, Award, BookOpen } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { LiquidGlassButton } from "@/components/ui/liquid-glass-button";
import { LiquidGlassCard } from "@/components/ui/liquid-animations";

// Mock data for profile
const profileData = {
  name: "Ng Nawi Awwaluddin",
  title: "Senior Full Stack Developer",
  bio: "I'm a passionate full-stack developer with over 8 years of experience building scalable web applications. I specialize in React, Node.js, and cloud technologies. I love creating elegant solutions to complex problems and mentoring junior developers.",
  email: "ngnawfal@example.com",
  location: "San Francisco, CA",
  website: "https://ngnawfal.dev",
  skills: [
    "JavaScript", "TypeScript", "React", "Next.js", "Node.js", "Python", 
    "PostgreSQL", "MongoDB", "AWS", "Docker", "Kubernetes", "GraphQL"
  ],
  education: [
    {
      degree: "Master of Computer Science",
      school: "Stanford University",
      year: "2015-2017"
    },
    {
      degree: "Bachelor of Science in Computer Engineering",
      school: "UC Berkeley",
      year: "2011-2015"
    }
  ],
  experience: [
    {
      role: "Senior Software Engineer",
      company: "TechCorp Inc.",
      period: "2020-Present",
      description: "Lead development of microservices architecture serving 1M+ users"
    },
    {
      role: "Software Engineer",
      company: "StartupXYZ",
      period: "2017-2020",
      description: "Developed and maintained multiple web applications using React and Node.js"
    }
  ]
};

// Animated counter component
const AnimatedCounter = ({ value, duration = 2000 }: { value: number; duration?: number }) => {
  const [count, setCount] = useState(0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-4xl font-bold text-white"
    >
      {value}+
    </motion.div>
  );
};

export default function ProfilePage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  return (
    <div className="min-h-screen bg-black py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Profile Header */}
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="relative inline-block mb-8"
            >
              <div className="bg-gradient-to-r from-blue-400 to-purple-500 w-32 h-32 md:w-48 md:h-48 rounded-full mx-auto flex items-center justify-center border-4 border-white shadow-2xl">
                <span className="text-5xl md:text-7xl font-bold text-white">N</span>
              </div>
              <motion.div 
                className="absolute -bottom-2 -right-2 w-10 h-10 md:w-14 md:h-14 rounded-full bg-white border-4 border-black flex items-center justify-center shadow-lg"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
              >
                <Award className="w-5 h-5 md:w-7 md:h-7 text-black" />
              </motion.div>
            </motion.div>

            <motion.h1 
              className="text-4xl md:text-6xl font-extrabold mb-4 text-white"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {profileData.name}
            </motion.h1>

            <motion.h2 
              className="text-xl md:text-3xl font-medium text-white/80 mb-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              {profileData.title}
            </motion.h2>

            <motion.p 
              className="text-base md:text-xl text-white/90 max-w-3xl mx-auto mb-12 px-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              {profileData.bio}
            </motion.p>

            {/* Stats */}
            <motion.div 
              className="grid grid-cols-3 gap-8 mb-16 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <div className="text-center">
                <AnimatedCounter value={50} />
                <p className="text-white/70 mt-2">Projects</p>
              </div>
              <div className="text-center">
                <AnimatedCounter value={8} />
                <p className="text-white/70 mt-2">Years Exp</p>
              </div>
              <div className="text-center">
                <AnimatedCounter value={25} />
                <p className="text-white/70 mt-2">Clients</p>
              </div>
            </motion.div>

            {/* Contact Buttons */}
            <motion.div 
              className="flex flex-wrap justify-center gap-4 mb-16"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1 }}
            >
              <LiquidGlassButton asChild variant="outline" className="rounded-lg md:rounded-full px-6 py-3 md:px-8 md:py-4 text-base md:text-lg border-white text-white hover:bg-white hover:text-black">
                <Link href={`mailto:${profileData.email}`}>
                  <Mail className="mr-2 w-5 h-5 md:w-6 md:h-6" />
                  Email Me
                </Link>
              </LiquidGlassButton>
              <LiquidGlassButton asChild variant="default" className="rounded-lg md:rounded-full px-6 py-3 md:px-8 md:py-4 text-base md:text-lg">
                <Link href={profileData.website} target="_blank">
                  <ExternalLink className="mr-2 w-5 h-5 md:w-6 md:h-6" />
                  Visit Website
                </Link>
              </LiquidGlassButton>
            </motion.div>
          </div>

          {/* Profile Details */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            {/* Contact Info */}
            <LiquidGlassCard className="lg:col-span-1 bg-black/20 border border-white/20 rounded-2xl">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <User className="mr-2 w-5 h-5" />
                  Contact Info
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center">
                  <Mail className="mr-3 w-5 h-5 text-white/70" />
                  <span className="text-white">{profileData.email}</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="mr-3 w-5 h-5 text-white/70" />
                  <span className="text-white">{profileData.location}</span>
                </div>
                <div className="flex items-center">
                  <ExternalLink className="mr-3 w-5 h-5 text-white/70" />
                  <Link href={profileData.website} target="_blank" className="text-blue-400 hover:underline">
                    {profileData.website}
                  </Link>
                </div>
              </CardContent>
            </LiquidGlassCard>

            {/* Skills */}
            <LiquidGlassCard className="lg:col-span-2 bg-black/20 border border-white/20 rounded-2xl">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Code className="mr-2 w-5 h-5" />
                  Technical Skills
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-3">
                  {profileData.skills.map((skill, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      whileHover={{ y: -5 }}
                    >
                      <Badge 
                        variant="secondary" 
                        className="text-sm md:text-base py-2 px-4 bg-white/10 border border-white/20 text-white hover:bg-white/20 transition-colors"
                      >
                        {skill}
                      </Badge>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </LiquidGlassCard>
          </div>

          {/* Education and Experience */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            {/* Education */}
            <LiquidGlassCard className="bg-black/20 border border-white/20 rounded-2xl">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <BookOpen className="mr-2 w-5 h-5" />
                  Education
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {profileData.education.map((edu, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="border-l-2 border-white/20 pl-4 py-1"
                  >
                    <h3 className="font-bold text-lg text-white">{edu.degree}</h3>
                    <p className="text-white/80">{edu.school}</p>
                    <p className="text-white/70 text-sm">{edu.year}</p>
                  </motion.div>
                ))}
              </CardContent>
            </LiquidGlassCard>

            {/* Experience */}
            <LiquidGlassCard className="bg-black/20 border border-white/20 rounded-2xl">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Award className="mr-2 w-5 h-5" />
                  Experience
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {profileData.experience.map((exp, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="border-l-2 border-white/20 pl-4 py-1"
                  >
                    <h3 className="font-bold text-lg text-white">{exp.role}</h3>
                    <p className="text-white/80">{exp.company}</p>
                    <p className="text-white/70 text-sm">{exp.period}</p>
                    <p className="text-white/90 mt-2">{exp.description}</p>
                  </motion.div>
                ))}
              </CardContent>
            </LiquidGlassCard>
          </div>
        </div>
      </div>
    </div>
  );
}