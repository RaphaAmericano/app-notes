import { TestBed } from '@angular/core/testing';

import { NotesValidatorsService } from './notes-validators.service';

describe('NotesValidatorsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NotesValidatorsService = TestBed.get(NotesValidatorsService);
    expect(service).toBeTruthy();
  });
});
