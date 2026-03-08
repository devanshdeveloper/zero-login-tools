import { ToolDefinition, tools } from "./tool-registry";

export function getToolBySlug(slug: string): ToolDefinition | undefined {
  return tools.find((tool) => tool.slug === slug);
}

export function getToolsByCategory(category: string): ToolDefinition[] {
  return tools.filter((tool) => tool.category === category);
}

export function getPopularTools(): ToolDefinition[] {
  return tools.filter((tool) => tool.popular);
}

export function getAllTools(): ToolDefinition[] {
  return tools;
}
