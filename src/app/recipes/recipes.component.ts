import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { PantryService } from '../pantry.service';

import { IRecipe } from './recipes'
import { IIngredient } from '../ingredients/ingredients'
import { IMeasurement } from '../measurements/measurements';


@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {

  recipes: IRecipe[] = [];
  ingredients: IIngredient[] = [];
  measurements: IMeasurement[] = [];

  recipeForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(2)]),
    ingredientList: new FormArray([
      new FormGroup({
        ingredient: new FormControl('', [Validators.required]),
        measurement: new FormControl('', [Validators.required]),
        quantity: new FormControl('0', [Validators.required, Validators.min(0)])
      })
    ])
  });

  showRecipeForm = false;

  constructor(private pantryService: PantryService) { }

  get name() { return this.recipeForm.get("name") };
  get ingredientList(): FormArray { return this.recipeForm.get("ingredientList") as FormArray };
  quantity(i: number) { return this.ingredientList.controls[i].get("quantity") }
  measurement(i: number) { return this.ingredientList.controls[i].get("measurement") }
  ingredient(i: number) { return this.ingredientList.controls[i].get("ingredient") }

  ngOnInit(): void {
    console.log("Initializing Recipes Component...")
    this.pantryService.getAllRecipes().subscribe(
      (allRecipes) => {
        console.log(allRecipes);
        this.recipes = allRecipes;

        for (const recipe of this.recipes) {
          this.pantryService.getRecipeIngredients(recipe.id).subscribe(
            (recipeIngredients) => {
              recipe.ingredients = recipeIngredients;
            },
            (error) => {
              console.log(error);
            }
          )
        }
      },
      (error) => {
        console.log(error);
      }
    )
  }

  newRecipe(): void {
    this.showRecipeForm = true;
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

    // this.recipes.push({
    //   name: this.recipeForm.get("name").value,
    //   ingredients: ingredients
    // });

    this.clear();
  }

  close(): void {
    this.showRecipeForm = false;
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
    this.recipeForm.reset({
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

  printRecipe(recipe: IRecipe): string {
    let recipeString = "";
    let index = 1

    for (let ingredient of recipe.ingredients) {
      recipeString += ingredient.quantity + " " + ingredient.measurement + " " + ingredient.ingredient;

      if (index < recipe.ingredients.length) {
        recipeString += ", ";
      }

      index ++;
    }

    return recipeString;
  }

}
