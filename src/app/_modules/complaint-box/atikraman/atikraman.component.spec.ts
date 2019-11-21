import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AtikramanComponent } from './atikraman.component';

describe('AtikramanComponent', () => {
  let component: AtikramanComponent;
  let fixture: ComponentFixture<AtikramanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AtikramanComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AtikramanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
