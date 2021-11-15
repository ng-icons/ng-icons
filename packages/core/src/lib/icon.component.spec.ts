import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  FeatherAlertCircle,
  FeatherAlertTriangle,
} from '@ng-icons/feather-icons';
import { IconComponent } from './icon.component';
import { NgIconsModule } from './icon.module';

describe('Icon', () => {
  let component: IconComponent;
  let fixture: ComponentFixture<IconComponent>;
  let nativeElement: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        NgIconsModule.withIcons({ FeatherAlertCircle, FeatherAlertTriangle }),
      ],
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

  it('should allow the icon to change', () => {
    component.name = 'feather-alert-triangle';
    fixture.detectChanges();
    expect(nativeElement).toMatchSnapshot();
  });
});
