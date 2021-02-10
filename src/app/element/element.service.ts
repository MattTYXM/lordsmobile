import { Injectable } from '@angular/core';
import { ElementMetadata } from './element-metadata.model';

@Injectable({
  providedIn: 'root'
})
export class ElementService {

  constructor() {
  }

  public getMetadata(element: any): ElementMetadata {
    try {
      const top: number = ElementService._getTop(element);
      const height: number = ElementService._getHeight(element);
      const bottom: number = top + height;

      return new ElementMetadata(
        top,
        height,
        bottom
      );
    } catch (e) {
      console.error('Failed to execute ElementService.getMetadata', e);
    }

    return new ElementMetadata();
  }

  private static _getHeight(element: any): number {
    let height: number = element.innerHeight;

    if (ElementService._isNull(height)) {
      height = element.nativeElement.getBoundingClientRect().height;
    }

    return height;
  }

  private static _getTop(element: any): number {
    let top: number = element.pageYOffset;

    if (ElementService._isNull(top)) {
      top = element.scrollY;
    }

    if (ElementService._isNull(top)) {
      top = element.nativeElement.getBoundingClientRect().top;
    }

    return Math.abs(top);
  }

  private static _isNull(value: any): boolean {
    return value === null || typeof value === 'undefined';
  }
}
