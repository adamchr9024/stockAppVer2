import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialTableComponent } from './material-table.component';
import { RapidapiService } from '../rapidapi.service';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
/**
 * //need to mock this in this in test
      this.stocksmap = this.activeRoute.snapshot.data['stocksmap'];
 */
describe('MaterialTableComponent', () => {
  let component: MaterialTableComponent;
  let fixture: ComponentFixture<MaterialTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MaterialTableComponent],
      providers: [RapidapiService, provideRouter([]), provideAnimations()]
    })
      .compileComponents();

    fixture = TestBed.createComponent(MaterialTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
