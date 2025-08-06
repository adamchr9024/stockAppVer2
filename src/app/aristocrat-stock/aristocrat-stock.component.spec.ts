import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AristocratStockComponent } from './aristocrat-stock.component';

describe('AristocratStockComponent', () => {
  let component: AristocratStockComponent;
  let fixture: ComponentFixture<AristocratStockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AristocratStockComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AristocratStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
