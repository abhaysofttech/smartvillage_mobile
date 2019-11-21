import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AtikramanRegtokanComponent } from './atikraman-regtokan.component';

describe('AtikramanRegtokanComponent', () => {
  let component: AtikramanRegtokanComponent;
  let fixture: ComponentFixture<AtikramanRegtokanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AtikramanRegtokanComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AtikramanRegtokanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
