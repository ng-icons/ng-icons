import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Component, NgModule, inject } from '@angular/core';
import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  flushMicrotasks,
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

    expect(icons[0].nativeElement.innerHTML).toBe(
      `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" class="feather feather-alert-circle" style="width:var(--ng-icon__size, 1em);height:var(--ng-icon__size, 1em);stroke-width:var(--ng-icon__stroke-width, 2)"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>`,
    );
    expect(icons[1].nativeElement.innerHTML).toBe(
      `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" class="feather feather-alert-triangle" style="width:var(--ng-icon__size, 1em);height:var(--ng-icon__size, 1em);stroke-width:var(--ng-icon__stroke-width, 2)"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>`,
    );
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
    expect(icon.nativeElement.innerHTML).toBe(
      `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" class="feather feather-alert-circle" style="width:var(--ng-icon__size, 1em);height:var(--ng-icon__size, 1em);stroke-width:var(--ng-icon__stroke-width, 2)"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>`,
    );
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
    expect(icon!.nativeElement.innerHTML).toBe(
      `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" class="feather feather-alert-circle" style="width:var(--ng-icon__size, 1em);height:var(--ng-icon__size, 1em);stroke-width:var(--ng-icon__stroke-width, 2)"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>`,
    );
  }));
});
