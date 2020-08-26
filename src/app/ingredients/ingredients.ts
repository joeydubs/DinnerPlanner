export interface Ingredient {
  name: string,
  measurement: string,
  onHand: boolean,
  qty: number
}
export const INGREDIENTS: Ingredient[] = [
  { name: "Flour", measurement: "Pound", onHand: true, qty: 4 },
  { name: "Eggs", measurement: "Dozen", onHand: false, qty: 0 },
  { name: "Milk", measurement: "Gallon", onHand: true, qty: 1 }
];