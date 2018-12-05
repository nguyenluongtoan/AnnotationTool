import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RatComponent } from './rat.component';

describe('RatComponent', () => {
  let component: RatComponent;
  let fixture: ComponentFixture<RatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
