import { AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { NavItemModel } from './nav-item.model';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements AfterViewInit, OnChanges {

  @Input() public navItemId!: string;
  public collapsed = true;
  public navItems: NavItemModel[] = [
    new NavItemModel('Home', 'home', false),
    new NavItemModel('Rally Distribution', 'rally-distribution', false)
  ];

  ngAfterViewInit(): void {
    this._updateNavItems();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.navItemId.previousValue !== changes.navItemId.currentValue) {
      this._updateNavItems();
    }
  }

  public scrollTo(id: string): void {
    const element = document.getElementById(id);

    if (element) {
      window.scrollTo({ top: element.getBoundingClientRect().top - 60 });
    }
  }

  private _updateNavItems(): void {
    this.navItems.forEach(navItem => navItem.active = this._isActive(navItem));
  }

  private _isActive(navItem: NavItemModel): boolean {
    return navItem.target === this.navItemId;
  }
}
