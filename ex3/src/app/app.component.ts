import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <p>Foreground: <input [(ngModel)]="fg"/></p>
    <p>background: <input [(ngModel)]="bg"/></p>

    <div [ngStyle]="{'color':fg,'background-color':bg,'padding':'5px'}">
      Zone de teste
    </div>
  `,
  styles: []
})
export class AppComponent {
  fg = "#ffffff"
  bg = "#000000"
}
