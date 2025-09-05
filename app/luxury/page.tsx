"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, Linkedin, Mail, Phone, MapPin, ExternalLink, ChevronLeft, ChevronRight, Twitter, Dribbble } from "lucide-react";
import "./liquid-glass.css";

// Mock data for projects
const projects = [
  {
    id: 1,
    title: "Neural Interface",
    description: "AI-powered dashboard with real-time data visualization and predictive analytics.",
    tags: ["React", "TensorFlow", "WebGL", "Node.js"]
  },
  {
    id: 2,
    title: "Quantum Commerce",
    description: "Next-generation e-commerce platform with immersive 3D product experiences.",
    tags: ["Next.js", "Three.js", "WebRTC", "MongoDB"]
  },
  {
    id: 3,
    title: "BioSphere",
    description: "Environmental monitoring system with IoT integration and data insights.",
    tags: ["Vue.js", "Firebase", "D3.js", "Python"]
  },
  {
    id: 4,
    title: "Nexus",
    description: "Collaborative workspace with real-time editing and communication tools.",
    tags: ["React", "Socket.io", "PostgreSQL", "Redis"]
  },
  {
    id: 5,
    title: "Aether",
    description: "Augmented reality application for architectural visualization.",
    tags: ["AR.js", "WebXR", "Blender", "WebGL"]
  },
  {
    id: 6,
    title: "Synthesis",
    description: "Creative platform for generative art and algorithmic design.",
    tags: ["p5.js", "WebGL", "Web Audio", "Machine Learning"]
  }
];

// Mock testimonials
const testimonials = [
  {
    id: 1,
    name: "Alex Morgan",
    role: "CTO, TechNova",
    content: "The innovative approach and technical excellence delivered exceeded our expectations. The fluid design and seamless interactions are truly remarkable.",
    avatar: "/images/avatar1.jpg"
  },
  {
    id: 2,
    name: "Jordan Smith",
    role: "Product Lead, InnovateX",
    content: "Working with this developer transformed our digital product. The attention to detail and creative problem-solving approach is unparalleled.",
    avatar: "/images/avatar2.jpg"
  },
  {
    id: 3,
    name: "Taylor Reed",
    role: "Design Director, CreativeLabs",
    content: "The blend of technical expertise and aesthetic vision resulted in a product that stands out in the market. Truly exceptional work.",
    avatar: "/images/avatar3.jpg"
  }
];

// Skills data
const skills = [
  { name: "UI/UX Design", level: 95 },
  { name: "Frontend Development", level: 98 },
  { name: "3D Visualization", level: 90 },
  { name: "Backend Systems", level: 92 },
  { name: "Mobile Apps", level: 88 },
  { name: "AI Integration", level: 85 }
];

