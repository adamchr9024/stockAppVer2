import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SideNavComponent } from './side-nav.component';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
describe('SideNavComponent', () => {
  let component: SideNavComponent;
  let fixture: ComponentFixture<SideNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SideNavComponent],
      providers: [provideRouter([]), provideAnimations()],
    })
      .compileComponents();

    fixture = TestBed.createComponent(SideNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
