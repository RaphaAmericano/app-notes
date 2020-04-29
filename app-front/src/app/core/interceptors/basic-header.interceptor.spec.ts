import { TestBed } from '@angular/core/testing';

import { BasicHeaderInterceptor } from './basic-header.interceptor';

describe('BasicHeaderInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      BasicHeaderInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: BasicHeaderInterceptor = TestBed.inject(BasicHeaderInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
