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
    this._inViewPort = (this._elementMetadata.top >= parentMetadata.top && this._elementMetadata.top < parentMetadata.bottom);
  }

  public get inViewPort(): boolean {
    return this._inViewPort;
  }

  public get elementMetadata(): ElementMetadata {
    return this._elementMetadata;
  }
}
