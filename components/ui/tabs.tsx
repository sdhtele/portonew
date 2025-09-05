"use client"

import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"

import { cn } from "@/lib/utils"

function Tabs({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Root>) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      className={cn("flex flex-col gap-2", className)}
      {...props}
    />
  )
}

function TabsList({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.List>) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      className={cn(
        "bg-white/5 backdrop-blur-lg text-muted-foreground inline-flex h-12 w-fit items-center justify-center rounded-xl p-1 border border-white/10",
        className
      )}
      {...props}
    />
  )
}

function TabsTrigger({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      className={cn(
        "data-[state=active]:text-foreground focus-visible:outline-ring dark:data-[state=active]:border-input text-foreground dark:text-muted-foreground inline-flex h-full flex-1 items-center justify-center gap-1.5 rounded-lg px-4 py-2 text-sm font-medium whitespace-nowrap transition-all duration-300 focus-visible:ring-[3px] focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50 relative overflow-hidden",
        "data-[state=active]:bg-white/15 data-[state=active]:backdrop-blur-lg data-[state=active]:border data-[state=active]:border-white/20 data-[state=active]:shadow-lg",
        "hover:bg-white/10 hover:border-white/10",
        "before:absolute before:inset-0 before:bg-gradient-to-r before:from-white/5 before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300",
        className
      )}
      {...props}
    >
      <span className="relative z-10">{props.children}</span>
      {props['data-state'] === 'active' && (
        <>
          <span className="absolute inset-0 bg-gradient-to-r from-blue-400/10 to-cyan-400/10 rounded-lg blur-sm"></span>
          <span className="absolute inset-0 bg-gradient-to-r from-blue-400/5 to-cyan-400/5 rounded-lg blur-md"></span>
        </>
      )}
    </TabsPrimitive.Trigger>
  )
}

function TabsContent({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return (
    <TabsPrimitive.Content
      data-slot="tabs-content"
      className={cn("flex-1 outline-none mt-4 p-6 bg-white/5 backdrop-blur-lg rounded-xl border border-white/10 shadow-lg", className)}
      {...props}
    />
  )
}

export { Tabs, TabsList, TabsTrigger, TabsContent }
