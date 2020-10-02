import { Component, OnInit } from '@angular/core';
import { PantryService } from '../pantry.service';

import { IPantryItem } from './pantry'
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-pantry',
  templateUrl: './pantry.component.html',
  styleUrls: ['./pantry.component.css']
})
export class PantryComponent implements OnInit {

  pantry: IPantryItem[] = []

  isCollapsed = true;

  constructor(private pantryService: PantryService) { }

  ngOnInit(): void {
    this.pantryService.getAllPantryItems().subscribe(
      (pantry) => {
        this.pantry = pantry;

        console.log(this.pantry)
      },
      (error) => {
        console.log(error);
      }
    )
  }
}
