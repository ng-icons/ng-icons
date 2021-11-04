import { IconComponent, NgIconsModule } from '@ng-icons/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FeatherAlertCircle } from '@ng-icons/feather-icons';

describe('IconComponent', () => {
  let component: IconComponent;
  let fixture: ComponentFixture<IconComponent>;
  let nativeElement: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgIconsModule.withIcons({ FeatherAlertCircle })],
      declarations: [IconComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IconComponent);
    component = fixture.componentInstance;
    component.name = 'feather-alert-circle';
    fixture.detectChanges();
    nativeElement = fixture.nativeElement;
  });

  it('should insert the expected template', () => {
    expect(nativeElement).toMatchSnapshot();
  });
});
