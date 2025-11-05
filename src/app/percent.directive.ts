import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';
//takes percentile value as and input and sets the background color of the component to red, green yellow pink etc
@Directive({
  selector: '[appPercent]',
  standalone: true
})
export class PercentDirective {

  constructor(private element: ElementRef, private renderer: Renderer2) { }
  @Input() set appPercent(percentval: number) { //NOTE: the name is same as the selector (appPercent)
    //console.log("in set input ", percentval)
    let clz = ""
    if (percentval >= 0 && percentval <= 20) {
      clz = 'buy';
    }
    else {
      if (percentval > 20 && percentval <= 30) {
        clz = 'potentialbuy';
      }
      else {
        if (percentval >= 70 && percentval <= 79) {
          clz = 'potentialsell';
        }
        else {
          if (percentval >= 80) {
            clz = 'sell';
          }
          else {
            clz = ""
          }
        }
      }
    }
    //if (clz) { //ERROR DOMException: DOMTokenList.add: The empty string is not a valid token.  FIX
    ['buy', 'potentialbuy', 'sell', 'potentialsell'].forEach(cls => {//remove old class
      try {//https://developer.mozilla.org/en-US/docs/Web/API/DOMTokenList/contains
        if (this.element.nativeElement.classList.contains(cls)) { //maybe should be classList
          this.renderer.removeClass(this.element.nativeElement, cls)
        }
      }
      catch (err) {
        console.log("error in percent directive ", err)
      }
    })
    if (clz) {
      this.renderer.addClass(this.element.nativeElement, clz)
    }
  }
  //}

}
