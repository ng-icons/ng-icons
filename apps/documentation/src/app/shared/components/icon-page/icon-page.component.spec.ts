import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IconPageDirective } from './icon-page.component';

describe('IconPageComponent', () => {
  let component: IconPageDirective;
  let fixture: ComponentFixture<IconPageDirective>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IconPageDirective],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IconPageDirective);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
