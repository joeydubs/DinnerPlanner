import { IMeasurement } from '../measurements/measurements';
import { IIngredient } from '../ingredients/ingredients';

export interface IConversion {
  ingredient: IIngredient,
  isGeneric: boolean,
  measOne: IMeasurement,
  measOneQty: number,
  measTwo: IMeasurement,
  measTwoQty: number
}