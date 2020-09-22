import { IIngredient } from '../ingredients/ingredients';
import { IMeasurement } from '../measurements/measurements';

export interface IRecipe {
  id: number,
  name: string,
  ingredients: IRecipeIngredient[],
  directions: string,
  canMake: boolean
}

export interface IRecipeIngredient {
  ingredient: IIngredient,
  measurement: IMeasurement,
  quantity: number
}