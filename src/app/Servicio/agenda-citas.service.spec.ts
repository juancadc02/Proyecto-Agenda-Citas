import { TestBed } from '@angular/core/testing';

import { AgendaCitasService } from './agenda-citas.service';

describe('AgendaCitasService', () => {
  let service: AgendaCitasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AgendaCitasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
