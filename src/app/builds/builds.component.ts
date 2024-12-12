import { Component } from '@angular/core';
import {Build} from './model/build.model';
import {User} from '../users/model/user.model';
import {UsersService} from '../services/users.service';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {BuildsService} from '../services/builds.service';
import {NgForOf, NgIf} from '@angular/common';
import {BuildComponentService} from '../services/build-component.service';

@Component({
  selector: 'app-builds',
  imports: [
    NgIf,
    NgForOf,
    RouterLink
  ],
  templateUrl: './builds.component.html',
  styleUrl: './builds.component.css'
})
export class BuildsComponent {

  user: User | undefined;
  builds: Build[] = [];

  constructor(
    private route: ActivatedRoute,
    private usersService: UsersService,
    private buildsService: BuildsService,
    private buildComponentService: BuildComponentService
  ) {}

  ngOnInit(): void {
    this.fetchUser();
    this.fetchBuilds();
  }

  fetchUser(){
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.usersService.getUserById(id.toString()).subscribe( user => {
      this.user = user
    });
  }

  fetchBuilds(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.buildsService.getBuildsById(id.toString()).subscribe(builds => {
      this.builds = builds;
    });
  }

  onDeleteBuild(event: Event, buildId: number): void {
    event.stopPropagation();
    const confirmation = confirm('Are you sure you want to delete this Build?');
    if (!confirmation) return;
    this.deleteComponents(buildId)
    this.buildsService.deleteBuild(buildId).subscribe({
      next: () => {
        console.log('Build deleted successfully');
        this.builds = this.builds.filter(build => build.buildId !== buildId);
        alert('Part deleted successfully!');
      },
      error: (err) => {
        console.error('Error deleting part:', err);
        alert('Failed to delete part!');
      }
    });
  }

  deleteComponents(buildId: number): void {
    this.buildComponentService.deleteBuildComponentByBuildId(buildId).subscribe({
      next: () => {
        console.log('Build Components deleted successfully');
      },
      error: (err) => {
        console.error('Error deleting Build Components:', err);
      }
    });
  }

}
