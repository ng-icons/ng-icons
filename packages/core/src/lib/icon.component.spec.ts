import { Component, NgModule } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Router, RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import {
  featherAlertCircle,
  featherAlertTriangle,
} from '@ng-icons/feather-icons';
import { NgIconComponent } from './icon.component';
import { NgIconsModule, NG_ICON_DIRECTIVES } from './icon.module';
import { provideIcons } from './icon.provider';

describe('Icon', () => {
  let component: NgIconComponent;
  let fixture: ComponentFixture<NgIconComponent>;
  let nativeElement: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        NgIconsModule.withIcons({ featherAlertCircle, featherAlertTriangle }),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(NgIconComponent);
    component = fixture.componentInstance;
    component.name = 'featherAlertCircle';
    fixture.detectChanges();
    nativeElement = fixture.nativeElement;
  });

  it('should insert the expected template', () => {
    expect(nativeElement).toMatchSnapshot();
  });

  it('should allow the icon to change', () => {
    component.name = 'featherAlertTriangle';
    fixture.detectChanges();
    expect(nativeElement).toMatchSnapshot();
  });
});

@Component({
  template: `<ng-icon name="featherAlertCircle"></ng-icon>
    <router-outlet></router-outlet>`,
})
class RootComponent {}

@Component({
  template: `<ng-icon name="featherAlertTriangle"></ng-icon>`,
})
class ChildComponent {}

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: ChildComponent,
      },
    ]),
    NgIconsModule.withIcons({ featherAlertTriangle }),
  ],
  declarations: [ChildComponent],
})
class ChildModule {}

describe('Icon with multiple modules', () => {
  let fixture: ComponentFixture<RootComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RootComponent],
      imports: [
        RouterTestingModule.withRoutes([
          {
            path: '',
            component: RootComponent,
            loadChildren: () => Promise.resolve(ChildModule),
          },
        ]),
        NgIconsModule.withIcons({ featherAlertCircle }),
      ],
    }).compileComponents();
    router = TestBed.inject(Router);

    fixture = TestBed.createComponent(RootComponent);
    router.initialNavigation();
    fixture.detectChanges();
  });

  it('should display icons registered in both parent and child modules', () => {
    const icons = fixture.debugElement.queryAll(By.directive(NgIconComponent));

    expect(
      icons[1].componentInstance.template.changingThisBreaksApplicationSecurity,
    ).toMatchSnapshot();
    expect(
      icons[2].componentInstance.template.changingThisBreaksApplicationSecurity,
    ).toMatchSnapshot();
  });
});

@Component({
  standalone: true,
  template: '<ng-icon name="featherAlertCircle"></ng-icon>',
  imports: [NG_ICON_DIRECTIVES],
  providers: [provideIcons({ featherAlertCircle })],
})
class StandaloneComponent {}

describe('Standalone icon component', () => {
  let fixture: ComponentFixture<StandaloneComponent>;
  let nativeElement: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StandaloneComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(StandaloneComponent);
    fixture.detectChanges();
    nativeElement = fixture.nativeElement;
  });

  it('should display the icon', () => {
    const icon = nativeElement.querySelector<HTMLElement>('ng-icon');
    expect(icon?.innerHTML).toMatchSnapshot();
  });
});
