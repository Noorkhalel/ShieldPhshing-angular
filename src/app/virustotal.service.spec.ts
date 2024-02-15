import { TestBed } from '@angular/core/testing';

import { VirustotalService } from './virustotal.service';

describe('VirustotalService', () => {
  let service: VirustotalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VirustotalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
