export class NavItemModel {

  private _title: string;
  private _target: string;
  private _active: boolean;

  constructor(title: string, target: string, active: boolean) {
    this._title = title;
    this._target = target;
    this._active = active;
  }

  public get title(): string {
    return this._title;
  }

  public set title(value: string) {
    this._title = value;
  }

  public get target(): string {
    return this._target;
  }

  public set target(value: string) {
    this._target = value;
  }

  public get active(): boolean {
    return this._active;
  }

  public set active(value: boolean) {
    this._active = value;
  }
}
