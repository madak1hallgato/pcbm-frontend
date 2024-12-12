import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuildAddComponent } from './build-add.component';

describe('BuildAddComponent', () => {
  let component: BuildAddComponent;
  let fixture: ComponentFixture<BuildAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuildAddComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuildAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
