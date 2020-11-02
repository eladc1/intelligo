import { TestBed } from '@angular/core/testing';

import { FormSelectionService } from './form-selection.service';

describe('FormSelectionService', () => {
  let service: FormSelectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormSelectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
