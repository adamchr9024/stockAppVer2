import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialTableComponent } from './material-table.component';
import { RapidapiService } from '../rapidapi.service';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { ActivatedRoute } from '@angular/router';
/**
 * //need to mock this in this in test
      this.stocksmap = this.activeRoute.snapshot.data['stocksmap'];  done below
 */
describe('MaterialTableComponent', () => {
  let component: MaterialTableComponent;
  let fixture: ComponentFixture<MaterialTableComponent>;
  const activatedRouteMock = {
    snapshot: {
      data: {
        stocksmap: {
          key: 'BGY', //key and value may not be necessary ???
          value: {
            _costbasis: 0, dividendYield: 8.88, _gainloss: 0, _marketvalue: 0, _percentage: 85, _trailingAnnualDividendRate: 0.467,
            _yahooprice: 5.76, actual_dividend: 0, category: "Watch List", comment: "High Yield Dividend Trust", effective_year_high: 2.2,
            effective_year_low: 1.1, est_annual_income: 0, fiftyDayAverage: 0, fiftyDayAverageChange: 0, fifty_twowkrng: "4.67 - 5.95",
            price: 5.76, quantity: 0, ticker: "BGY", twoHundredDayAverage: 0, twoHundredDayAverageChange: 0, unit_cost: 8.5
          },
          values: () => { // fix for stockmaps.values  is not a function
            return [
              {
                _costbasis: 0, dividendYield: 8.88, _gainloss: 0, _marketvalue: 0, _percentage: 85, _trailingAnnualDividendRate: 0.467,
                _yahooprice: 5.76, actual_dividend: 0, category: "Watch List", comment: "High Yield Dividend Trust", effective_year_high: 2.2,
                effective_year_low: 1.1, est_annual_income: 0, fiftyDayAverage: 0, fiftyDayAverageChange: 0, fifty_twowkrng: "4.67 - 5.95",
                price: 5.76, quantity: 0, ticker: "BGY", twoHundredDayAverage: 0, twoHundredDayAverageChange: 0, unit_cost: 8.5
              }
            ]
          }
        },
      },
    },
  };
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MaterialTableComponent],
      providers: [RapidapiService, provideRouter([]), provideAnimations(), { provide: ActivatedRoute, useValue: activatedRouteMock }]
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
