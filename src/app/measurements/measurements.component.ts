import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PantryService } from '../pantry.service'

import { IMeasurement } from './measurements';

@Component({
  selector: 'app-measurements',
  templateUrl: './measurements.component.html',
  styleUrls: ['./measurements.component.css']
})
export class MeasurementsComponent implements OnInit {

  measurementForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(2)]),
    abbreviation: new FormControl('')
  })

  isCollapsed = true;
  showSaveError = false;

  saveError: {};

  measurements: IMeasurement[] = [];

  constructor(private pantryService: PantryService) { }

  ngOnInit(): void {
    this.pantryService.getAllMeasurements().subscribe(
      (response) => {
        this.measurements = response;
      },
      (error) => {
        console.log(error);
      }
    )
  }

  get name() { return this.measurementForm.get("name") };
  get abbreviation() { return this.measurementForm.get("abbreviation") };

  save(): void {
    let newMeasurement: IMeasurement = {
      id: null,
      name: this.measurementForm.get("name").value,
      abbr: this.measurementForm.get("abbreviation").value
    }

    this.pantryService.saveMeasurement(newMeasurement).subscribe(
      (measurement) => {
        this.measurements.push(measurement);

        this.showSaveError = false;

        this.measurementForm.reset({
          name: "",
          abbreviation: ""
        });
      },
      (error) => {
        this.saveError = error;
        this.showSaveError = true;
      }
    );
  }

  close(): void {
    this.measurementForm.reset({
      name: "",
      abbreviation: ""
    });

    this.isCollapsed = true;
  }

}
