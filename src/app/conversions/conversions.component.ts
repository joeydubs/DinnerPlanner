import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl, ValidatorFn } from '@angular/forms';

import { MEASUREMENTS } from '../measurements/measurements';

@Component({
  selector: 'app-conversions',
  templateUrl: './conversions.component.html',
  styleUrls: ['./conversions.component.css']
})
export class ConversionsComponent implements OnInit {

  conversions = [
    { fromQty: 3, fromName: "Teaspoon", toQty: 1, toName: "Tablespoon" },
    { fromQty: 48, fromName: "Teaspoon", toQty: 1, toName: "Cup" },
    { fromQty: 16, fromName: "Tablespoon", toQty: 1, toName: "Cup" }
  ];

  measurements = MEASUREMENTS;

  conversionForm = new FormGroup({
    fromQty: new FormControl("0", [Validators.required, Validators.min(0)]),
    fromName: new FormControl("", [Validators.required]),
    toQty: new FormControl("0", [Validators.required, Validators.min(0)]),
    toName: new FormControl("", [Validators.required])
  });

  showConversionForm = false;

  constructor() { }

  ngOnInit(): void {
  }

  get fromQty() { return this.conversionForm.get("fromQty") }
  get fromName() { return this.conversionForm.get("fromName") }
  get toQty() { return this.conversionForm.get("toQty") }
  get toName() { return this.conversionForm.get("toName") }

  minValueValidator(min: number): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const forbidden = control.value < min;
      return forbidden ? { minValue: { value: control.value } } : null;
    }
  }

  newConversion(): void {
    this.showConversionForm = true;
  }

  save(): void {
    this.conversions.push({
      fromQty: this.conversionForm.get("fromQty").value,
      fromName: this.conversionForm.get("fromName").value,
      toQty: this.conversionForm.get("toQty").value,
      toName: this.conversionForm.get("toName").value
    })

    this.conversionForm.reset({
      fromQty: "0",
      fromName: "",
      toQty: "0",
      toName: ""
    })
  }

  close(): void {
    this.showConversionForm = false;
  }
}
