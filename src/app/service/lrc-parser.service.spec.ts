import { TestBed, inject } from '@angular/core/testing';

import { LrcParserService } from './lrc-parser.service';

describe('LrcParserService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LrcParserService]
    });
  });

  it('should be created', inject([LrcParserService], (service: LrcParserService) => {
    expect(service).toBeTruthy();
  }));
});
