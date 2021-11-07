import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroiconsComponent } from './heroicons.component';

describe('HeroiconsComponent', () => {
  let component: HeroiconsComponent;
  let fixture: ComponentFixture<HeroiconsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeroiconsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroiconsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
