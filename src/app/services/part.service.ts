import { Injectable } from '@angular/core';
import {Part} from '../parts/model/part.model';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PartService {

  private partsUrl = 'api/components';

  constructor(private http: HttpClient) { }

  getParts(): Observable<Part[]> {
    return this.http.get<Part[]>(this.partsUrl);
  }

  getPartById(id: string): Observable<Part> {
    return this.http.get<Part>(this.partsUrl + "/id/" + id);
  }

  getPartsByCategory(categoryId: string): Observable<Part[]> {
    return this.http.get<Part[]>(this.partsUrl + "/category/" + categoryId);
  }

  updatePart(part: any): Observable<Part> {
    return this.http.post<Part>(this.partsUrl, part);
  }

  deletePart(partId: number): Observable<void> {
    return this.http.delete<void>(this.partsUrl + "/id/" + partId);
  }

}
