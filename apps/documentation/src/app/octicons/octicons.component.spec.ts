import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OcticonsComponent } from './octicons.component';

describe('OcticonsComponent', () => {
  let component: OcticonsComponent;
  let fixture: ComponentFixture<OcticonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OcticonsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OcticonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
