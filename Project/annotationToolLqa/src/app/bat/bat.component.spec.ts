import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BatComponent } from './bat.component';

describe('BatComponent', () => {
  let component: BatComponent;
  let fixture: ComponentFixture<BatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
