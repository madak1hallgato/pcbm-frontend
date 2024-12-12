import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {BuildsService} from '../services/builds.service';
import {Build} from '../builds/model/build.model';
import {PartService} from '../services/part.service';
import {Part} from '../parts/model/part.model';
import {User} from '../users/model/user.model';
import {UsersService} from '../services/users.service';
import {NgForOf, NgIf} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {BuildComponent} from '../builds-parts/model/builds-components.model';
import {BuildComponentService} from '../services/build-component.service';

@Component({
  selector: 'app-build-add',
  imports: [
    NgIf,
    NgForOf,
    FormsModule
  ],
  templateUrl: './build-add.component.html',
  styleUrl: './build-add.component.css'
})
export class BuildAddComponent {

  build : Build | undefined;
  user : User | undefined;

  CPUs: Part[] = [];
  GPUs: Part[] = [];
  RAMs: Part[] = [];

  selectedCpu: String | undefined;
  selectedGpu: String | undefined;
  selectedRam: String | undefined;

  buildComponents : BuildComponent[] = [];

  constructor(
    private route: ActivatedRoute,
    private buildsService: BuildsService,
    private usersService: UsersService,
    private partService: PartService,
    private buildComponentsService: BuildComponentService
  ) { }

  ngOnInit(){
    this.fetchUser();
    this.fetchBuild();
    this.fetchCpuParts();
    this.fetchGpuParts();
    this.fetchRamParts();
  }

  fetchUser(){
    const id = Number(this.route.snapshot.paramMap.get('uid'));
    this.usersService.getUserById(id.toString()).subscribe( user => {
      this.user = user
    });
  }

  fetchBuild(){
    const id = Number(this.route.snapshot.paramMap.get('bid'));
    this.buildsService.getBuildById(id.toString()).subscribe({
      next: (build) => {
        this.build = build;
        this.fetchBuildComponents();
      },
      error: (err) => {
        if (err.status === 404) {
          this.build = {
            buildId: 0,
            name: "",
            userUsername: ""
          };
        }
      }
    });
  }

  fetchCpuParts(): void {
    this.partService.getPartsByCategory(String(1)).subscribe(parts => {
      this.CPUs = parts;
      if (this.selectedCpu == undefined) this.selectedCpu = parts[0].name;
    });
  }
  fetchGpuParts(): void {
    this.partService.getPartsByCategory(String(2)).subscribe(parts => {
      this.GPUs = parts;
      if (this.selectedGpu == undefined) this.selectedGpu = parts[0].name;
    });
  }
  fetchRamParts(): void {
    this.partService.getPartsByCategory(String(3)).subscribe(parts => {
      this.RAMs = parts;
      if (this.selectedRam == undefined) this.selectedRam = parts[0].name;
    });
  }

  fetchBuildComponents(){
    const id = Number(this.route.snapshot.paramMap.get('bid'));
    this.buildComponentsService.getComponentsByBuildId(id.toString()).subscribe( components => {
        this.buildComponents = components;
        this.selectedCpu = this.buildComponents.find(buildComponent => buildComponent.componentCategory === "CPU" )?.componentName
        this.selectedGpu = this.buildComponents.find(buildComponent => buildComponent.componentCategory === "GPU" )?.componentName
        this.selectedRam = this.buildComponents.find(buildComponent => buildComponent.componentCategory === "RAM" )?.componentName
      });
  }

  updateBuild(): void {
    if (!this.build) return;

    const updatedBuild = {
      buildId: this.build.buildId == 0 ? null : this.build.buildId,
      name: this.build.name,
      user: this.user
    };

    this.buildsService.updateBuild(updatedBuild).subscribe({
      next: (response) => {
        this.updateComponents(response)
        console.log('Build updated successfully:', response);
        alert('Build updated successfully!');
      },
      error: (err) => {
        console.error('Error updating Build:', err);
        alert('Failed to update Build!');
      }
    });

  }

  updateComponents(response: Build): void {
    const updatedCpuBuildComponent = {
      buildId: response.buildId,
      componentCategory: "CPU",
      componentName: this.selectedCpu
    }
    const updatedGpuBuildComponent = {
      buildId: response.buildId,
      componentCategory: "GPU",
      componentName: this.selectedGpu
    }
    const updatedRamBuildComponent = {
      buildId: response.buildId,
      componentCategory: "RAM",
      componentName: this.selectedRam
    }

    this.buildComponentsService.updateBuildComponent(updatedCpuBuildComponent).subscribe({
      next: (response) => {
        console.log('CPU Build Component updated successfully:', response);
      },
      error: (err) => {
        console.log(updatedCpuBuildComponent)
        console.error('Error updating CPU Build Component:', err);
      }
    });

    this.buildComponentsService.updateBuildComponent(updatedGpuBuildComponent).subscribe({
      next: (response) => {
        console.log('GPU Build Component updated successfully:', response);
      },
      error: (err) => {
        console.error('Error updating GPU Build Component:', err);
      }
    });

    this.buildComponentsService.updateBuildComponent(updatedRamBuildComponent).subscribe({
      next: (response) => {
        console.log('RAM Build Component updated successfully:', response);
      },
      error: (err) => {
        console.error('Error updating RAM Build Component:', err);
      }
    });
  }

}
