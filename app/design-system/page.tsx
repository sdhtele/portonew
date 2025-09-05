"use client";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/liquid-glass-tabs";
import { LiquidGlassButton } from "@/components/ui/liquid-glass-button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function DesignSystem() {
  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl md:text-5xl font-bold text-center mb-8 md:mb-16 text-white">
          Sistem Desain Hitam dan Putih
        </h1>
        
        <div className="mb-12 md:mb-20">
          <h2 className="text-2xl md:text-3xl font-semibold mb-6 md:mb-10 text-white border-b border-white/20 pb-3 md:pb-4">Komponen Tab</h2>
          
          <Tabs defaultValue="tab1" className="w-full">
            <TabsList>
              <TabsTrigger value="tab1">Profil</TabsTrigger>
              <TabsTrigger value="tab2">Pengaturan</TabsTrigger>
              <TabsTrigger value="tab3">Keamanan</TabsTrigger>
            </TabsList>
            <TabsContent value="tab1">
              <Card className="bg-black/30 backdrop-blur-lg border border-white/20">
                <CardHeader>
                  <CardTitle className="text-white text-lg md:text-xl">Informasi Profil</CardTitle>
                  <CardDescription className="text-white/70 text-sm md:text-base">
                    Kelola informasi pribadi Anda di sini
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 md:space-y-6">
                  <p className="text-white/90 text-sm md:text-base">
                    Ini adalah contoh konten tab dengan tema hitam dan putih yang elegan. Perhatikan transisi halus antar tab.
                  </p>
                  <div className="flex flex-wrap gap-3 md:gap-4">
                    <LiquidGlassButton variant="outline" size="sm" className="md:size-default">
                      Simpan Perubahan
                    </LiquidGlassButton>
                    <LiquidGlassButton variant="default" size="sm" className="md:size-default">
                      Edit Profil
                    </LiquidGlassButton>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="tab2">
              <Card className="bg-black/30 backdrop-blur-lg border border-white/20">
                <CardHeader>
                  <CardTitle className="text-white text-lg md:text-xl">Pengaturan Aplikasi</CardTitle>
                  <CardDescription className="text-white/70 text-sm md:text-base">
                    Sesuaikan pengalaman Anda
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 md:space-y-6">
                  <p className="text-white/90 text-sm md:text-base">
                    Tab ini menunjukkan transisi halus antar konten dengan tema hitam dan putih yang konsisten.
                  </p>
                  <div className="flex flex-wrap gap-3 md:gap-4">
                    <LiquidGlassButton variant="outline" size="sm" className="md:size-default">
                      Reset Pengaturan
                    </LiquidGlassButton>
                    <LiquidGlassButton variant="default" size="sm" className="md:size-default">
                      Simpan
                    </LiquidGlassButton>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="tab3">
              <Card className="bg-black/30 backdrop-blur-lg border border-white/20">
                <CardHeader>
                  <CardTitle className="text-white text-lg md:text-xl">Keamanan Akun</CardTitle>
                  <CardDescription className="text-white/70 text-sm md:text-base">
                    Kelola keamanan akun Anda
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 md:space-y-6">
                  <p className="text-white/90 text-sm md:text-base">
                    Tema hitam dan putih memberikan kesan premium dan elegan pada antarmuka pengguna.
                  </p>
                  <div className="flex flex-wrap gap-3 md:gap-4">
                    <LiquidGlassButton variant="outline" size="sm" className="md:size-default">
                      Ganti Kata Sandi
                    </LiquidGlassButton>
                    <LiquidGlassButton variant="destructive" size="sm" className="md:size-default">
                      Hapus Akun
                    </LiquidGlassButton>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
        
        <div className="mb-12 md:mb-20">
          <h2 className="text-2xl md:text-3xl font-semibold mb-6 md:mb-10 text-white border-b border-white/20 pb-3 md:pb-4">Tombol</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            <Card className="bg-black/30 backdrop-blur-lg border border-white/20">
              <CardHeader>
                <CardTitle className="text-white text-lg md:text-xl">Varian Default</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 md:space-y-4">
                <LiquidGlassButton className="w-full" size="sm">
                  Tombol Default
                </LiquidGlassButton>
                <LiquidGlassButton className="w-full" size="sm" disabled>
                  Tombol Dinonaktifkan
                </LiquidGlassButton>
              </CardContent>
            </Card>
            
            <Card className="bg-black/30 backdrop-blur-lg border border-white/20">
              <CardHeader>
                <CardTitle className="text-white text-lg md:text-xl">Varian Outline</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 md:space-y-4">
                <LiquidGlassButton variant="outline" className="w-full" size="sm">
                  Tombol Outline
                </LiquidGlassButton>
                <LiquidGlassButton variant="outline" className="w-full" size="sm" disabled>
                  Outline Dinonaktifkan
                </LiquidGlassButton>
              </CardContent>
            </Card>
            
            <Card className="bg-black/30 backdrop-blur-lg border border-white/20">
              <CardHeader>
                <CardTitle className="text-white text-lg md:text-xl">Varian Destructive</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 md:space-y-4">
                <LiquidGlassButton variant="destructive" className="w-full" size="sm">
                  Tombol Destructive
                </LiquidGlassButton>
                <LiquidGlassButton variant="destructive" className="w-full" size="sm" disabled>
                  Destructive Dinonaktifkan
                </LiquidGlassButton>
              </CardContent>
            </Card>
          </div>
        </div>
        
        <div className="mb-12 md:mb-20">
          <h2 className="text-2xl md:text-3xl font-semibold mb-6 md:mb-10 text-white border-b border-white/20 pb-3 md:pb-4">Ukuran Tombol</h2>
          
          <Card className="bg-black/30 backdrop-blur-lg border border-white/20">
            <CardContent className="pt-4 md:pt-6">
              <div className="flex flex-wrap gap-3 md:gap-6 items-center">
                <LiquidGlassButton size="sm">Small</LiquidGlassButton>
                <LiquidGlassButton size="default">Default</LiquidGlassButton>
                <LiquidGlassButton size="lg">Large</LiquidGlassButton>
                <LiquidGlassButton size="xl">Extra Large</LiquidGlassButton>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="mb-12 md:mb-20">
          <h2 className="text-2xl md:text-3xl font-semibold mb-6 md:mb-10 text-white border-b border-white/20 pb-3 md:pb-4">Badge</h2>
          
          <Card className="bg-black/30 backdrop-blur-lg border border-white/20">
            <CardContent className="pt-4 md:pt-6">
              <div className="flex flex-wrap gap-3 md:gap-4 items-center">
                <Badge variant="default">Default</Badge>
                <Badge variant="secondary">Secondary</Badge>
                <Badge variant="outline">Outline</Badge>
                <Badge variant="destructive">Destructive</Badge>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div>
          <h2 className="text-2xl md:text-3xl font-semibold mb-6 md:mb-10 text-white border-b border-white/20 pb-3 md:pb-4">Animasi</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            <Card className="bg-black/30 backdrop-blur-lg border border-white/20">
              <CardHeader>
                <CardTitle className="text-white text-lg md:text-xl">Fade In</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-24 md:h-32 flex items-center justify-center">
                  <div className="animate-fade-in-up bg-white/20 border border-white/30 rounded-lg w-16 h-16 md:w-24 md:h-24 flex items-center justify-center text-white font-bold text-sm md:text-base">
                    Fade
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-black/30 backdrop-blur-lg border border-white/20">
              <CardHeader>
                <CardTitle className="text-white text-lg md:text-xl">Scale In</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-24 md:h-32 flex items-center justify-center">
                  <div className="animate-scale-in bg-white/20 border border-white/30 rounded-lg w-16 h-16 md:w-24 md:h-24 flex items-center justify-center text-white font-bold text-sm md:text-base">
                    Scale
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-black/30 backdrop-blur-lg border border-white/20">
              <CardHeader>
                <CardTitle className="text-white text-lg md:text-xl">Float In</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-24 md:h-32 flex items-center justify-center">
                  <div className="animate-float-in bg-white/20 border border-white/30 rounded-lg w-16 h-16 md:w-24 md:h-24 flex items-center justify-center text-white font-bold text-sm md:text-base">
                    Float
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}