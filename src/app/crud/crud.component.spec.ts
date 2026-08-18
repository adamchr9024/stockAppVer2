import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudComponent } from './crud.component';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { CrudFileService } from '../crud-file.service';
import { provideHttpClientTesting } from '@angular/common/http/testing';
describe('CrudComponent', () => {
  let component: CrudComponent;
  let fixture: ComponentFixture<CrudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrudComponent],
      providers: [provideHttpClientTesting, CrudFileService, HttpClient, HttpHandler]
    })
      .compileComponents();

    fixture = TestBed.createComponent(CrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
