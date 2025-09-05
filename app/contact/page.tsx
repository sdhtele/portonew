"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail, Phone, MapPin, Send, User, MessageSquare, Building } from "lucide-react";
import { toast } from "sonner";
import { LiquidGlassButton } from "@/components/ui/liquid-glass-button";
import { LiquidGlassCard } from "@/components/ui/liquid-animations";
import { motion } from "framer-motion";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

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
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    toast.success("Message sent successfully! I'll get back to you soon.");
    
    // Reset form
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: ""
    });
  };

  return (
    <div className="min-h-screen bg-black py-10 md:py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8 md:mb-12">
            <motion.h1 
              className="text-2xl md:text-3xl font-bold text-white mb-3 md:mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Hubungi Saya
            </motion.h1>
            <motion.p 
              className="text-xs md:text-base text-white/80 max-w-2xl mx-auto px-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Punya proyek dalam pikiran atau ingin mendiskusikan peluang baru? 
              Jangan ragu untuk menghubungi saya melalui formulir di bawah ini atau melalui detail kontak saya.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
            {/* Contact Form */}
            <LiquidGlassCard className="bg-black/20 backdrop-blur-lg border border-white/20 rounded-xl md:rounded-2xl">
              <CardHeader>
                <CardTitle className="flex items-center text-white text-base md:text-lg">
                  <Send className="mr-2 w-4 h-4 md:mr-2.5 md:w-5 md:h-5" />
                  Kirim Pesan
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-3 md:space-y-4">
                  <div className="space-y-1.5 md:space-y-2">
                    <Label htmlFor="name" className="text-white text-xs md:text-sm">Nama</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-3.5 h-3.5 md:w-4 md:h-4 text-white/70" />
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="Nama Anda"
                        className="pl-10 md:pl-12 pr-3 py-2 md:py-3 text-xs md:text-sm rounded-md md:rounded-lg bg-black/20 border-white/20 text-white placeholder-white/50"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5 md:space-y-2">
                    <Label htmlFor="email" className="text-white text-xs md:text-sm">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-3.5 h-3.5 md:w-4 md:h-4 text-white/70" />
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="email.anda@contoh.com"
                        className="pl-10 md:pl-12 pr-3 py-2 md:py-3 text-xs md:text-sm rounded-md md:rounded-lg bg-black/20 border-white/20 text-white placeholder-white/50"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5 md:space-y-2">
                    <Label htmlFor="subject" className="text-white text-xs md:text-sm">Subjek</Label>
                    <div className="relative">
                      <MessageSquare className="absolute left-3 top-1/2 transform -translate-y-1/2 w-3.5 h-3.5 md:w-4 md:h-4 text-white/70" />
                      <Input
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        placeholder="Apa ini tentang?"
                        className="pl-10 md:pl-12 pr-3 py-2 md:py-3 text-xs md:text-sm rounded-md md:rounded-lg bg-black/20 border-white/20 text-white placeholder-white/50"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5 md:space-y-2">
                    <Label htmlFor="message" className="text-white text-xs md:text-sm">Pesan</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      placeholder="Tulis pesan Anda di sini..."
                      rows={4}
                      className="p-3 md:p-4 text-xs md:text-sm rounded-md md:rounded-lg bg-black/20 border-white/20 text-white placeholder-white/50"
                    />
                  </div>

                  <LiquidGlassButton 
                    type="submit" 
                    className="w-full rounded-md md:rounded-lg py-2.5 md:py-3.5 text-xs md:text-base"
                    disabled={isSubmitting}
                    variant="default"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="mr-2 h-3 w-3 md:mr-2.5 md:h-4 md:w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></span>
                        Mengirim...
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 w-3 h-3 md:mr-2.5 md:w-4 md:h-4" />
                        Kirim Pesan
                      </>
                    )}
                  </LiquidGlassButton>
                </form>
              </CardContent>
            </LiquidGlassCard>

            {/* Contact Information */}
            <div className="space-y-4 md:space-y-6">
              <LiquidGlassCard className="bg-black/20 backdrop-blur-lg border border-white/20 rounded-xl md:rounded-2xl">
                <CardHeader>
                  <CardTitle className="text-white text-base md:text-lg">Informasi Kontak</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 md:space-y-4">
                  <div className="flex items-start">
                    <div className="bg-white/10 p-2.5 md:p-3 rounded-full mr-3 md:mr-4">
                      <Mail className="w-4 h-4 md:w-5 md:h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-0.5 md:mb-1 text-white text-sm md:text-base">Email</h3>
                      <p className="text-white/80 text-xs md:text-sm">kaya@example.com</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-white/10 p-2.5 md:p-3 rounded-full mr-3 md:mr-4">
                      <Phone className="w-4 h-4 md:w-5 md:h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-0.5 md:mb-1 text-white text-sm md:text-base">Telepon</h3>
                      <p className="text-white/80 text-xs md:text-sm">+1 (555) 123-4567</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-white/10 p-2.5 md:p-3 rounded-full mr-3 md:mr-4">
                      <MapPin className="w-4 h-4 md:w-5 md:h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-0.5 md:mb-1 text-white text-sm md:text-base">Lokasi</h3>
                      <p className="text-white/80 text-xs md:text-sm">San Francisco, CA</p>
                    </div>
                  </div>
                </CardContent>
              </LiquidGlassCard>

              <LiquidGlassCard className="bg-black/20 backdrop-blur-lg border border-white/20 rounded-xl md:rounded-2xl">
                <CardHeader>
                  <CardTitle className="text-white text-base md:text-lg">Ikuti Saya</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-white/80 text-xs md:text-sm mb-3 md:mb-4">
                    Terhubung dengan saya di media sosial untuk mendapatkan pembaruan tentang proyek terbaru saya.
                  </p>
                  <div className="flex gap-2 md:gap-3">
                    <LiquidGlassButton variant="outline" size="icon" className="rounded-full w-9 h-9 md:w-11 md:h-11 border-white text-white hover:bg-white hover:text-black">
                      <svg className="w-4 h-4 md:w-5 md:h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                      </svg>
                    </LiquidGlassButton>
                    <LiquidGlassButton variant="outline" size="icon" className="rounded-full w-9 h-9 md:w-11 md:h-11 border-white text-white hover:bg-white hover:text-black">
                      <svg className="w-4 h-4 md:w-5 md:h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                      </svg>
                    </LiquidGlassButton>
                    <LiquidGlassButton variant="outline" size="icon" className="rounded-full w-9 h-9 md:w-11 md:h-11 border-white text-white hover:bg-white hover:text-black">
                      <svg className="w-4 h-4 md:w-5 md:h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                      </svg>
                    </LiquidGlassButton>
                  </div>
                </CardContent>
              </LiquidGlassCard>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}