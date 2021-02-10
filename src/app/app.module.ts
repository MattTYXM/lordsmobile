import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RallyDistributionComponent } from './rally-distribution/rally-distribution.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { ScrollSpyDirective } from './scroll-spy.directive';
import { ScrollSpyTargetDirective } from './scroll-spy-target.directive';

@NgModule({
  declarations: [
    AppComponent,
    RallyDistributionComponent,
    NavBarComponent,
    FooterComponent,
    HomeComponent,
    ScrollSpyDirective,
    ScrollSpyTargetDirective
  ],
  imports: [
    BrowserModule,
    NgbModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
