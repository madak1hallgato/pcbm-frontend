import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuildsDetailsComponent } from './builds-details.component';

describe('BuildsDetailsComponent', () => {
  let component: BuildsDetailsComponent;
  let fixture: ComponentFixture<BuildsDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuildsDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuildsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
