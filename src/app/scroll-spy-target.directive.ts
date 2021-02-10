import { AfterContentInit, Directive, ElementRef, Input } from '@angular/core';
import { ElementService } from './element/element.service';
import { ElementMetadata } from './element/element-metadata.model';

@Directive({
  selector: '[appScrollSpyTarget]'
})
export class ScrollSpyTargetDirective implements AfterContentInit {

  @Input() public id!: string;
  private _inViewPort = false;
  private _elementMetadata!: ElementMetadata;

  constructor(public _el: ElementRef, private _elementService: ElementService) {
  }

  public ngAfterContentInit(): void {
    if (!this.id) {
      throw new Error('id is required');
    }
  }

  public update(parentMetadata: ElementMetadata): void {
    this._elementMetadata = this._elementService.getMetadata(this._el);
    this._inViewPort = (
      this._isTopIn(parentMetadata) ||
      this._isBottomIn(parentMetadata) ||
      this._isOverlapping(parentMetadata)
    );
  }

  public get inViewPort(): boolean {
    return this._inViewPort;
  }

  public get elementMetadata(): ElementMetadata {
    return this._elementMetadata;
  }

  private _isTopIn(parentMetadata: ElementMetadata): boolean {
    return parentMetadata.top <= this._elementMetadata.top;
  }

  private _isBottomIn(parentMetadata: ElementMetadata): boolean {
    return parentMetadata.bottom >= this._elementMetadata.bottom;
  }

  private _isOverlapping(parentMetadata: ElementMetadata): boolean {
    return this._elementMetadata.top < parentMetadata.top && this._elementMetadata.bottom > parentMetadata.bottom;
  }
}
