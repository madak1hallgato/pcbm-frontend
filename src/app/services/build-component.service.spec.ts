import { TestBed } from '@angular/core/testing';

import { BuildComponentService } from './build-component.service';

describe('BuildComponentService', () => {
  let service: BuildComponentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BuildComponentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
