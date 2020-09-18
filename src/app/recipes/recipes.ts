export interface IRecipe {
  id: number,
  name: string,
  ingredients: IRecipeIngredient[],
  directions: string,
  canMake: boolean
}

export interface IRecipeIngredient {
  ingredient: string,
  measurement: string,
  quantity: number
}