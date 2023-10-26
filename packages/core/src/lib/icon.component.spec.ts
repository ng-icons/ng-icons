import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Component, inject, NgModule } from '@angular/core';
import {
  ComponentFixture,
  fakeAsync,
  flushMicrotasks,
  TestBed,
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Router, RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import {
  featherAlertCircle,
  featherAlertTriangle,
} from '@ng-icons/feather-icons';
import { NgIcon } from './icon.component';
import { NG_ICON_DIRECTIVES, NgIconsModule } from './icon.module';
import {
  NgIconCacheToken,
  provideNgIconLoader,
  withCaching,
} from './providers/icon-loader.provider';
import { provideIcons } from './providers/icon.provider';

describe('Icon', () => {
  let component: NgIcon;
  let fixture: ComponentFixture<NgIcon>;
  let nativeElement: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        NgIconsModule.withIcons({ featherAlertCircle, featherAlertTriangle }),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(NgIcon);
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
            pathMatch: 'full',
            loadChildren: () => Promise.resolve(ChildModule),
          },
        ]),
        NgIconsModule.withIcons({ featherAlertCircle }),
      ],
    }).compileComponents();
    router = TestBed.inject(Router);

    fixture = TestBed.createComponent(RootComponent);
    fixture.detectChanges();
    router.initialNavigation();
    fixture.detectChanges();
  });

  it('should display icons registered in both parent and child modules', () => {
    const icons = fixture.debugElement.queryAll(By.directive(NgIcon));

    expect(
      icons[0].componentInstance.template.changingThisBreaksApplicationSecurity,
    ).toMatchSnapshot();
    expect(
      icons[1].componentInstance.template.changingThisBreaksApplicationSecurity,
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

@Component({
  standalone: true,
  template: '<ng-icon name="featherAlertCircle"></ng-icon>',
  imports: [NG_ICON_DIRECTIVES, HttpClientTestingModule],
  providers: [
    provideNgIconLoader(() => {
      // this is here to ensure we can access the injector
      const http = inject(HttpClient);

      if (!http) {
        throw new Error('http is not defined');
      }

      return Promise.resolve(featherAlertCircle);
    }),
  ],
})
class LoaderComponent {}

describe('Custom loader', () => {
  let fixture: ComponentFixture<LoaderComponent>;

  it('should display the icon', fakeAsync(async () => {
    await TestBed.configureTestingModule({
      imports: [LoaderComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(LoaderComponent);
    fixture.detectChanges();
    flushMicrotasks();
    const icon = fixture.debugElement.query(By.directive(NgIcon));
    expect(
      icon!.componentInstance.template['changingThisBreaksApplicationSecurity'],
    ).toBe(featherAlertCircle);
  }));
});

@Component({
  standalone: true,
  template: '<ng-icon name="featherAlertCircle"></ng-icon>',
  imports: [NG_ICON_DIRECTIVES],
})
class CachedLoaderComponent {}

describe('Custom loader with caching', () => {
  let fixture: ComponentFixture<CachedLoaderComponent>;

  it('should display the icon', fakeAsync(async () => {
    await TestBed.configureTestingModule({
      imports: [CachedLoaderComponent],
      providers: [
        provideNgIconLoader(
          () => Promise.resolve(featherAlertCircle),
          withCaching(),
        ),
      ],
    }).compileComponents();

    // access the cache
    const cache = TestBed.inject(NgIconCacheToken);
    cache.set('featherAlertCircle', featherAlertCircle);

    const cacheSpy = jest
      .spyOn(cache!, 'get')
      .mockReturnValue(featherAlertCircle);

    fixture = TestBed.createComponent(CachedLoaderComponent);
    fixture.detectChanges();

    expect(cacheSpy).toHaveBeenCalledWith('featherAlertCircle');

    const icon = fixture.debugElement.query(By.directive(NgIcon));
    expect(
      icon!.componentInstance.template['changingThisBreaksApplicationSecurity'],
    ).toBe(featherAlertCircle);
  }));
});
