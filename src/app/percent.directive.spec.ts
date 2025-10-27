//import { ElementRef, Renderer2, RendererFactory2 } from '@angular/core';
import { PercentDirective } from './percent.directive';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';


@Component({
  template: `<p [appPercent]="10"> 10%</p>`
})
class RedBgComponent { }


describe('PercentDirective', () => {
  let fixture: ComponentFixture<RedBgComponent>;
  let element: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RedBgComponent],
      imports: [PercentDirective]
    });

    fixture = TestBed.createComponent(RedBgComponent);
    fixture.detectChanges();
    element = fixture.nativeElement.querySelector('p');
  });
  it('element style class should contain "buy"', () => {
    expect(element).toHaveClass('buy');
  });
});
