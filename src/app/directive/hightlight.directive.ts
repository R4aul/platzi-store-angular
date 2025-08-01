import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appHightlight]'
})
export class HightlightDirective {

  constructor(
    private elemetRef :ElementRef
  ) { 
    this.elemetRef.nativeElement.style.backgraoundColor="red" ;
  }

  
}
