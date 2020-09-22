import { IMeasurement } from '../measurements/measurements';

export interface IIngredient {
  id: number,
  name: string,
  defaultMeasurement: IMeasurement,
}