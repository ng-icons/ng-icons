import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IconCardComponent } from './icon-card.component';

describe('IconCardComponent', () => {
  let component: IconCardComponent;
  let fixture: ComponentFixture<IconCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IconCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IconCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
