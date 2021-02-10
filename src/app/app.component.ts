import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public handleTargetChanged(id: string | null): void {
    console.log('-----');
    console.log(id);
    console.log('-----');
  }
}
