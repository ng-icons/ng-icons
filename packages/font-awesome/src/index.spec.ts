import * as brands from '../brands/src';
import * as regular from '../regular/src';
import * as solid from '../solid/src';
import * as icons from './index';

describe('FontAwesome Icons', () => {
  it('should ensure the export names have not changed unexpectedly', () => {
    expect(Object.keys(icons)).toMatchSnapshot();
  });
});

// The root is a placeholder; the usable icons live in these entry points.
describe('Font Awesome Free 7.3.1', () => {
  it.each([
    ['solid', solid, 2001],
    ['regular', regular, 273],
    ['brands', brands, 609],
  ] as const)('exports the complete %s SVG set', (_style, icons, count) => {
    expect(Object.keys(icons)).toHaveLength(count);
    for (const [name, svg] of Object.entries(icons)) {
      const document = new DOMParser().parseFromString(svg, 'image/svg+xml');
      expect(document.querySelector('parsererror'), name).toBeNull();
      expect(document.documentElement.tagName, name).toBe('svg');
      expect(document.documentElement.hasAttribute('viewBox'), name).toBe(true);
      expect(svg, name).toContain('currentColor');
    }
  });

  it('includes new icons and upstream aliases in all styles', () => {
    expect(solid.faSolidAlarmClock).toContain('<path');
    expect(regular.faAlarmClock).toContain('<path');
    expect(brands.faBrandClaude).toContain('<path');
    expect(solid.faSolidContactBook).toBe(solid.faSolidAddressBook);
    expect(regular.faContactBook).toBe(regular.faAddressBook);
    expect(brands.faBrandTwitterSquare).toBe(brands.faBrandSquareTwitter);
  });

  it('does not export vector-square or its unavailable Free successor', () => {
    expect(solid).not.toHaveProperty('faSolidVectorSquare');
    expect(solid).not.toHaveProperty('faSolidDrawSquare');
  });
});
