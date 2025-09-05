"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Sparkles } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const navItems = [
  { href: "/", label: "Beranda" },
  { href: "/projects", label: "Proyek" },
  { href: "/contact", label: "Kontak" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-black/80 backdrop-blur-xl border-white/20">
      <div className="container flex h-14 md:h-16 items-center">
        <motion.div 
          className="mr-3 md:mr-6 flex items-center"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link href="/" className="flex items-center space-x-2">
            <motion.div 
              className="relative"
              whileHover={{ scale: 1.1, rotate: 10 }}
              whileTap={{ scale: 0.9 }}
            >
              <Sparkles className="h-6 w-6 md:h-8 md:w-8 text-white" />
              <motion.div 
                className="absolute -top-0.5 -right-0.5 w-2 h-2 md:w-3 md:h-3 bg-white rounded-full border border-black"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
              />
            </motion.div>
            <motion.span 
              className="font-bold text-lg md:text-xl text-white"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              ngnawfal
            </motion.span>
          </Link>
        </motion.div>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-4 md:space-x-8 text-sm md:text-base font-medium">
          {navItems.map((item, index) => (
            <motion.div
              key={item.href}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              whileHover={{ y: -2 }}
            >
              <Link
                href={item.href}
                className={cn(
                  "transition-all duration-300 relative py-2 px-2 rounded-md",
                  pathname === item.href 
                    ? "text-white font-bold" 
                    : "text-white/60 hover:text-white"
                )}
              >
                {item.label}
                {pathname === item.href && (
                  <motion.span 
                    className="absolute bottom-0 left-0 w-full h-0.5 bg-white rounded-full"
                    layoutId="navbar-indicator"
                  />
                )}
              </Link>
            </motion.div>
          ))}
        </nav>
        
        <div className="flex flex-1 items-center justify-end space-x-4 md:space-x-6">
          <motion.nav 
            className="flex items-center space-x-3 md:space-4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            {/* Theme Toggle */}
            <div className="flex items-center">
              <ThemeToggle />
            </div>
            
            {/* Mobile Navigation */}
            <div className="md:hidden">
              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                  <button className="px-2 text-lg">
                    <Menu className="h-5 w-5 md:h-6 md:w-6 text-white" />
                    <span className="sr-only">Toggle Menu</span>
                  </button>
                </SheetTrigger>
                <SheetContent side="right" className="pr-0 bg-black border-l border-white/20">
                  <SheetHeader className="hidden">
                    <SheetTitle>Menu Navigasi</SheetTitle>
                  </SheetHeader>
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Link
                      href="/"
                      className="flex items-center space-x-2 mb-6"
                      onClick={() => setIsOpen(false)}
                    >
                      <Sparkles className="h-6 w-6 md:h-8 md:w-8 text-white" />
                      <span className="font-bold text-lg md:text-xl text-white">
                        ngnawfal
                      </span>
                    </Link>
                    <nav className="mt-4 md:mt-6 grid gap-4 md:gap-6 text-base md:text-lg font-medium">
                      {navItems.map((item) => (
                        <motion.div
                          key={item.href}
                          whileHover={{ x: 10 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Link
                            href={item.href}
                            onClick={() => setIsOpen(false)}
                            className={cn(
                              "transition-colors py-2 md:py-3 px-3 md:px-4 rounded-lg md:rounded-xl flex items-center",
                              pathname === item.href 
                                ? "text-white bg-white/10 font-bold" 
                                : "text-white/60 hover:text-white hover:bg-black/50"
                            )}
                          >
                            {item.label}
                          </Link>
                        </motion.div>
                      ))}
                    </nav>
                  </motion.div>
                </SheetContent>
              </Sheet>
            </div>
          </motion.nav>
        </div>
      </div>
    </header>
  );
}