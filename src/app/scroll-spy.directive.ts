import { ContentChildren, Directive, EventEmitter, HostListener, Output, QueryList } from '@angular/core';
import { ElementMetadata } from './element/element-metadata.model';
import { ElementService } from './element/element.service';
import { ScrollSpyTargetDirective } from './scroll-spy-target.directive';

@Directive({
  selector: '[appScrollSpy]'
})
export class ScrollSpyDirective {

  @ContentChildren(ScrollSpyTargetDirective, { descendants: true }) public targets!: QueryList<ScrollSpyTargetDirective>;
  @Output() public targetChanged: EventEmitter<string> = new EventEmitter<string>();
  private _selected?: ScrollSpyTargetDirective | null = null;

  constructor(private _elementService: ElementService) {
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

    if (this._selected?.id !== selected?.id) {
      this._selected = selected;
      this.targetChanged.emit(this._selected?.id || '');
    }
  }
}
