import { RegistryTool } from "@/registry/types";
import dynamic from "next/dynamic";

const ColorGradientGenerator = dynamic(() =>
  import("./components/ColorGradientGenerator").then(
    (mod) => mod.ColorGradientGenerator
  )
);

export const tool: RegistryTool = {
  slug: "color-gradient-generator",
  name: "Color Gradient Generator",
  description: "Generate a linear-gradient CSS string and color stops between two colors.",
  category: "playground",
  keywords: ["gradient generator","linear gradient","css gradient"],
  component: ColorGradientGenerator,
  relatedTools: ["color-picker","color-converter","palette-generator"],
  icon: "palette",
  seo: {
  "title": "CSS Gradient Generator – Linear Gradient | ZeroLoginTools",
  "description": "Generate linear-gradient CSS and a set of interpolated color stops between two HEX colors. Client-side.",
  "keywords": [
    "css gradient generator",
    "linear gradient",
    "color stops"
  ]
},
  contentBlocks: {
  "intro": {
    "title": "Linear Gradient Generator",
    "description": "Pick start/end colors, choose steps and angle, and copy a production-ready CSS linear-gradient string."
  },
  "instructions": {
    "steps": [
      "Pick start and end colors.",
      "Set step count and angle.",
      "Copy the generated CSS or use the stop palette."
    ]
  },
  "howToUse": {
    "content": "Pick colors and copy the CSS. Use the generated stops for design systems or charts."
  },
  "howItWorks": {
    "content": "The tool interpolates RGB values between two HEX colors and builds a CSS gradient string."
  },
  "security": {
    "description": "No uploads. Computation happens locally."
  },
  "faq": {
    "faqs": [
      {
        "question": "Is interpolation perceptual?",
        "answer": "This version interpolates in RGB space for simplicity. For perceptual gradients, consider HSL/LAB interpolation."
      },
      {
        "question": "How many stops can I generate?",
        "answer": "Up to 50 stops to keep the UI responsive."
      }
    ]
  },
  "features": {
    "features": [
      "CSS linear-gradient",
      "Stop palette",
      "Copy CSS"
    ]
  }
},
  flags: {
    supports_batch: false,
    supports_chain: false,
    cli_supported: false,
    benchmark_available: false,
    embeddable: false,
  },
};
