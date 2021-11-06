import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JamIconsComponent } from './jam-icons.component';

describe('JamIconsComponent', () => {
  let component: JamIconsComponent;
  let fixture: ComponentFixture<JamIconsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JamIconsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JamIconsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
