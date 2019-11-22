import { TestBed } from '@angular/core/testing';

import { NoteHttpService } from './note-http.service';

describe('NoteHttpService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NoteHttpService = TestBed.get(NoteHttpService);
    expect(service).toBeTruthy();
  });
});
