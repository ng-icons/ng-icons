import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  FeatherAlertCircle,
  FeatherAlertTriangle,
} from '@ng-icons/feather-icons';
import { IconComponent } from './icon.component';
import { NgIconsModule } from './icon.module';
import { Component, NgModule } from '@angular/core';

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
