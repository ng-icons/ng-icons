import { Component, NgModule } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  FeatherAlertCircle,
  FeatherAlertTriangle,
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
        NgIconsModule.withIcons({ FeatherAlertCircle, FeatherAlertTriangle }),
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NgIconComponent);
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

@Component({
  template: ` <ng-icon name="feather-alert-circle"></ng-icon>
    <ng-icon name="feather-alert-triangle"></ng-icon>`,
})
class TestComponent {}

@NgModule({
  imports: [NgIconsModule.withIcons({ FeatherAlertTriangle })],
  declarations: [TestComponent],
})
class ChildModule {}

@NgModule({
  imports: [ChildModule, NgIconsModule.withIcons({ FeatherAlertCircle })],
})
class ParentModule {}

describe('Icon with multiple modules', () => {
  let fixture: ComponentFixture<TestComponent>;
  let nativeElement: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ParentModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges();
    nativeElement = fixture.nativeElement;
  });

  it('should display icons registered in both parent and child modules', () => {
    const icons = nativeElement.querySelectorAll('ng-icon');
    expect(icons.item(0).innerHTML).toMatchSnapshot();
    expect(icons.item(1).innerHTML).toMatchSnapshot();
  });
});

@Component({
  standalone: true,
  template: '<ng-icon name="feather-alert-circle"></ng-icon>',
  imports: [NG_ICON_DIRECTIVES],
  providers: [provideIcons({ FeatherAlertCircle })],
})
class StandaloneComponent {}

describe('Standalone icon component', () => {
  let fixture: ComponentFixture<TestComponent>;
  let nativeElement: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StandaloneComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges();
    nativeElement = fixture.nativeElement;
  });

  it('should display the icon', () => {
    const icon = nativeElement.querySelector<HTMLElement>('ng-icon');
    expect(icon?.innerHTML).toMatchSnapshot();
  });
});
