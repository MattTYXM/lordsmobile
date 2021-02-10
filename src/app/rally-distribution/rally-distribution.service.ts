import {Injectable} from '@angular/core';
import {RallyDistributionRequest} from './rally-distribution-request';
import {RallyDistributionResponse} from './rally-distribution-response';

@Injectable({
  providedIn: 'root'
})
export class RallyDistributionService {

  constructor() {
  }

  private static _validate(request: RallyDistributionRequest): void {
    if (!request) {
      throw new Error('request is required');
    }

    if (request.total < 0) {
      throw new Error('total can not be a negative number');
    }

    if (request.infantry < 0) {
      throw new Error('infantry can not be a negative number');
    }

    if (request.ranged < 0) {
      throw new Error('ranged can not be a negative number');
    }

    if (request.cavalry < 0) {
      throw new Error('cavalry can not be a negative number');
    }

    if (request.siege < 0) {
      throw new Error('siege can not be a negative number');
    }

    if ((request.infantry + request.ranged + request.cavalry + request.siege) > 100) {
      throw new Error('distribution cannot exceed 100%');
    }
  }

  private static _getCalculatedValue(total: number, wholePercentage?: number): number {
    return Math.floor(total * ((wholePercentage || 0) / 100));
  }

  public getRallyDistribution(request: RallyDistributionRequest): RallyDistributionResponse {
    RallyDistributionService._validate(request);

    const total = request.total || 0;
    const infantry = RallyDistributionService._getCalculatedValue(total, request.infantry);
    const ranged = RallyDistributionService._getCalculatedValue(total, request.ranged);
    const cavalry = RallyDistributionService._getCalculatedValue(total, request.cavalry);
    const siege = RallyDistributionService._getCalculatedValue(total, request.siege);

    const calculatedTotal = infantry + ranged + cavalry + siege;
    const remainder = total - calculatedTotal;
    return new RallyDistributionResponse(calculatedTotal, infantry, ranged, cavalry, siege, remainder);
  }
}
