import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YojnaListComponent } from './yojna-list.component';

describe('YojnaListComponent', () => {
  let component: YojnaListComponent;
  let fixture: ComponentFixture<YojnaListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YojnaListComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YojnaListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
