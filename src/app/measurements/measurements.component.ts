import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

export const measurements: { name: string, abbreviation: string }[] = [
  { name: "Tablespoon", abbreviation: "tbsp" },
  { name: "Teaspoon", abbreviation: "tsp" },
  { name: "Cup", abbreviation: "cup" }
];

@Component({
  selector: 'app-measurements',
  templateUrl: './measurements.component.html',
  styleUrls: ['./measurements.component.css']
})
export class MeasurementsComponent implements OnInit {

  measurementForm: FormGroup;

  measurements = measurements;

  constructor() { }

  ngOnInit(): void {
  }

  get name() { return this.measurementForm.get("name") };
  get abbreviation() { return this.measurementForm.get("abbreviation") };

  newMeasurement(): void {
    this.measurementForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(2)]),
      abbreviation: new FormControl('', [Validators.required, Validators.minLength(2)])
    })
  }

  save(): void {
    this.measurements.push({
      name: this.measurementForm.get("name").value,
      abbreviation: this.measurementForm.get("abbreviation").value
    });

    this.measurementForm.reset();
  }

  close(): void {
    this.measurementForm = null;
  }

}
