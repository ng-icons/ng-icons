import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideIcons } from '../../providers/icon.provider';
import { NgIcon } from './icon.component';

// Lifted verbatim from `@ng-icons/keyline-icons` and `@ng-icons/reicon` and
// kept in-source: every icon package type-imports `@ng-icons/core` to
// contribute its names to `NgIconNameMap`, so importing one back into core
// would make the two projects depend on each other.
const keylineActivity = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" style="stroke-width:var(--ng-icon__stroke-width, 2)"><path d="M2 12H5L8 4L16 20L19 12H22" fill="none"></path></svg>`;
const keylineMoreHorizontal = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"><path d="M6.5 12C6.5 12.8284 5.8284 13.5 5 13.5C4.1716 13.5 3.5 12.8284 3.5 12C3.5 11.1716 4.1716 10.5 5 10.5C5.8284 10.5 6.5 11.1716 6.5 12ZM13.5 12C13.5 12.8284 12.8284 13.5 12 13.5C11.1716 13.5 10.5 12.8284 10.5 12C10.5 11.1716 11.1716 10.5 12 10.5C12.8284 10.5 13.5 11.1716 13.5 12ZM20.5 12C20.5 12.8284 19.8284 13.5 19 13.5C18.1716 13.5 17.5 12.8284 17.5 12C17.5 11.1716 18.1716 10.5 19 10.5C19.8284 10.5 20.5 11.1716 20.5 12Z" fill="currentColor"></path></svg>`;
const reiconActivity = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22Z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" style="stroke-width:var(--ng-icon__stroke-width, 1.5)"></path><path d="M7.33008 14.49L9.71008 11.4C10.0501 10.96 10.6801 10.88 11.1201 11.22L12.9501 12.66C13.3901 13 14.0201 12.92 14.3601 12.49L16.6701 9.51001" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" style="stroke-width:var(--ng-icon__stroke-width, 1.5)"></path></svg>`;
const reiconActivityFill = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.19 2H7.81C4.17 2 2 4.17 2 7.81V16.18C2 19.83 4.17 22 7.81 22H16.18C19.82 22 21.99 19.83 21.99 16.19V7.81C22 4.17 19.83 2 16.19 2ZM17.26 9.96L14.95 12.94C14.66 13.31 14.25 13.55 13.78 13.6C13.31 13.66 12.85 13.53 12.48 13.24L10.65 11.8C10.58 11.74 10.5 11.74 10.46 11.75C10.42 11.75 10.35 11.77 10.29 11.85L7.91 14.94C7.76 15.13 7.54 15.23 7.32 15.23C7.16 15.23 7 15.18 6.86 15.07C6.53 14.82 6.47 14.35 6.72 14.02L9.1 10.93C9.39 10.56 9.8 10.32 10.27 10.26C10.73 10.2 11.2 10.33 11.57 10.62L13.4 12.06C13.47 12.12 13.54 12.12 13.59 12.11C13.63 12.11 13.7 12.09 13.76 12.01L16.07 9.03C16.32 8.7 16.8 8.64 17.12 8.9C17.45 9.17 17.51 9.64 17.26 9.96Z" fill="currentColor"></path></svg>`;

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
