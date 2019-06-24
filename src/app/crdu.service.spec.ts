import { TestBed } from '@angular/core/testing';

import { CrduService } from './crdu.service';

describe('CrduService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CrduService = TestBed.get(CrduService);
    expect(service).toBeTruthy();
  });
});
