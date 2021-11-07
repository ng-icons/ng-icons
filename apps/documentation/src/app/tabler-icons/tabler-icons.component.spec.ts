import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablerIconsComponent } from './tabler-icons.component';

describe('TablerIconsComponent', () => {
  let component: TablerIconsComponent;
  let fixture: ComponentFixture<TablerIconsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TablerIconsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TablerIconsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
