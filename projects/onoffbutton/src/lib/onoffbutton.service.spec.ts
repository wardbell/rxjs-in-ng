import { TestBed, inject } from '@angular/core/testing';

import { OnoffbuttonService } from './onoffbutton.service';

describe('OnoffbuttonService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OnoffbuttonService]
    });
  });

  it('should be created', inject([OnoffbuttonService], (service: OnoffbuttonService) => {
    expect(service).toBeTruthy();
  }));
});
