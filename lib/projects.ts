import { projects } from "@/db/schema/projects";

export type Project = typeof projects.$inferSelect;
export type NewProject = typeof projects.$inferInsert;