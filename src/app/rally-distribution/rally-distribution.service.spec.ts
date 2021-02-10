import {TestBed} from '@angular/core/testing';

import {RallyDistributionService} from './rally-distribution.service';
import {RallyDistributionRequest} from './rally-distribution-request';
import {RallyDistributionResponse} from './rally-distribution-response';

describe('RallyDistributionService', () => {
  let service: RallyDistributionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RallyDistributionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  function verifyExpectation(
    request: RallyDistributionRequest,
    expectedTotal: number,
    expectedInfantry: number,
    expectedRanged: number,
    expectedCavalry: number,
    expectedSiege: number,
    expectedRemainder: number = 0
  ): void {
    const response: RallyDistributionResponse = service.getRallyDistribution(request);

    expect(response.total).toEqual(expectedTotal);
    expect(response.infantry).toEqual(expectedInfantry);
    expect(response.ranged).toEqual(expectedRanged);
    expect(response.cavalry).toEqual(expectedCavalry);
    expect(response.siege).toEqual(expectedSiege);
    expect(response.remainder).toEqual(expectedRemainder);
  }

  it('should calculate properly', () => {
    verifyExpectation(new RallyDistributionRequest(1000, 25, 25, 25, 25), 1000, 250, 250, 250, 250);
    verifyExpectation(new RallyDistributionRequest(1001, 25, 25, 25, 25), 1000, 250, 250, 250, 250, 1);
    verifyExpectation(new RallyDistributionRequest(1002, 25, 25, 25, 25), 1000, 250, 250, 250, 250, 2);
    verifyExpectation(new RallyDistributionRequest(1003, 25, 25, 25, 25), 1000, 250, 250, 250, 250, 3);
    verifyExpectation(new RallyDistributionRequest(1004, 25, 25, 25, 25), 1004, 251, 251, 251, 251);
    verifyExpectation(new RallyDistributionRequest(1000, 57.5, 2.5, 20, 20), 1000, 575, 25, 200, 200);
    verifyExpectation(new RallyDistributionRequest(999, 25, 25, 25, 25), 996, 249, 249, 249, 249, 3);
    verifyExpectation(new RallyDistributionRequest(999, (100 / 3), (100 / 3), (100 / 3), 0), 999, 333, 333, 333, 0);
  });
});
