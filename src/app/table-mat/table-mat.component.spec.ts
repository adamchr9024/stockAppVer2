import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RapidapiService } from '../rapidapi.service';
import { TableMatComponent } from './table-mat.component';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';

describe('TableMatComponent', () => {
  let component: TableMatComponent;
  let fixture: ComponentFixture<TableMatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableMatComponent],
      providers: [RapidapiService, HttpClient, HttpHandler, provideAnimations()]
    })
      .compileComponents();

    fixture = TestBed.createComponent(TableMatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
