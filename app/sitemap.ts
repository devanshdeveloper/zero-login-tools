import { MetadataRoute } from "next";
import { allRegistryTools } from "@//registry";
import { categories } from "@/data/categories";

const BASE_URL = "https://zerologintools.com";

export default function sitemap(): MetadataRoute.Sitemap {
  // Base routes
  const routes: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
  ];

  // Tool routes
  const toolRoutes: MetadataRoute.Sitemap = allRegistryTools.map((tool: any) => ({
    url: `${BASE_URL}/tools/${tool.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  // Category routes
  const categoryRoutes: MetadataRoute.Sitemap = categories.map((cat) => ({
    url: `${BASE_URL}/categories/${cat.id}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  return [...routes, ...toolRoutes, ...categoryRoutes];
}
