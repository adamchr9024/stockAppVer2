import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StmcComponent } from './stmc.component';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideAnimations } from '@angular/platform-browser/animations';

describe('StmcComponent', () => {
  let component: StmcComponent;
  let fixture: ComponentFixture<StmcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StmcComponent],
      providers: [provideHttpClientTesting, HttpClient, HttpHandler, provideAnimations()]
    })
      .compileComponents();

    fixture = TestBed.createComponent(StmcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
