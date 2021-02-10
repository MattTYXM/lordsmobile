import { Component, OnInit } from '@angular/core';
import { NavItemModel } from './nav-item.model';
import { LocationStrategy } from '@angular/common';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  public collapsed = true;
  public navItems: NavItemModel[] = [
    new NavItemModel('Home', 'home', false),
    new NavItemModel('Rally Distribution', 'rally-distribution', false)
  ];

  constructor(private _locationStrategy: LocationStrategy) {
  }

  ngOnInit(): void {
    this.navItems.forEach(navItem => navItem.active = this._isActive(navItem));
  }

  private _isActive(navItem: NavItemModel): boolean {
    const currentPath: string = this._locationStrategy.path(true).split('?')[0];

    return currentPath.endsWith(`#${navItem.target}`);
  }
}
