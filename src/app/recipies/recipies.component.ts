import { Component, OnInit } from '@angular/core';

import { Recipie, RECIPIES } from './recipies'
import { INGREDIENTS } from '../ingredients/ingredients'
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { MEASUREMENTS } from '../measurements/measurements';

@Component({
  selector: 'app-recipies',
  templateUrl: './recipies.component.html',
  styleUrls: ['./recipies.component.css']
})
export class RecipiesComponent implements OnInit {

  recipies = RECIPIES;
  ingredients = INGREDIENTS;
  measurements = MEASUREMENTS;

  recipieForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(2)]),
    ingredientList: new FormArray([
      new FormGroup({
        ingredient: new FormControl('', [Validators.required]),
        measurement: new FormControl('', [Validators.required]),
        quantity: new FormControl('0', [Validators.required, Validators.min(0)])
      })
    ])
  });

  showRecipieForm = false;

  constructor() { }

  get ingredientList(): FormArray {
    return this.recipieForm.get("ingredientList") as FormArray;
  }

  ngOnInit(): void {
  }

  newRecipie(): void {
    this.showRecipieForm = true;
  }

  addIngredient(): void {
    this.ingredientList.push(
      new FormGroup({
        ingredient: new FormControl('', [Validators.required]),
        measurement: new FormControl('', [Validators.required]),
        quantity: new FormControl('0', [Validators.required, Validators.min(0)])
      })
    )
  }

  save(): void {
    let ingredients: { ingredient: string, quantity: number, measurement: string }[] = []
    console.log(this.ingredientList.controls);
    for (let group in this.ingredientList.controls) {
      console.log(group);
      let formGroup = this.ingredientList.controls[group];
      console.log(formGroup);
      ingredients.push({
        ingredient: formGroup.get("ingredient").value,
        measurement: formGroup.get("measurement").value,
        quantity: formGroup.get("quantity").value
      })
    }

    RECIPIES.push({
      name: this.recipieForm.get("name").value,
      ingredients: ingredients
    })

    this.recipieForm.reset({
      name: '',
      ingredientList: [
        {
          ingredient: '',
          quantity: '0'
        }
      ]
    })
  }

  close(): void {
    this.showRecipieForm = false;
  }

  clear(): void {
    this.ingredientList.clear();
    this.ingredientList.push(
      new FormGroup({
        ingredient: new FormControl('', [Validators.required]),
        measurement: new FormControl('', [Validators.required]),
        quantity: new FormControl('0', [Validators.required, Validators.min(0)])
      })
    )
    this.recipieForm.reset({
      name: '',
      ingredientList: [
        {
          ingredient: '',
          measurement: '',
          quantity: '0'
        }
      ]
    })
  }

  printRecipie(recipie: Recipie): string {
    let recipieString = "";
    let index = 1

    for (let ingredient of recipie.ingredients) {
      recipieString += ingredient.quantity + " " + ingredient.measurement + " " + ingredient.ingredient;

      if (index < recipie.ingredients.length) {
        recipieString += ", ";
      }

      index ++;
    }

    return recipieString;
  }

}
