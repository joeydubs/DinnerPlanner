import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-ingredients',
  templateUrl: './ingredients.component.html',
  styleUrls: ['./ingredients.component.css']
})
export class IngredientsComponent implements OnInit {

  ingredientForm: FormGroup;
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               
  ingredients: { name: string, measurement: string, onHand: boolean, qty: number }[] = [
    { name: "Flour", measurement: "Pound", onHand: true, qty: 4 },
    { name: "Eggs", measurement: "Dozen", onHand: false, qty: 0 },
    { name: "Milk", measurement: "Gallon", onHand: true, qty: 1 }
  ];

  constructor() { }

  ngOnInit(): void {
  }

  newIngredient(): void {
    this.ingredientForm = this.generateForm();
  }

  generateForm(): FormGroup {
    return new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(2)]),
      measurement: new FormControl('', Validators.required),
      quantity: new FormControl('', [Validators.required, Validators.min(0)]),
    });
  }

  save(): void {
    this.ingredients.push(
      {
        name: this.ingredientForm.get("name").value,
        measurement: this.ingredientForm.get("measurement").value,
        onHand: this.ingredientForm.get("measurement").value > 0,
        qty: this.ingredientForm.get("quantity").value
      }
    );

    this.ingredientForm.reset();
  }

  cancel(): void {
    this.ingredientForm = null;
  }
}
