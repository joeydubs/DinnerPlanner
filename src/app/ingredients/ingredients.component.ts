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
  });

  showIngredientForm = false;
  showSaveError = false;

  saveError: {};

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

    this.pantryService.getAllMeasurements().subscribe(
      (measurements) => {
        this.measurements = measurements;
      },
      (error) => {
        console.log(error);
      }
    )
  }

  get name() { return this.ingredientForm.get("name") };
  get measurement() { return this.ingredientForm.get("measurement") };

  newIngredient(): void {
    this.showIngredientForm = true;
  }

  save(): void {
    let newIngredient: IIngredient = {
      id: null,
      name: this.ingredientForm.get("name").value,
      defaultMeasurement: this.ingredientForm.get("measurement").value,
    }

    this.pantryService.saveIngredient(newIngredient).subscribe(
      (ingredient) => {
        this.showSaveError = false;
        
        this.ingredients.push(ingredient);

        this.ingredientForm.reset({
          name: '',
          measurement: '',
        });
      },
      (error) => {
        console.log(error);
        this.saveError = error;
        this.showSaveError = true;
      }
    )
  }

  cancel(): void {
    this.showIngredientForm = false;
  }
}
