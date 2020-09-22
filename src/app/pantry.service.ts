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
    return this.http.get<IMeasurement[]>("https://ngpantry.duckdns.org/api/getAllMeasurements");
  }

  getAllConversions(): Observable<IConversion[]> {
    return this.http.get<IConversion[]>("https://ngpantry.duckdns.org/api/getAllConversions");
  }

  getAllIngredients(): Observable<IIngredient[]> {
    return this.http.get<IIngredient[]>("https://ngpantry.duckdns.org/api/getAllIngredients");
  }

  getAllRecipes(): Observable<IRecipe[]> {
    return this.http.get<IRecipe[]>("https://ngpantry.duckdns.org/api/getAllRecipes");
  }

  getRecipeIngredients(recipeId: number): Observable<IRecipeIngredient[]> {
    let options = { "params": { "recipeId": String(recipeId) } };
    return this.http.get<IRecipeIngredient[]>("https://ngpantry.duckdns.org/api/getRecipeIngredients", options);
  }

  saveMeasurement(newMeasurement: IMeasurement): Observable<IMeasurement> {
    let body = { "newMeasurement": newMeasurement };
    return this.http.post<IMeasurement>("https://ngpantry.duckdns.org/api/saveMeasurement", body);
  }

  saveConversion(newConversion: IConversion): Observable<IConversion> {
    let body = { "newConversion": newConversion };
    return this.http.post<IConversion>("https://ngpantry.duckdns.org/api/saveConversion", body);
  }

  saveIngredient(newIngredient: IIngredient): Observable<IIngredient> {
    let body = { "newIngredient": newIngredient };
    return this.http.post<IIngredient>("https://ngpantry.duckdns.org/api/saveIngredient", body);
  }

  saveRecipe(newRecipe: IRecipe): Observable<IRecipe> {
    let body = { "newRecipe": newRecipe };
    return this.http.post<IRecipe>("https://ngpantry.duckdns.org/api/saveRecipe", body);
  }
}
