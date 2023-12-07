import { TestBed } from '@angular/core/testing';

import { EntrevistadoresService } from './entrevistadores.service';

describe('EntrevistadoresService', () => {
  let service: EntrevistadoresService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EntrevistadoresService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
