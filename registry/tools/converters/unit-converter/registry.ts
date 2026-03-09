import { RegistryTool } from "@/registry/types";
import dynamic from "next/dynamic";

const UnitConverter = dynamic(() =>
  import("./components/UnitConverter").then(
    (mod) => mod.UnitConverter
  )
);

export const tool: RegistryTool = {
  slug: "unit-converter",
  name: "Unit Converter",
  description: "Convert length, weight, and temperature metrics.",
  category: "converters",
  keywords: ["unit converter","measurements"],
  component: UnitConverter,
  relatedTools: ["color-converter"],
  icon: "scale",
  seo: {
  "title": "Unit Converter | ZeroLoginTools",
  "description": "Quickly convert between different units of length, weight, and temperature.",
  "keywords": [
    "metric to imperial",
    "convert units"
  ]
},
  contentBlocks: undefined,
  flags: {
    supports_batch: false,
    supports_chain: false,
    cli_supported: false,
    benchmark_available: false,
    embeddable: false,
  },
};
