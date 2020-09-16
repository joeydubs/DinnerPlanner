import { Injectable } from '@angular/core';
<<<<<<< HEAD
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IMeasurement } from './measurements/measurements';
import { IConversion } from './conversions/conversions';
=======
>>>>>>> 0fa596cdba23c9901e5baed4b3d3546c95d32a60

@Injectable({
  providedIn: 'root'
})
export class PantryService {

<<<<<<< HEAD
  constructor(private http: HttpClient) { }

  getAllMeasurements(): Observable<IMeasurement[]> {
    return this.http.get<IMeasurement[]>("/api/getAllMeasurements");
  }

  getAllConversions(): Observable<IConversion[]> {
    return this.http.get<IConversion[]>("/api/getAllConversions");
  }
=======
  constructor() { }
>>>>>>> 0fa596cdba23c9901e5baed4b3d3546c95d32a60
}
