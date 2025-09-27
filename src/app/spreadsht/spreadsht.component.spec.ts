import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpreadshtComponent } from './spreadsht.component';

describe('SpreadshtComponent', () => {
  let component: SpreadshtComponent;
  let fixture: ComponentFixture<SpreadshtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpreadshtComponent]
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
