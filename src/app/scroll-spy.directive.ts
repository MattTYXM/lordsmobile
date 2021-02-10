import { AfterContentInit, ContentChildren, Directive, ElementRef, EventEmitter, HostListener, Output, QueryList } from '@angular/core';
import { ScrollSpyTargetDirective } from './scroll-spy-target.directive';
import { ElementService } from './element/element.service';
import { ElementMetadata } from './element/element-metadata.model';

@Directive({
  selector: '[appScrollSpy]'
})
export class ScrollSpyDirective implements AfterContentInit {

  @ContentChildren(ScrollSpyTargetDirective, {descendants: true}) public targets!: QueryList<ScrollSpyTargetDirective>;
  @Output() public targetChanged = new EventEmitter<string | null>();
  private _selected?: ScrollSpyTargetDirective | null = null;

  constructor(private _element: ElementRef, private _elementService: ElementService) {
  }

  ngAfterContentInit(): void {
    this._update();
  }

  @HostListener('window:scroll')
  public onScroll(): void {
    this._update();
  }

  private _update(): void {
    const elementMetadata: ElementMetadata = this._elementService.getMetadata(window);
    this.targets.forEach((target) => target.update(elementMetadata));
    const visibleTargets: ScrollSpyTargetDirective[] = this.targets.toArray()
      .filter((target => target.inViewPort))
      .sort((a, b) =>
        a.elementMetadata.top - b.elementMetadata.top
      );

    let selected: ScrollSpyTargetDirective | null;
    if (visibleTargets.length > 0) {
      selected = visibleTargets[0];
    } else {
      selected = null;
    }

    if (this._selected !== selected) {
      this._selected = selected;
      this.targetChanged.emit(this._selected?.id || null);
    }
  }
}
