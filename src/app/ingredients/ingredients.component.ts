import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidatorFn, AbstractControlOptions, AbstractControl } from '@angular/forms';

import { IIngredient } from './ingredients';
import { IMeasurement } from '../measurements/measurements';
import { PantryService } from '../pantry.service';

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

  ingredients: IIngredient[] = [];
  measurements: IMeasurement[] = [];

  constructor(private pantryService: PantryService) { }

  ngOnInit(): void {
    this.pantryService.getAllIngredients().subscribe(
      (response) => {
        this.ingredients = response;
      },
      (error) => {
        console.log(error);
      }
    )
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
