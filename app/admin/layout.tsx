"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Package2, Home, Folder, User, LogOut } from "lucide-react";
import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import { LiquidGlassButton } from "@/components/ui/liquid-glass-button";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    // Redirect to login if not authenticated
    if (!isPending && !session) {
      router.push("/login");
    }
  }, [session, isPending, router]);

  if (isPending) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="animate-pulse text-white">Loading...</div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  const navItems = [
    { href: "/admin", label: "Dashboard", icon: Home },
    { href: "/admin/projects", label: "Projects", icon: Folder },
    { href: "/admin/profile", label: "Profile", icon: User },
  ];

  const handleSignOut = async () => {
    // Sign out logic would go here
    router.push("/login");
  };

  return (
    <div className="flex min-h-screen w-full flex-col bg-black">
      {/* Mobile Menu */}
      <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
        <SheetTrigger asChild>
          <LiquidGlassButton
            variant="outline"
            size="icon"
            className="shrink-0 md:hidden fixed top-4 left-4 z-50 border-white text-white hover:bg-white hover:text-black"
          >
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </LiquidGlassButton>
        </SheetTrigger>
        <SheetContent side="left" className="flex flex-col bg-black border-r border-white/20">
          <nav className="grid gap-2 text-lg font-medium">
            <Link
              href="/admin"
              className="flex items-center gap-2 text-lg font-semibold text-white"
            >
              <Package2 className="h-6 w-6" />
              <span className="sr-only">Portfolio Admin</span>
            </Link>
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-white/70 hover:text-white transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <item.icon className="h-5 w-5" />
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="mt-auto">
            <LiquidGlassButton
              variant="outline"
              className="w-full justify-start border-white text-white hover:bg-white hover:text-black"
              onClick={handleSignOut}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </LiquidGlassButton>
          </div>
        </SheetContent>
      </Sheet>

      {/* Desktop Sidebar */}
      <div className="hidden border-r bg-black md:block fixed left-0 top-0 h-full w-64 border-white/20">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6 border-white/20">
            <Link href="/admin" className="flex items-center gap-2 font-semibold text-white">
              <Package2 className="h-6 w-6" />
              <span className="">Portfolio Admin</span>
            </Link>
          </div>
          <div className="flex-1">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-white/70 transition-all hover:text-white"
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
          <div className="mt-auto p-4">
            <LiquidGlassButton
              variant="outline"
              className="w-full justify-start border-white text-white hover:bg-white hover:text-black"
              onClick={handleSignOut}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </LiquidGlassButton>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col md:pl-64">
        <header className="flex h-14 items-center gap-4 border-b bg-black px-4 lg:h-[60px] lg:px-6 border-white/20">
          <div className="w-full flex-1">
            <h1 className="text-lg font-semibold md:text-xl text-white">
              {navItems.find(item => item.href === router.pathname)?.label || "Dashboard"}
            </h1>
          </div>
          <ThemeToggle />
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-white">{session.user.email}</span>
          </div>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 bg-black">
          {children}
        </main>
      </div>
    </div>
  );
}