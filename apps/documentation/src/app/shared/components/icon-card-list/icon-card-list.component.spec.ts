import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IconCardListComponent } from './icon-card-list.component';

describe('IconCardListComponent', () => {
  let component: IconCardListComponent;
  let fixture: ComponentFixture<IconCardListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IconCardListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IconCardListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
