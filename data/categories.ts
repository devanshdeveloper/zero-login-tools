export interface Category {
  id: string;
  name: string;
  description: string;
  parentId?: string; // Support for nested categories
}

export const categories: Category[] = [
  // Root Categories
  {
    id: "developer",
    name: "Developer Tools",
    description: "Core utilities for software development.",
  },
  {
    id: "text",
    name: "Text & String",
    description: "Encoding, Decoding, Conversions",
  },
  {
    id: "cryptography",
    name: "Cryptography",
    description: "Generators, Hashing, Decoding",
  },
  {
    id: "media",
    name: "Media & Images",
    description: "Image Compression, Operations",
  },
  {
    id: "documents",
    name: "Documents",
    description: "PDF and document conversion tools.",
  },
  {
    id: "utilities",
    name: "System Utilities",
    description: "Unit conversions, colors, time",
  },

  // Subcategories
  {
    id: "web-dev",
    name: "Web Development",
    description: "JWTs, APIs, and Web tools.",
    parentId: "developer",
  },
  {
    id: "playground",
    name: "Playground",
    description: "Interactive sandboxes and testers.",
    parentId: "developer",
  },
  {
    id: "formatting",
    name: "Formatters",
    description: "JSON, HTML, and Markdown formatting.",
    parentId: "developer",
  },
  {
    id: "crypto-gen",
    name: "Generators",
    description: "Password and UUID generators.",
    parentId: "cryptography",
  },
  {
    id: "security",
    name: "Security",
    description: "Security utilities that run locally in your browser.",
    parentId: "cryptography",
  },
  {
    id: "image",
    name: "Image Tools",
    description: "Resizing, cropping, palettes, and more.",
    parentId: "media",
  },
  {
    id: "converters",
    name: "Converters",
    description: "Units, colors, and data type conversions.",
    parentId: "utilities",
  },
];
