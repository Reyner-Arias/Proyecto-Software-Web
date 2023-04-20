import { TestBed } from '@angular/core/testing';

import { VideogameTagService } from './videogame-tag.service';

describe('VideogameTagService', () => {
  let service: VideogameTagService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VideogameTagService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
