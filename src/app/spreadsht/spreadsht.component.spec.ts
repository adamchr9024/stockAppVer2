import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { SpreadshtComponent } from './spreadsht.component';
import { RapidapiService } from '../rapidapi.service';
import { SignalswatchlistService } from '../signalswatchlist.service';
import { provideAnimations } from '@angular/platform-browser/animations';
describe('SpreadshtComponent', () => {
  let component: SpreadshtComponent;
  let fixture: ComponentFixture<SpreadshtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpreadshtComponent],
      providers: [HttpClient, HttpHandler, RapidapiService, SignalswatchlistService, provideAnimations()]
    })
      .compileComponents();

    fixture = TestBed.createComponent(SpreadshtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
