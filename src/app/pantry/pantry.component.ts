import { Component, OnInit } from '@angular/core';
import { PantryService } from '../pantry.service';

import { IPantryItem } from './pantry'
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IIngredient } from '../ingredients/ingredients';
import { IMeasurement } from '../measurements/measurements';

@Component({
  selector: 'app-pantry',
  templateUrl: './pantry.component.html',
  styleUrls: ['./pantry.component.css']
})
export class PantryComponent implements OnInit {

  pantry: IPantryItem[] = []
  ingredients: IIngredient[] = [];
  measurements: IMeasurement[] = [];

  pantryForm = new FormGroup({
    ingredient: new FormControl("", Validators.required),
    quantity: new FormControl("0", [Validators.required, Validators.min(0)]),
    measurement: new FormControl("", Validators.required)
  })

  isCollapsed = true;
  showSaveError = false;

  saveError: {};

  constructor(private pantryService: PantryService) { }

  ngOnInit(): void {
    this.pantryService.getAllPantryItems().subscribe(
      (pantry) => {
        this.pantry = pantry;
        console.log(pantry);
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

  get ingredient() { return this.pantryForm.get("ingredient"); }
  get quantity() { return this.pantryForm.get("quantity"); }
  get measurement() { return this.pantryForm.get("measurement"); }

  save() {

  }

  close() {
    this.pantryForm.reset({
      ingredient: "",
      quantity: "0",
      measurement: ""
    });

    this.isCollapsed = true;
  }
}
