import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransDemoComponent } from './trans-demo.component';

describe('TransDemoComponent', () => {
  let component: TransDemoComponent;
  let fixture: ComponentFixture<TransDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransDemoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
