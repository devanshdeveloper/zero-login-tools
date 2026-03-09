import { allRegistryTools, getRegistryTool } from "@/registry";
import { RegistryTool } from "@/registry/types";

export function getToolBySlug(slug: string): RegistryTool | undefined {
  return getRegistryTool(slug);
}

export function getAllTools(): RegistryTool[] {
  return allRegistryTools;
}
