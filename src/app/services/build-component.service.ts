import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {BuildComponent} from '../builds-parts/model/builds-components.model';

@Injectable({
  providedIn: 'root'
})
export class BuildComponentService {

  private buildComponentUrl = 'api/builds_components';

  constructor(private http: HttpClient) { }

  getComponentsByBuildId(id: string): Observable<BuildComponent[]> {
    return this.http.get<BuildComponent[]>(this.buildComponentUrl + "/build/" + id);
  }

  updateBuildComponent(buildComponent: any): Observable<BuildComponent> {
    return this.http.post<BuildComponent>(this.buildComponentUrl, buildComponent);
  }

  deleteBuildComponentByBuildId(id: number): Observable<void> {
    return this.http.delete<void>(this.buildComponentUrl + "/build/" + id);
  }

}
