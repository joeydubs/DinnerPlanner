import { Component, OnInit } from '@angular/core';
<<<<<<< HEAD
import { FormGroup, FormControl, Validators, ValidatorFn, AbstractControlOptions, AbstractControl } from '@angular/forms';
import { IIngredient } from './ingredients';
import { IMeasurement } from '../measurements/measurements';
=======
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { MEASUREMENTS } from '../measurements/measurements';
import { INGREDIENTS } from './ingredients'
>>>>>>> 0fa596cdba23c9901e5baed4b3d3546c95d32a60

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

<<<<<<< HEAD
  ingredients: IIngredient[];
  measurements: IMeasurement[];
=======
  ingredients= INGREDIENTS;
  measurements = MEASUREMENTS;
>>>>>>> 0fa596cdba23c9901e5baed4b3d3546c95d32a60

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
    let newIng: IIngredient = {
      id: null,
      name: this.ingredientForm.get("name").value,
      defaultMeasurement: this.ingredientForm.get("measurement").value,
    }

    this.ingredients.push(newIng);

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
