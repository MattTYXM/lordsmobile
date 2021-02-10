export class ElementMetadata {

  private readonly _top: number;
  private readonly _height: number;
  private readonly _bottom: number;

  constructor(top: number = 0, height: number = 0, bottom: number = 0) {
    this._top = top;
    this._height = height;
    this._bottom = bottom;
  }

  public get top(): number {
    return this._top;
  }

  public get height(): number {
    return this._height;
  }

  public get bottom(): number {
    return this._bottom;
  }
}
