import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgGlyphset, provideNgGlyphs } from '../../providers/glyph.provider';
import { NgGlyph } from './glyph.component';

// note we don't import these to avoid circular dependencies
const glyphsets: NgGlyphset[] = [
  {
    name: 'material-symbols-outlined',
    baseClass: 'material-icons-outlined',
  },
  {
    name: 'material-symbols-rounded',
    baseClass: 'material-icons-rounded',
  },
];

describe('Glyph', () => {
  let component: NgGlyph;
  let fixture: ComponentFixture<NgGlyph>;
  let nativeElement: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [provideNgGlyphs(...glyphsets)],
      imports: [NgGlyph],
    }).compileComponents();

    fixture = TestBed.createComponent(NgGlyph);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('name', 'test');
    fixture.detectChanges();
    nativeElement = fixture.nativeElement;
  });

  it('should allow the optical size to be changed', () => {
    fixture.componentRef.setInput('opticalSize', 24);
    fixture.detectChanges();
    expect(nativeElement.style.fontVariationSettings).toContain("'opsz' 24");
  });

  it('should allow the weight to be changed', () => {
    fixture.componentRef.setInput('weight', 500);
    fixture.detectChanges();
    expect(nativeElement.style.fontVariationSettings).toContain("'wght' 500");
  });

  it('should allow the grade to be changed', () => {
    fixture.componentRef.setInput('grade', 1);
    fixture.detectChanges();
    expect(nativeElement.style.fontVariationSettings).toContain("'GRAD' 1");
  });

  it('should allow the fill to be changed', () => {
    fixture.componentRef.setInput('fill', true);
    fixture.detectChanges();
    expect(nativeElement.style.fontVariationSettings).toContain("'FILL' 1");
  });

  it('should allow the color to be changed', () => {
    fixture.componentRef.setInput('color', 'red');
    fixture.detectChanges();
    expect(nativeElement.style.color).toBe('red');
  });

  it('should insert the name as text content', () => {
    fixture.componentRef.setInput('name', 'test');
    fixture.detectChanges();
    expect(nativeElement.textContent).toBe('test');
  });

  it('should use the default glyphset by default', () => {
    fixture.componentRef.setInput('name', 'test');
    fixture.detectChanges();
    expect(nativeElement.classList).toContain('material-icons-outlined');
  });

  it('should allow the glyphset to be changed', () => {
    fixture.componentRef.setInput('name', 'test');
    fixture.componentRef.setInput('glyphset', 'material-symbols-rounded');
    fixture.detectChanges();
    expect(nativeElement.classList).toContain('material-icons-rounded');
  });

  it('should allow the user to define a custom class', () => {
    nativeElement.classList.add('custom-class');
    fixture.componentRef.setInput('name', 'test');
    fixture.componentRef.setInput('glyphset', 'material-symbols-rounded');
    fixture.detectChanges();
    expect(nativeElement.classList).toContain('material-icons-rounded');
    expect(nativeElement.classList).toContain('custom-class');
  });
});
