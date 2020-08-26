import { Ingredient, INGREDIENTS } from "../ingredients/ingredients";

export interface Recipie {
  name: string
  ingredients: {
      ingredient: string,
      quantity: number,
      measurement: string
  }[]
}

export const RECIPIES: Recipie[] = [
  { name: "Chili", ingredients: [{ ingredient: INGREDIENTS[0].name, quantity: 1, measurement: "Cup" }, { ingredient: INGREDIENTS[2].name, quantity: 1, measurement: "Ounce" }] },
  { name: "Pie", ingredients: [{ ingredient: INGREDIENTS[1].name, quantity: 1, measurement: "Teaspoon" }] },
  { name: "Bread", ingredients: [{ ingredient: INGREDIENTS[1].name, quantity: 1, measurement: "Tablespoon" }, { ingredient: INGREDIENTS[2].name, quantity: 1, measurement: "Cup" }] }
]