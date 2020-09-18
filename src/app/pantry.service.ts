import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IMeasurement } from './measurements/measurements';
import { IConversion } from './conversions/conversions';
import { IIngredient } from './ingredients/ingredients';
import { IRecipe, IRecipeIngredient } from './recipes/recipes';

@Injectable({
  providedIn: 'root'
})
export class PantryService {

  constructor(private http: HttpClient) { }

  getAllMeasurements(): Observable<IMeasurement[]> {
    return this.http.get<IMeasurement[]>("http://ngpantry.duckdns.org/api/getAllMeasurements");
  }

  getAllConversions(): Observable<IConversion[]> {
    return this.http.get<IConversion[]>("http://ngpantry.duckdns.org/api/getAllConversions");
  }

  getAllIngredients(): Observable<IIngredient[]> {
    return this.http.get<IIngredient[]>("http://ngpantry.duckdns.org/api/getAllIngredients");
  }

  getAllRecipes(): Observable<IRecipe[]> {
    return this.http.get<IRecipe[]>("http://ngpantry.duckdns.org/api/getAllRecipes");
  }

  getRecipeIngredients(recipeId: number): Observable<IRecipeIngredient[]> {
    return this.http.get<IRecipeIngredient[]>("http://ngpantry.duckdns.org/api/getRecipeIngredient", { "params": { "recipeId": String(recipeId) } });
  }
}
