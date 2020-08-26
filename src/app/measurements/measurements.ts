export interface Measurement {
  name: string,
  abbreviation: string
}

export const MEASUREMENTS: Measurement[] = [
  { name: "Tablespoon", abbreviation: "tbsp" },
  { name: "Teaspoon", abbreviation: "tsp" },
  { name: "Cup", abbreviation: "cup" }
];