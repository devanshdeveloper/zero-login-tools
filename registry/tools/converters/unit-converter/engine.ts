export type UnitCategory = "length" | "weight" | "temperature" | "data";

export interface Unit {
  id: string;
  name: string;
  category: UnitCategory;
  factor?: number; // Factor relative to base unit for linear scales
}

export const units: Unit[] = [
  // Length (Base: Meter)
  { id: "cm", name: "Centimeter", category: "length", factor: 0.01 },
  { id: "m", name: "Meter", category: "length", factor: 1 },
  { id: "km", name: "Kilometer", category: "length", factor: 1000 },
  { id: "in", name: "Inch", category: "length", factor: 0.0254 },
  { id: "ft", name: "Foot", category: "length", factor: 0.3048 },
  { id: "yd", name: "Yard", category: "length", factor: 0.9144 },
  { id: "mi", name: "Mile", category: "length", factor: 1609.344 },

  // Weight (Base: Kilogram)
  { id: "g", name: "Gram", category: "weight", factor: 0.001 },
  { id: "kg", name: "Kilogram", category: "weight", factor: 1 },
  { id: "oz", name: "Ounce", category: "weight", factor: 0.0283495 },
  { id: "lb", name: "Pound", category: "weight", factor: 0.453592 },

  // Data (Base: Byte)
  { id: "b", name: "Byte", category: "data", factor: 1 },
  { id: "kb", name: "Kilobyte", category: "data", factor: 1024 },
  { id: "mb", name: "Megabyte", category: "data", factor: 1048576 },
  { id: "gb", name: "Gigabyte", category: "data", factor: 1073741824 },
  { id: "tb", name: "Terabyte", category: "data", factor: 1099511627776 },

  // Temperature
  { id: "c", name: "Celsius", category: "temperature" },
  { id: "f", name: "Fahrenheit", category: "temperature" },
  { id: "k", name: "Kelvin", category: "temperature" },
];

export function convertUnit(
  value: number,
  fromId: string,
  toId: string,
): number {
  if (isNaN(value)) return 0;

  const from = units.find((u) => u.id === fromId);
  const to = units.find((u) => u.id === toId);

  if (!from || !to || from.category !== to.category) return value;
  if (from.id === to.id) return value;

  // Temperature (Non-linear)
  if (from.category === "temperature") {
    let celsius = value;
    if (from.id === "f") celsius = (value - 32) * (5 / 9);
    else if (from.id === "k") celsius = value - 273.15;

    if (to.id === "c") return celsius;
    if (to.id === "f") return celsius * (9 / 5) + 32;
    if (to.id === "k") return celsius + 273.15;
    return value;
  }

  // Linear conversions
  if (from.factor && to.factor) {
    const baseValue = value * from.factor;
    return baseValue / to.factor;
  }

  return value;
}
