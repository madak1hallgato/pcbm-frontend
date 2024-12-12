import {Component, Input} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgForOf, NgIf, UpperCasePipe} from "@angular/common";
import {Part} from '../parts/model/part.model';
import {PartService} from '../services/part.service';
import {ActivatedRoute} from '@angular/router';
import {CategoryService} from '../services/category.service';
import {Category} from '../categories/model/category-model';

@Component({
  selector: 'app-part-details',
  imports: [
    ReactiveFormsModule,
    UpperCasePipe,
    FormsModule,
    NgIf,
    NgForOf
  ],
  templateUrl: './part-details.component.html',
  styleUrl: './part-details.component.css'
})
export class PartDetailsComponent {

  part : Part | undefined;
  categories: Category[] = [];

  constructor(
    private route: ActivatedRoute,
    private partService: PartService,
    private categoryService: CategoryService
  ) { }

  ngOnInit(){
    this.fetchCategories();
    this.fetchPart();
  }

  fetchCategories(): void {
    this.categoryService.getCategories().subscribe(categories => {
      this.categories = categories;
    });
  }

  fetchPart(){
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.partService.getPartById(id.toString()).subscribe({
      next: (part) => {
        this.part = part;
      },
      error: (err) => {
        if (err.status === 404) {
          this.part = {
            componentId: 0,
            name: "New Component",
            categoryName: "CPU",
            price: 0
          };
        }
      }
    });
  }

  updatePart(): void {
    if (!this.part) return;
    const updatedPart = {
      componentId: this.part.componentId == 0 ? null : this.part.componentId,
      name: this.part.name,
      category: this.categories.find(category => category.name === this.part?.categoryName),
      price: this.part.price
    };
    this.partService.updatePart(updatedPart).subscribe({
      next: (response) => {
        console.log('Component updated successfully:', response);
        alert('Component updated successfully!');
      },
      error: (err) => {
        console.error('Error updating Component:', err);
        alert('Failed to update Component!');
      }
    });
  }

}
