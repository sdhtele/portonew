"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { motion, AnimatePresence } from "framer-motion";

import { cn } from "@/lib/utils";

const liquidGlassButtonVariants = cva(
  "inline-flex items-center justify-center gap-1.5 md:gap-2 whitespace-nowrap rounded-md md:rounded-lg text-xs md:text-sm font-medium transition-all duration-300 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-3 md:[&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[2px] md:focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive relative overflow-hidden group",
  {
    variants: {
      variant: {
        default:
          "bg-white/10 backdrop-blur-lg border border-white/20 text-white shadow-white hover:bg-white/20 hover:shadow-white-lg hover:border-white/30",
        primary:
          "bg-white/20 backdrop-blur-lg border border-white/30 text-white shadow-white hover:bg-white/30 hover:shadow-white-lg hover:border-white/50",
        secondary:
          "bg-black/20 backdrop-blur-lg border border-white/30 text-white shadow-white hover:bg-black/30 hover:shadow-white-lg hover:border-white/50",
        destructive:
          "bg-red-500/20 backdrop-blur-lg border border-red-400/30 text-red-100 shadow-white hover:bg-red-500/30 hover:shadow-white-lg hover:border-red-400/50",
        outline:
          "border border-white/30 text-white hover:bg-white/10 hover:border-white/50",
        ghost: "text-white hover:bg-white/10",
      },
      size: {
        default: "h-8 px-3 py-1.5 md:h-10 md:px-4 md:py-2 has-[>svg]:px-2 md:has-[>svg]:px-3",
        sm: "h-6 rounded-md gap-1 px-2 md:h-8 md:rounded-md md:gap-1.5 md:px-3 has-[>svg]:px-1.5 md:has-[>svg]:px-2.5 text-xs",
        lg: "h-10 rounded-lg px-4 md:h-12 md:rounded-lg md:px-6 has-[>svg]:px-3 md:has-[>svg]:px-4 text-sm md:text-base",
        xl: "h-12 rounded-lg px-6 md:h-14 md:rounded-xl md:px-8 text-base md:text-lg has-[>svg]:px-4 md:has-[>svg]:px-6",
        icon: "size-8 rounded-md md:size-10 md:rounded-lg",
        "icon-sm": "size-6 rounded-md md:size-8 md:rounded-md",
        "icon-lg": "size-10 rounded-lg md:size-12 md:rounded-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

interface LiquidGlassButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof liquidGlassButtonVariants> {
  asChild?: boolean;
  animated?: boolean;
}

const LiquidGlassButton = React.forwardRef<HTMLButtonElement, LiquidGlassButtonProps>(
  ({ className, variant, size, asChild = false, animated = false, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";

    // Extract text content for animation key
    const textContent = React.Children.toArray(children).filter(
      child => typeof child === 'string' || typeof child === 'number'
    ).join(' ');

    if (animated) {
      return (
        <motion.div
          whileHover={{ 
            scale: 1.02,
            y: -1
          }}
          whileTap={{ scale: 0.98 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <Comp
            className={cn(liquidGlassButtonVariants({ variant, size, className }))}
            ref={ref}
            {...props}
          >
            <AnimatePresence mode="wait">
              <motion.span
                key={textContent}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.15 }}
                className="relative z-10 flex items-center gap-1.5"
              >
                {children}
              </motion.span>
            </AnimatePresence>
            
            {/* Liquid glass effect layers for black and white theme */}
            <span className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-md"></span>
            <span className="absolute inset-0 bg-gradient-to-r from-white/10 to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-md blur-sm"></span>
          </Comp>
        </motion.div>
      );
    }

    return (
      <Comp
        className={cn(liquidGlassButtonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        <span className="relative z-10 flex items-center gap-1.5">{children}</span>
        
        {/* Liquid glass effect layers for black and white theme */}
        <span className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-md"></span>
        <span className="absolute inset-0 bg-gradient-to-r from-white/10 to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-md blur-sm"></span>
      </Comp>
    );
  }
);
LiquidGlassButton.displayName = "LiquidGlassButton";

export { LiquidGlassButton, liquidGlassButtonVariants };