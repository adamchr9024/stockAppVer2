import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AristocratTableComponent } from './aristocrat-table.component';

describe('AristocratTableComponent', () => {
  let component: AristocratTableComponent;
  let fixture: ComponentFixture<AristocratTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AristocratTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AristocratTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
