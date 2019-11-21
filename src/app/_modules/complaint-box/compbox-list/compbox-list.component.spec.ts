import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompboxListComponent } from './compbox-list.component';

describe('CompboxListComponent', () => {
  let component: CompboxListComponent;
  let fixture: ComponentFixture<CompboxListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompboxListComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompboxListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
