import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SamajikJagrutiComponent } from './samajik-jagruti.component';

describe('SamajikJagrutiComponent', () => {
  let component: SamajikJagrutiComponent;
  let fixture: ComponentFixture<SamajikJagrutiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SamajikJagrutiComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SamajikJagrutiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
