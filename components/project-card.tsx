"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface ProjectCardProps {
  id: number;
  title: string;
  description: string;
  imageUrl?: string;
  projectLink?: string;
  technologies?: string;
  featured?: boolean;
  index: number;
}

export default function ProjectCard({
  id,
  title,
  description,
  imageUrl,
  projectLink,
  technologies,
  featured = false,
  index
}: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      className="h-full"
    >
      <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 group h-full flex flex-col">
        {imageUrl ? (
          <div className="relative aspect-video">
            <Image
              src={imageUrl}
              alt={title}
              fill
              className="object-cover"
            />
          </div>
        ) : (
          <div className="bg-gradient-to-r from-blue-400 to-purple-500 aspect-video" />
        )}
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            {title}
            {featured && (
              <Badge variant="secondary" className="text-xs">
                Featured
              </Badge>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col flex-grow">
          <p className="text-muted-foreground line-clamp-2 mb-4 flex-grow">
            {description}
          </p>
          {technologies && (
            <div className="flex flex-wrap gap-2 mb-4">
              {technologies.split(',').slice(0, 3).map((tech, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {tech.trim()}
                </Badge>
              ))}
              {technologies.split(',').length > 3 && (
                <Badge variant="secondary" className="text-xs">
                  +{technologies.split(',').length - 3} more
                </Badge>
              )}
            </div>
          )}
          <Button asChild variant="outline" className="mt-auto">
            <Link href={`/projects/${id}`}>
              View Details
            </Link>
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
}