import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { MystocksComponent } from './mystocks.component';
import { RapidapiService } from '../rapidapi.service';

describe('MystocksComponent', () => {
  let component: MystocksComponent;
  let fixture: ComponentFixture<MystocksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MystocksComponent],
      providers: [RapidapiService, HttpClient, HttpHandler]
    })
      .compileComponents();

    fixture = TestBed.createComponent(MystocksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
