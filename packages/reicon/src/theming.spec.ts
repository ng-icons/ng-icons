import * as duotoneIcons from '../duotone/src/index';
import * as fillIcons from '../fill/src/index';
import * as outlineIcons from './index';

// Reicon's markup is assembled from path fragments rather than copied from SVG
// files, so the properties NgIcon themes against are worth asserting.
const HARDCODED = /(fill|stroke)="(?!none|currentColor)[^"]+"/;
const SHAPE = /<(path|circle|rect|line|polyline|polygon|ellipse) [^>]*>/g;
const ROOT = /^<svg [^>]*>/;

describe.each([
  ['outline', outlineIcons as Record<string, string>],
  ['fill', fillIcons as Record<string, string>],
  ['duotone', duotoneIcons as Record<string, string>],
])('Reicon %s variant', (_variant, icons) => {
  const entries = Object.entries(icons);

  const offenders = (predicate: (svg: string) => boolean): string[] =>
    entries.filter(([, svg]) => predicate(svg)).map(([name]) => name);

  it('has icons to scan', () => {
    expect(entries.length).toBeGreaterThan(0);
  });

  it('takes its colour from the color input', () => {
    // Reicon sets no fill on the root, so a shape with neither attribute would
    // paint in the browser default rather than currentColor.
    expect(
      offenders(
        svg =>
          HARDCODED.test(svg) ||
          (svg.match(SHAPE) ?? []).some(
            shape => !shape.includes('fill=') && !shape.includes('stroke='),
          ),
      ),
    ).toEqual([]);
  });

  it('scales with the size input and the host font size', () => {
    expect(
      offenders(svg => {
        const root = ROOT.exec(svg)![0];
        return !root.includes('viewBox=') || / (width|height)=/.test(root);
      }),
    ).toEqual([]);
  });

  it('exposes its stroke width to the strokeWidth input', () => {
    expect(
      offenders(
        svg =>
          svg.includes('stroke-width') &&
          !svg.includes('var(--ng-icon__stroke-width'),
      ),
    ).toEqual([]);
  });
});
