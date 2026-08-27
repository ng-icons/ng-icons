import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  keylineActivity,
  keylineMoreHorizontal,
} from '@ng-icons/keyline-icons';
import { reiconActivity } from '@ng-icons/reicon';
import { reiconActivityFill } from '@ng-icons/reicon/fill';
import { provideIcons } from '../../providers/icon.provider';
import { NgIcon } from './icon.component';

// The other tests here assert the host CSS variables. These assert what they
// resolve to once a set's markup is laid out, for a stroke and a filled icon.
describe.each([
  ['keylineActivity', keylineActivity, 'stroke'],
  ['keylineMoreHorizontal', keylineMoreHorizontal, 'fill'],
  ['reiconActivity', reiconActivity, 'stroke'],
  ['reiconActivityFill', reiconActivityFill, 'fill'],
] as const)('%s', (name, svg, paintedWith) => {
  let fixture: ComponentFixture<NgIcon>;
  let nativeElement: HTMLElement;
  let svgElement: SVGElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgIcon],
      providers: [provideIcons({ [name]: svg })],
    }).compileComponents();

    fixture = TestBed.createComponent(NgIcon);
    fixture.componentRef.setInput('name', name);
    fixture.detectChanges();

    nativeElement = fixture.nativeElement;
    svgElement = nativeElement.querySelector('svg')!;
  });

  afterEach(() => TestBed.resetTestingModule());

  it('paints every shape in the colour of the color input', () => {
    fixture.componentRef.setInput('color', 'rgb(255, 0, 0)');
    fixture.detectChanges();

    const shapes = Array.from(
      svgElement.querySelectorAll<SVGElement>(
        'path, circle, rect, line, polyline, polygon, ellipse',
      ),
    );

    expect(shapes.length).toBeGreaterThan(0);

    for (const shape of shapes) {
      expect(getComputedStyle(shape)[paintedWith]).toBe('rgb(255, 0, 0)');
    }
  });

  it('scales with the font size when no size input is set', () => {
    nativeElement.style.fontSize = '40px';

    expect(nativeElement.getBoundingClientRect().width).toBeCloseTo(40);
    expect(svgElement.getBoundingClientRect().height).toBeCloseTo(40);
  });

  it('takes its size from the size input, ignoring the font size', () => {
    nativeElement.style.fontSize = '40px';
    fixture.componentRef.setInput('size', 24);
    fixture.detectChanges();

    expect(nativeElement.getBoundingClientRect().width).toBeCloseTo(24);
    expect(svgElement.getBoundingClientRect().height).toBeCloseTo(24);
  });
});
