import { Component } from '@angular/core';
import {Build} from '../builds/model/build.model';
import {User} from '../users/model/user.model';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {BuildsService} from '../services/builds.service';
import {UsersService} from '../services/users.service';
import {BuildComponentService} from '../services/build-component.service';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-builds-details',
  imports: [
    NgIf,
    RouterLink
  ],
  templateUrl: './builds-details.component.html',
  styleUrl: './builds-details.component.css'
})
export class BuildsDetailsComponent {

  buildId : number | undefined;
  user : User | undefined;

  cpu: String | undefined = "";
  gpu: String | undefined = "";
  ram: String | undefined = "";

  constructor(
    private route: ActivatedRoute,
    private buildsService: BuildsService,
    private usersService: UsersService,
    private buildComponentsService: BuildComponentService
  ) { }

  ngOnInit(){
    this.fetchUser();
    this.fetchBuildComponents()
  }

  fetchUser(){
    const id = Number(this.route.snapshot.paramMap.get('uid'));
    this.usersService.getUserById(id.toString()).subscribe( user => {
      this.user = user
    });
  }

  fetchBuildComponents(){
    this.buildId = Number(this.route.snapshot.paramMap.get('bid'));
    this.buildComponentsService.getComponentsByBuildId(this.buildId.toString()).subscribe( components => {
      this.cpu = components.find(buildComponent => buildComponent.componentCategory === "CPU" )?.componentName
      this.gpu = components.find(buildComponent => buildComponent.componentCategory === "GPU" )?.componentName
      this.ram = components.find(buildComponent => buildComponent.componentCategory === "RAM" )?.componentName
    });
  }

}
