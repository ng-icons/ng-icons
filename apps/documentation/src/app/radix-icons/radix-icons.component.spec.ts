import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RadixIconsComponent } from './radix-icons.component';

describe('RadixIconsComponent', () => {
  let component: RadixIconsComponent;
  let fixture: ComponentFixture<RadixIconsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RadixIconsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RadixIconsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
