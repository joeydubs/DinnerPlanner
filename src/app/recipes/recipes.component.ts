import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { PantryService } from '../pantry.service';

import { IRecipe, IRecipeIngredient } from './recipes'
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
    ]),
    directions: new FormControl('', [Validators.required])
  });

  showRecipeForm = false;
  showSaveError = false;

  saveError: {};

  constructor(private pantryService: PantryService) { }

  get name() { return this.recipeForm.get("name") };
  get ingredientList(): FormArray { return this.recipeForm.get("ingredientList") as FormArray };
  get directions() { return this.recipeForm.get("directions") };
  quantity(i: number) { return this.ingredientList.controls[i].get("quantity") };
  measurement(i: number) { return this.ingredientList.controls[i].get("measurement") };
  ingredient(i: number) { return this.ingredientList.controls[i].get("ingredient") };

  ngOnInit(): void {
    this.pantryService.getAllRecipes().subscribe(
      (allRecipes) => {
        this.recipes = allRecipes;

        for (const recipe of allRecipes) {
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
    );

    this.pantryService.getAllIngredients().subscribe(
      (ingredients) => {
        this.ingredients = ingredients;
      },
      (error) => {
        console.log(error);
      }
    );

    this.pantryService.getAllMeasurements().subscribe(
      (measurements) => {
        this.measurements = measurements;
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
    let recipeIngredients: IRecipeIngredient[] = []

    for (let group in this.ingredientList.controls) {
      let formGroup = this.ingredientList.controls[group];
      recipeIngredients.push({
        ingredient: formGroup.get("ingredient").value,
        measurement: formGroup.get("measurement").value,
        quantity: formGroup.get("quantity").value
      })
    }

    let newRecipe: IRecipe = {
      id: null,
      name: this.recipeForm.get("name").value,
      ingredients: recipeIngredients,
      directions: this.recipeForm.get("directions").value,
      canMake: true
    }

    this.pantryService.saveRecipe(newRecipe).subscribe(
      (recipe) => {
        this.showSaveError = false;

        this.recipes.push(recipe);

        this.clearForm();
      },
      (error) => {
        console.log(error);
        this.saveError = error;
        this.showSaveError = true;
      }
    )
  }

  close(): void {
    this.showRecipeForm = false;
  }

  clearForm(): void {
    this.ingredientList.clear();

    this.ingredientList.push(
      new FormGroup({
        ingredient: new FormControl('', [Validators.required]),
        measurement: new FormControl('', [Validators.required]),
        quantity: new FormControl('0', [Validators.required, Validators.min(0)])
      })
    );

    this.recipeForm.reset({
      name: '',
      ingredientList: [
        {
          ingredient: '',
          measurement: '',
          quantity: '0'
        }
      ],
      directions: ''
    });

    this.saveError = null;
    this.showSaveError = false;
  }

  printRecipe(recipe: IRecipe): string {
    let recipeString = "";
    let index = 1

    if (!recipe.ingredients || recipe.ingredients.length === 0) {
      return "";
    }
    else {
      for (let ingredient of recipe.ingredients) {
        recipeString += ingredient.quantity + " " + ingredient.measurement.name + " " + ingredient.ingredient.name;

        if (index < recipe.ingredients.length) {
          recipeString += ", ";
        }

        index++;
      }

      return recipeString;
    }
  }
}