export default function LiquidGlassPortfolio() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeFilter, setActiveFilter] = useState("All");
  const [filteredProjects, setFilteredProjects] = useState(projects);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Filter projects based on category
  useEffect(() => {
    if (activeFilter === "All") {
      setFilteredProjects(projects);
    } else {
      // In a real app, this would filter by category
      setFilteredProjects(projects);
    }
  }, [activeFilter]);

  // Track mouse position for interactive effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setEmail("");
      setMessage("");
      alert("Thank you for your message. I'll respond within 24 hours.");
    }, 1500);
  };

  return (
    <div className="liquid-bg min-h-screen text-white overflow-hidden relative">
      {/* Interactive background blobs */}
      <div 
        className="liquid-blob liquid-blob-1"
        style={{
          transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`
        }}
      ></div>
      <div 
        className="liquid-blob liquid-blob-2"
        style={{
          transform: `translate(${mousePosition.x * -0.01}px, ${mousePosition.y * -0.01}px)`
        }}
      ></div>
      <div 
        className="liquid-blob liquid-blob-3"
        style={{
          transform: `translate(${mousePosition.x * 0.015}px, ${mousePosition.y * 0.015}px)`
        }}
      ></div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
        <div className="container mx-auto px-6 py-20 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Text content */}
            <motion.div 
              className="max-w-2xl"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <motion.h1 
                className="liquid-heading text-5xl md:text-7xl mb-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.8 }}
              >
                <span className="bg-gradient-to-r from-liquid-primary to-liquid-secondary bg-clip-text text-transparent">
                  Fluid Digital
                </span>
                <br />
                <span className="text-white">Experiences</span>
              </motion.h1>
              
              <motion.p 
                className="liquid-body text-xl md:text-2xl text-liquid-text-secondary mb-10 leading-relaxed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.8 }}
              >
                Senior Full Stack Developer & UI/UX Designer creating seamless digital experiences with modern aesthetics.
              </motion.p>
              
              <motion.div 
                className="flex flex-wrap gap-6 mb-16"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="liquid-button"
                >
                  View Work
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="liquid-button-outline"
                >
                  Connect
                </motion.button>
              </motion.div>
              
              {/* Social links */}
              <motion.div
                className="flex space-x-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.8 }}
              >
                {[Github, Linkedin, Twitter, Dribbble, Mail].map((Icon, index) => (
                  <motion.a
                    key={index}
                    href="#"
                    whileHover={{ y: -5, color: "#6366f1" }}
                    whileTap={{ scale: 0.9 }}
                    className="text-liquid-text-secondary hover:text-liquid-primary transition-colors duration-300"
                  >
                    <Icon className="w-6 h-6" />
                  </motion.a>
                ))}
              </motion.div>
            </motion.div>
            
            {/* Profile section with liquid glass effect */}
            <motion.div 
              className="relative"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              <div className="relative w-80 h-80 md:w-96 md:h-96 mx-auto liquid-glass-card">
                <div className="absolute inset-0 bg-gradient-to-br from-liquid-primary/10 to-liquid-secondary/5"></div>
                <div className="absolute inset-0 flex items-center justify-center p-8">
                  <div className="bg-liquid-bg-light border-2 border-dashed border-liquid-primary/30 rounded-2xl w-full h-full flex items-center justify-center">
                    <span className="text-6xl liquid-heading text-liquid-primary">A</span>
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-liquid-bg/80 to-transparent"></div>
                
                {/* Liquid wave effect */}
                <div className="absolute bottom-0 left-0 right-0 h-8 overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-full bg-liquid-wave-1 animate-liquid-wave"></div>
                  <div className="absolute top-2 left-0 w-full h-full bg-liquid-wave-2 animate-liquid-wave delay-1000"></div>
                  <div className="absolute top-4 left-0 w-full h-full bg-liquid-wave-3 animate-liquid-wave delay-2000"></div>
                </div>
              </div>
              
              {/* Floating accent elements */}
              <motion.div 
                className="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-liquid-primary blur-xl opacity-30 animate-liquid-float"
                animate={{ 
                  y: [0, -20, 0],
                  x: [0, 10, 0]
                }}
                transition={{ 
                  duration: 6,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              ></motion.div>
              <motion.div 
                className="absolute -bottom-6 -left-6 w-16 h-16 rounded-full bg-liquid-secondary blur-xl opacity-40 animate-liquid-float"
                animate={{ 
                  y: [0, 20, 0],
                  x: [0, -10, 0]
                }}
                transition={{ 
                  duration: 8,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              ></motion.div>
            </motion.div>
          </div>
        </div>
        
        {/* Animated scroll indicator */}
        <motion.div 
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
        >
          <span className="liquid-body text-liquid-text-secondary mb-4">Explore my work</span>
          <div className="w-8 h-12 rounded-full border-2 border-liquid-primary/50 flex justify-center p-1">
            <motion.div 
              className="w-2 h-2 bg-liquid-primary rounded-full"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </section>

      {/* About Section */}
      <section className="py-32 relative">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-20"
            >
              <h2 className="liquid-heading text-4xl md:text-5xl mb-6">
                <span className="bg-gradient-to-r from-liquid-primary to-liquid-secondary bg-clip-text text-transparent">
                  About Me
                </span>
              </h2>
              <div className="liquid-divider mx-auto"></div>
            </motion.div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <h3 className="liquid-heading text-3xl mb-6 text-white">Crafting Seamless Experiences</h3>
                <p className="liquid-body text-lg text-liquid-text-secondary mb-6 leading-relaxed">
                  With over 8 years of experience in full-stack development and UI/UX design, I specialize in creating digital experiences that blend technical excellence with aesthetic innovation.
                </p>
                <p className="liquid-body text-lg text-liquid-text-secondary mb-8 leading-relaxed">
                  My approach focuses on understanding user needs and crafting solutions that not only meet but exceed expectations. I believe in the power of well-designed interfaces to transform user experiences.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                  <div className="liquid-glass-card p-6">
                    <h4 className="liquid-subheading text-xl text-liquid-primary mb-2">Frontend Expertise</h4>
                    <p className="liquid-body text-liquid-text-secondary">React, Next.js, TypeScript, WebGL</p>
                  </div>
                  <div className="liquid-glass-card p-6">
                    <h4 className="liquid-subheading text-xl text-liquid-primary mb-2">Backend Proficiency</h4>
                    <p className="liquid-body text-liquid-text-secondary">Node.js, GraphQL, PostgreSQL, Redis</p>
                  </div>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="relative"
              >
                <div className="liquid-glass-strong p-1 rounded-3xl">
                  <div className="bg-liquid-bg rounded-3xl p-8">
                    <div className="grid grid-cols-2 gap-6 mb-8">
                      <div className="text-center p-6 liquid-glass-card">
                        <div className="liquid-heading text-4xl text-liquid-primary mb-2">50+</div>
                        <div className="liquid-body text-liquid-text-secondary">Projects</div>
                      </div>
                      <div className="text-center p-6 liquid-glass-card">
                        <div className="liquid-heading text-4xl text-liquid-primary mb-2">8+</div>
                        <div className="liquid-body text-liquid-text-secondary">Years</div>
                      </div>
                      <div className="text-center p-6 liquid-glass-card">
                        <div className="liquid-heading text-4xl text-liquid-primary mb-2">30+</div>
                        <div className="liquid-body text-liquid-text-secondary">Clients</div>
                      </div>
                      <div className="text-center p-6 liquid-glass-card">
                        <div className="liquid-heading text-4xl text-liquid-primary mb-2">15+</div>
                        <div className="liquid-body text-liquid-text-secondary">Awards</div>
                      </div>
                    </div>
                    
                    {/* Skills section */}
                    <h4 className="liquid-subheading text-2xl text-white mb-6">Expertise</h4>
                    <div className="space-y-5">
                      {skills.map((skill, index) => (
                        <div key={index}>
                          <div className="flex justify-between mb-2">
                            <span className="liquid-body text-liquid-text-secondary">{skill.name}</span>
                            <span className="liquid-body text-liquid-primary">{skill.level}%</span>
                          </div>
                          <div className="w-full h-2 bg-liquid-bg-light rounded-full overflow-hidden">
                            <motion.div 
                              className="h-full bg-gradient-to-r from-liquid-primary to-liquid-secondary rounded-full"
                              initial={{ width: 0 }}
                              whileInView={{ width: `${skill.level}%` }}
                              viewport={{ once: true }}
                              transition={{ duration: 1, delay: index * 0.1 }}
                            ></motion.div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section className="py-32 relative">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-20"
            >
              <h2 className="liquid-heading text-4xl md:text-5xl mb-6">
                <span className="bg-gradient-to-r from-liquid-primary to-liquid-secondary bg-clip-text text-transparent">
                  Selected Projects
                </span>
              </h2>
              <p className="liquid-body text-xl text-liquid-text-secondary max-w-3xl mx-auto mb-8">
                A curated selection of innovative projects showcasing design excellence and technical innovation.
              </p>
              <div className="liquid-divider mx-auto"></div>
            </motion.div>
            
            {/* Filter buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="flex flex-wrap justify-center gap-4 mb-16"
            >
              {["All", "Web", "Mobile", "Design", "AI"].map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`liquid-button-outline px-6 py-3 text-sm ${
                    activeFilter === filter 
                      ? "text-white bg-gradient-to-r from-liquid-primary to-liquid-secondary border-liquid-primary" 
                      : "text-liquid-primary"
                  }`}
                >
                  {filter}
                </button>
              ))}
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="liquid-glass-card rounded-2xl overflow-hidden group"
                >
                  <div className="relative overflow-hidden">
                    <div className="bg-liquid-bg-light aspect-video flex items-center justify-center">
                      <div className="bg-liquid-bg border-2 border-dashed border-liquid-primary/30 rounded-xl w-full h-full flex items-center justify-center">
                        <span className="text-4xl liquid-heading text-liquid-primary">{project.title.charAt(0)}</span>
                      </div>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-liquid-bg/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="absolute bottom-6 left-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-full py-3 liquid-button text-sm"
                      >
                        <span>View Project</span>
                        <ExternalLink className="ml-2 w-4 h-4 inline" />
                      </motion.button>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="liquid-heading text-xl text-white mb-3">{project.title}</h3>
                    <p className="liquid-body text-liquid-text-secondary mb-6">{project.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag, tagIndex) => (
                        <span key={tagIndex} className="liquid-body px-3 py-1 bg-liquid-primary/10 text-liquid-primary rounded-full text-xs">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-center mt-16"
            >
              <button className="liquid-button-outline px-10 py-4">
                View Full Portfolio
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-32 relative">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-20"
            >
              <h2 className="liquid-heading text-4xl md:text-5xl mb-6">
                <span className="bg-gradient-to-r from-liquid-primary to-liquid-secondary bg-clip-text text-transparent">
                  Client Voices
                </span>
              </h2>
              <p className="liquid-body text-xl text-liquid-text-secondary max-w-2xl mx-auto mb-8">
                What industry leaders say about working with me.
              </p>
              <div className="liquid-divider mx-auto"></div>
            </motion.div>
            
            <div className="relative">
              <div className="liquid-glass-strong p-12 rounded-3xl relative overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentTestimonial}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.5 }}
                    className="text-center relative z-10"
                  >
                    <div className="relative w-24 h-24 mx-auto mb-8 rounded-full overflow-hidden border-2 border-liquid-primary">
                      <div className="bg-liquid-bg-light w-full h-full flex items-center justify-center">
                        <div className="bg-liquid-bg border-2 border-dashed border-liquid-primary/30 rounded-full w-16 h-16" />
                      </div>
                    </div>
                    <p className="liquid-body text-2xl text-liquid-text-secondary italic mb-8 max-w-3xl mx-auto leading-relaxed">
                      "{testimonials[currentTestimonial].content}"
                    </p>
                    <div>
                      <h4 className="liquid-heading text-2xl text-liquid-primary">{testimonials[currentTestimonial].name}</h4>
                      <p className="liquid-body text-liquid-text-secondary/70">{testimonials[currentTestimonial].role}</p>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
              
              <div className="absolute top-1/2 -left-6 transform -translate-y-1/2">
                <button 
                  onClick={prevTestimonial}
                  className="p-3 rounded-full liquid-glass-card text-liquid-primary hover:bg-liquid-primary/10 transition-all duration-300"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
              </div>
              <div className="absolute top-1/2 -right-6 transform -translate-y-1/2">
                <button 
                  onClick={nextTestimonial}
                  className="p-3 rounded-full liquid-glass-card text-liquid-primary hover:bg-liquid-primary/10 transition-all duration-300"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>
              
              <div className="flex justify-center mt-10 space-x-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentTestimonial(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentTestimonial 
                        ? 'bg-liquid-primary w-8' 
                        : 'bg-liquid-primary/30'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-32 relative">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-20"
            >
              <h2 className="liquid-heading text-4xl md:text-5xl mb-6">
                <span className="bg-gradient-to-r from-liquid-primary to-liquid-secondary bg-clip-text text-transparent">
                  Let's Connect
                </span>
              </h2>
              <p className="liquid-body text-xl text-liquid-text-secondary max-w-3xl mx-auto mb-8">
                Interested in working together? Let's discuss your project and create something exceptional.
              </p>
              <div className="liquid-divider mx-auto"></div>
            </motion.div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <div className="liquid-glass-card p-10 h-full">
                  <h3 className="liquid-heading text-2xl text-liquid-primary mb-8">Get In Touch</h3>
                  
                  <div className="space-y-8 mb-12">
                    <div className="flex items-start">
                      <div className="p-3 rounded-full bg-liquid-primary/10 mr-6">
                        <Mail className="w-6 h-6 text-liquid-primary" />
                      </div>
                      <div>
                        <h4 className="liquid-subheading text-xl text-white mb-2">Email</h4>
                        <p className="liquid-body text-liquid-text-secondary">contact@liquidportfolio.com</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="p-3 rounded-full bg-liquid-primary/10 mr-6">
                        <Phone className="w-6 h-6 text-liquid-primary" />
                      </div>
                      <div>
                        <h4 className="liquid-subheading text-xl text-white mb-2">Phone</h4>
                        <p className="liquid-body text-liquid-text-secondary">+1 (555) 123-4567</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="p-3 rounded-full bg-liquid-primary/10 mr-6">
                        <MapPin className="w-6 h-6 text-liquid-primary" />
                      </div>
                      <div>
                        <h4 className="liquid-subheading text-xl text-white mb-2">Location</h4>
                        <p className="liquid-body text-liquid-text-secondary">San Francisco, CA</p>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="liquid-subheading text-xl text-liquid-primary mb-6">Follow Me</h4>
                    <div className="flex space-x-6">
                      {[
                        { icon: Github, href: "#" },
                        { icon: Linkedin, href: "#" },
                        { icon: Twitter, href: "#" },
                        { icon: Dribbble, href: "#" },
                        { icon: Mail, href: "#" }
                      ].map((social, index) => (
                        <motion.a 
                          key={index}
                          href={social.href}
                          whileHover={{ y: -5 }}
                          className="p-4 rounded-full bg-liquid-primary/10 text-liquid-primary hover:bg-liquid-primary/20 transition-all duration-300"
                        >
                          <social.icon className="w-6 h-6" />
                        </motion.a>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <div className="liquid-glass-strong p-1 rounded-3xl">
                  <div className="bg-liquid-bg/50 rounded-3xl p-10">
                    <form onSubmit={handleSubmit}>
                      <div className="mb-8">
                        <label htmlFor="email" className="liquid-body block text-liquid-primary mb-3 font-medium">Email</label>
                        <input
                          type="email"
                          id="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="liquid-input w-full"
                          placeholder="your.email@example.com"
                          required
                        />
                      </div>
                      
                      <div className="mb-8">
                        <label htmlFor="message" className="liquid-body block text-liquid-primary mb-3 font-medium">Message</label>
                        <textarea
                          id="message"
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          rows={6}
                          className="liquid-input w-full"
                          placeholder="Tell me about your project..."
                          required
                        ></textarea>
                      </div>
                      
                      <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        disabled={isSubmitting}
                        className="liquid-button w-full"
                      >
                        {isSubmitting ? (
                          <span>Sending...</span>
                        ) : (
                          <>
                            <span>Send Message</span>
                            <ExternalLink className="ml-2 w-5 h-5 inline" />
                          </>
                        )}
                      </motion.button>
                    </form>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-liquid-primary/20 relative">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="liquid-heading text-2xl bg-gradient-to-r from-liquid-primary to-liquid-secondary bg-clip-text text-transparent mb-6 md:mb-0">
              LiquidPortfolio
            </div>
            <div className="liquid-body text-liquid-text-secondary/70 text-center md:text-right">
              <p>© {new Date().getFullYear()} All rights reserved.</p>
              <p className="mt-2">Crafted with innovation and precision.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}