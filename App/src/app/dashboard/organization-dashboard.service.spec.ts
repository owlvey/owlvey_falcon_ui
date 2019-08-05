import { TestBed } from '@angular/core/testing';

import { OrganizationDashboardService } from './organization-dashboard.service';

describe('OrganizationDashboardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OrganizationDashboardService = TestBed.get(OrganizationDashboardService);
    expect(service).toBeTruthy();
  });
});
