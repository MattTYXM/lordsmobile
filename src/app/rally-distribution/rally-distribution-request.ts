export class RallyDistributionRequest {
  total: number;
  infantry: number;
  ranged: number;
  cavalry: number;
  siege: number;

  constructor(total: number, infantry: number, ranged: number, cavalry: number, siege: number) {
    this.total = total;
    this.infantry = infantry;
    this.ranged = ranged;
    this.cavalry = cavalry;
    this.siege = siege;
  }
}
