import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { MEASUREMENTS } from '../measurements/measurements';
import { INGREDIENTS } from './ingredients'

@Component({
  selector: 'app-ingredients',
  templateUrl: './ingredients.component.html',
  styleUrls: ['./ingredients.component.css']
})
export class IngredientsComponent implements OnInit {

  ingredientForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(2)]),
    measurement: new FormControl('', [Validators.required]),
    quantity: new FormControl('0', [Validators.required, Validators.min(0)]),
  });

  showIngredientForm = false;

  ingredients= INGREDIENTS;
  measurements = MEASUREMENTS;

  constructor() { }

  ngOnInit(): void {
  }

  get name() { return this.ingredientForm.get("name") };
  get measurement() { return this.ingredientForm.get("measurement") };
  get quantity() { return this.ingredientForm.get("quantity") };

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
