import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StmcComponent } from './stmc.component';

describe('StmcComponent', () => {
  let component: StmcComponent;
  let fixture: ComponentFixture<StmcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StmcComponent]
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
