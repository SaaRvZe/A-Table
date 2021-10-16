import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PropertiesService {

  constructor(private httpClient: HttpClient) { }

  getProperties(): Observable<any>{
    return this.httpClient.get("assets/mock-data/properties.json");
  }
}
