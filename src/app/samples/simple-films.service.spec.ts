import { TestBed, inject } from '@angular/core/testing';

import { SimpleFilmsService } from './simplefilms/simple-films.service';

describe('SimpleFilmsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SimpleFilmsService]
    });
  });

  it('should be created', inject([SimpleFilmsService], (service: SimpleFilmsService) => {
    expect(service).toBeTruthy();
  }));
});
