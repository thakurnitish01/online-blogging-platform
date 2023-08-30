import { TestBed } from '@angular/core/testing';

import { FechApiService } from './fech-api.service';

describe('FechApiService', () => {
  let service: FechApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FechApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
