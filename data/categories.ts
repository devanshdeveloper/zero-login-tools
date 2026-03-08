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
    id: "converters",
    name: "Converters",
    description: "Units, colors, and data type conversions.",
    parentId: "utilities",
  },
];
