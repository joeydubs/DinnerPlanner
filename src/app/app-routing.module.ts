import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IngredientsComponent } from './ingredients/ingredients.component';
import { PantryComponent } from './pantry/pantry.component';
import { RecipiesComponent } from './recipies/recipies.component';
import { MeasurementsComponent } from './measurements/measurements.component';
import { ConversionsComponent } from './conversions/conversions.component';

const routes: Routes = [
  { path: 'pantry', component: PantryComponent },
  { path: 'manageRecipies', component: RecipiesComponent },
  { path: 'manageIngredients', component: IngredientsComponent },
  { path: 'manageMeasurements', component: MeasurementsComponent },
  { path: 'manageConversions', component: ConversionsComponent },
  { path: '**', component: PantryComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
