import {Component} from '@angular/core';
import {Part} from './model/part.model';
import {FormsModule} from '@angular/forms';
import {PartService} from '../services/part.service';
import {CategoryService} from '../services/category.service';
import {RouterLink} from '@angular/router';
import {Category} from '../categories/model/category-model';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-parts',
  imports: [
    FormsModule,
    RouterLink,
    NgForOf
  ],
  templateUrl: './parts.component.html',
  styleUrl: './parts.component.css'
})
export class PartsComponent {

  parts: Part[] = [];
  filteredParts: Part[] = [];
  categories: Category[] = [];
  selectedCategoryId: string = '';

  constructor(
    private partService: PartService,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.fetchCategories();
    this.fetchParts();
  }

  fetchCategories(): void {
    this.categoryService.getCategories().subscribe(categories => {
      this.categories = categories;
    });
  }

  fetchParts(): void {
    this.partService.getParts().subscribe(parts => {
      this.parts = parts;
      this.filteredParts = this.parts;
    });
  }

  fetchFilteredParts(): void {
    this.partService.getPartsByCategory(this.selectedCategoryId).subscribe(filteredParts => {
      this.filteredParts = filteredParts;
    });
  }

  onCategoryChange(): void {
    if (this.selectedCategoryId !== '') {
      this.fetchFilteredParts()
    } else {
      this.filteredParts = this.parts;
    }
  }

  deletePart(partId: number): void {
    const confirmation = confirm('Are you sure you want to delete this component?');
    if (!confirmation) return;
    this.partService.deletePart(partId).subscribe({
      next: () => {
        console.log('Part deleted successfully');
        this.parts = this.parts.filter(part => part.componentId !== partId);
        this.filteredParts = this.filteredParts.filter(part => part.componentId !== partId);
        alert('Part deleted successfully!');
      },
      error: (err) => {
        console.error('Error deleting part:', err);
        alert('Failed to delete part! - Check this component is used by someone or not!');
      }
    });
  }

}
