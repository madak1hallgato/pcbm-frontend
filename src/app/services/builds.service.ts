import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Build} from '../builds/model/build.model';

@Injectable({
  providedIn: 'root'
})
export class BuildsService {

  private buildsUrl = 'api/builds';

  constructor(private http: HttpClient) { }

  getBuildsById(id: string): Observable<Build[]> {
    return this.http.get<Build[]>(this.buildsUrl + "/user/" + id);
  }

  getBuildById(id: string): Observable<Build> {
    return this.http.get<Build>(this.buildsUrl + "/id/" + id);
  }

  updateBuild(build: any): Observable<Build> {
    return this.http.post<Build>(this.buildsUrl, build);
  }

  deleteBuild(buildId: number): Observable<void> {
    return this.http.delete<void>(this.buildsUrl + "/build/" + buildId);
  }

}
