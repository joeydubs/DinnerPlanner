import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { PantryService } from '../pantry.service';

import { IMeasurement } from '../measurements/measurements';
import { IConversion } from './conversions';

@Component({
  selector: 'app-conversions',
  templateUrl: './conversions.component.html',
  styleUrls: ['./conversions.component.css']
})
export class ConversionsComponent implements OnInit {

  conversions: IConversion[] = [];
  measurements: IMeasurement[] = [];

  conversionForm = new FormGroup({
    fromQty: new FormControl("0", [Validators.required, Validators.min(0)]),
    fromName: new FormControl("", [Validators.required]),
    toQty: new FormControl("0", [Validators.required, Validators.min(0)]),
    toName: new FormControl("", [Validators.required])
  });

  showConversionForm = false;
  showSaveError = false;

  saveError: {};

  constructor(private pantryService: PantryService) { }

  ngOnInit(): void {
    this.pantryService.getAllConversions().subscribe(
      (response) => {
        this.conversions = response;
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

  get fromQty() { return this.conversionForm.get("fromQty") }
  get fromName() { return this.conversionForm.get("fromName") }
  get toQty() { return this.conversionForm.get("toQty") }
  get toName() { return this.conversionForm.get("toName") }

  newConversion(): void {
    this.showConversionForm = true;
  }

  save(): void {
    let newConversion: IConversion = {
      ingredient: {
        id: 1,
        name: "Generic",
        defaultMeasurement: null
      },
      isGeneric: true,
      measOneQty: this.conversionForm.get("fromQty").value,
      measOne: this.conversionForm.get("fromName").value,
      measTwoQty: this.conversionForm.get("toQty").value,
      measTwo: this.conversionForm.get("toName").value
    }

    this.pantryService.saveConversion(newConversion).subscribe(
      (conversion) => {
        this.showSaveError = false;

        this.conversions.push(conversion);

        this.conversionForm.reset({
          fromQty: "0",
          fromName: "",
          toQty: "0",
          toName: ""
        })
      },
      (error) => {
        console.log(error);
        this.saveError = error;
        this.showSaveError = true;
      }
    )
  }

  close(): void {
    this.showConversionForm = false;
  }
}
