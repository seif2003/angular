import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <input #input type="text" (input)="textInput($event)" value=""/>
    <hr>
    Upper-Case: {{upperCase}}
    <br/>
    Lower-Case: {{lowerCase}}
  `,
  styles: []
})

export class AppComponent implements AfterViewInit {
  upperCase: string = '';
  lowerCase: string = '';
  @ViewChild('input', { static: true }) inputBox!: ElementRef;


  textInput(event: Event) {
    let target = event.target as HTMLInputElement;
    this.upperCase = target.value.toUpperCase();
    this.lowerCase = target.value.toLowerCase();
  }

  ngAfterViewInit() {
    this.inputBox.nativeElement.focus();
  }
}
