export class RallyDistributionResponse {

  private _total: number;
  private _infantry: number;
  private _ranged: number;
  private _cavalry: number;
  private _siege: number;
  private _remainder: number;

  constructor(
    total: number = 0,
    infantry: number = 0,
    ranged: number = 0,
    cavalry: number = 0,
    siege: number = 0,
    remainder: number = 0
  ) {
    this._total = total;
    this._infantry = infantry;
    this._ranged = ranged;
    this._cavalry = cavalry;
    this._siege = siege;
    this._remainder = remainder;
  }

  public get total(): number {
    return this._total;
  }

  public set total(value: number) {
    this._total = value;
  }

  public get infantry(): number {
    return this._infantry;
  }

  public set infantry(value: number) {
    this._infantry = value;
  }

  public get ranged(): number {
    return this._ranged;
  }

  public set ranged(value: number) {
    this._ranged = value;
  }

  public get cavalry(): number {
    return this._cavalry;
  }

  public set cavalry(value: number) {
    this._cavalry = value;
  }

  public get siege(): number {
    return this._siege;
  }

  public set siege(value: number) {
    this._siege = value;
  }

  public get remainder(): number {
    return this._remainder;
  }

  public set remainder(value: number) {
    this._remainder = value;
  }
}
