import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuildsPartsComponent } from './builds-parts.component';

describe('BuildsPartsComponent', () => {
  let component: BuildsPartsComponent;
  let fixture: ComponentFixture<BuildsPartsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuildsPartsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuildsPartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
