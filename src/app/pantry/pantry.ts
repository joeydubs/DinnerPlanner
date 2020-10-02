import { IIngredient } from '../ingredients/ingredients'

export interface IPantryItem {
  ingredient: IIngredient,
  qoh: number
}