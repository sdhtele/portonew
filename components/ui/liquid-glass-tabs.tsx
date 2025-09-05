"use client";

import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { motion } from "framer-motion";

import { cn } from "@/lib/utils";

interface LiquidGlassTabsProps extends React.ComponentProps<typeof TabsPrimitive.Root> {}

const LiquidGlassTabs = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Root>,
  LiquidGlassTabsProps
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Root
    ref={ref}
    className={cn("flex flex-col gap-2", className)}
    {...props}
  />
));
LiquidGlassTabs.displayName = TabsPrimitive.Root.displayName;

interface LiquidGlassTabsListProps extends React.ComponentProps<typeof TabsPrimitive.List> {}

const LiquidGlassTabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  LiquidGlassTabsListProps
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      "bg-white/5 backdrop-blur-lg inline-flex h-8 md:h-10 w-fit items-center justify-center rounded-md md:rounded-lg p-0.5 md:p-1 border border-white/10",
      className
    )}
    {...props}
  />
));
LiquidGlassTabsList.displayName = TabsPrimitive.List.displayName;

interface LiquidGlassTabsTriggerProps extends React.ComponentProps<typeof TabsPrimitive.Trigger> {}

const LiquidGlassTabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  LiquidGlassTabsTriggerProps
>(({ className, children, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      "text-foreground dark:text-muted-foreground inline-flex h-full flex-1 items-center justify-center gap-1 rounded-sm md:rounded-md px-2 py-1 md:px-3 md:py-1.5 text-[0.65rem] md:text-xs font-medium whitespace-nowrap transition-all duration-300 focus-visible:ring-[2px] md:focus-visible:ring-[3px] focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50 relative overflow-hidden group",
      "data-[state=active]:text-white data-[state=active]:bg-white/15 data-[state=active]:backdrop-blur-lg data-[state=active]:border data-[state=active]:border-white/20 data-[state=active]:shadow-md md:data-[state=active]:shadow-lg",
      "hover:bg-white/10 hover:border-white/10",
      "before:absolute before:inset-0 before:bg-gradient-to-r before:from-white/5 before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300",
      className
    )}
    {...props}
  >
    <span className="relative z-10 flex items-center gap-1">{children}</span>
    
    {/* Active state indicator with animation */}
    {props['data-state'] === 'active' && (
      <>
        <motion.span 
          className="absolute inset-0 bg-gradient-to-r from-blue-400/10 to-cyan-400/10 rounded-sm md:rounded-md blur-sm"
          layoutId="liquid-tab-glow"
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        />
        <motion.span 
          className="absolute inset-0 bg-gradient-to-r from-blue-400/5 to-cyan-400/5 rounded-sm md:rounded-md blur-sm md:blur-md"
          layoutId="liquid-tab-glow-large"
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        />
      </>
    )}
  </TabsPrimitive.Trigger>
));
LiquidGlassTabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

interface LiquidGlassTabsContentProps extends React.ComponentProps<typeof TabsPrimitive.Content> {}

const LiquidGlassTabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  LiquidGlassTabsContentProps
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      "flex-1 outline-none mt-2 md:mt-3 p-3 md:p-4 bg-white/5 backdrop-blur-lg rounded-md md:rounded-lg border border-white/10 shadow-md md:shadow-lg",
      className
    )}
    {...props}
  />
));
LiquidGlassTabsContent.displayName = TabsPrimitive.Content.displayName;

export { 
  LiquidGlassTabs as Tabs, 
  LiquidGlassTabsList as TabsList, 
  LiquidGlassTabsTrigger as TabsTrigger, 
  LiquidGlassTabsContent as TabsContent 
};