import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidatorFn, AbstractControlOptions, AbstractControl } from '@angular/forms';
import { measurements } from '../measurements/measurements.component';

@Component({
  selector: 'app-ingredients',
  templateUrl: './ingredients.component.html',
  styleUrls: ['./ingredients.component.css']
})
export class IngredientsComponent implements OnInit {

  ingredientForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(2)]),
    measurement: new FormControl('', [Validators.required]),
    quantity: new FormControl('0', [Validators.required, this.minValueValidator(0)]),
  });

  showIngredientForm = false;

  ingredients: { name: string, measurement: string, onHand: boolean, qty: number }[] = [
    { name: "Flour", measurement: "Pound", onHand: true, qty: 4 },
    { name: "Eggs", measurement: "Dozen", onHand: false, qty: 0 },
    { name: "Milk", measurement: "Gallon", onHand: true, qty: 1 }
  ];

  measurements = measurements;

  constructor() { }

  ngOnInit(): void {
  }

  get name() { return this.ingredientForm.get("name") };
  get measurement() { return this.ingredientForm.get("measurement") };
  get quantity() { return this.ingredientForm.get("quantity") };

  minValueValidator(min: number): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null => {
      const forbidden = control.value < min;
      return forbidden ? {minValue: {value: control.value}} : null;
    }
  }

  newIngredient(): void {
    this.showIngredientForm = true;
  }

  save(): void {
    this.ingredients.push(
      {
        name: this.ingredientForm.get("name").value,
        measurement: this.ingredientForm.get("measurement").value,
        onHand: this.ingredientForm.get("quantity").value > 0,
        qty: this.ingredientForm.get("quantity").value
      }
    );

    this.ingredientForm.reset({
      name: '',
      measurement: '',
      quantity: '0',
    });
  }

  cancel(): void {
    this.showIngredientForm = false;
  }
}
