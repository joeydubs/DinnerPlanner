import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PantryComponent } from './pantry/pantry.component';
import { RecipiesComponent } from './recipies/recipies.component';
import { IngredientsComponent } from './ingredients/ingredients.component';
import { MeasurementsComponent } from './measurements/measurements.component';
import { ConversionsComponent } from './conversions/conversions.component';

@NgModule({
  declarations: [
    AppComponent,
    PantryComponent,
    RecipiesComponent,
    IngredientsComponent,
    MeasurementsComponent,
    ConversionsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
