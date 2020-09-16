export interface IRecipie {
  id: number,
  name: string,
  ingredients: IRecipieIngredient[],
  directions: string,
  canMake: boolean
}

export interface IRecipieIngredient {
  ingredient: string,
  measurement: string,
  quantity: number
}