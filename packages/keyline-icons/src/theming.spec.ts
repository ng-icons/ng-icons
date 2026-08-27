import * as duotoneIcons from '../duotone/src/index';
import * as fillIcons from '../fill/src/index';
import * as strokeIcons from './index';

// The properties NgIcon themes against: no colour of its own, and a viewBox
// instead of intrinsic dimensions.
const HARDCODED = /(fill|stroke)="(?!none|currentColor)[^"]+"/;
const ROOT = /^<svg [^>]*>/;

describe.each([
  ['stroke', strokeIcons as Record<string, string>],
  ['duotone', duotoneIcons as Record<string, string>],
  ['fill', fillIcons as Record<string, string>],
])('Keyline %s variant', (_variant, icons) => {
  const entries = Object.entries(icons);

  const offenders = (predicate: (svg: string) => boolean): string[] =>
    entries.filter(([, svg]) => predicate(svg)).map(([name]) => name);

  it('has icons to scan', () => {
    expect(entries.length).toBeGreaterThan(0);
  });

  it('takes its colour from the color input', () => {
    expect(offenders(svg => HARDCODED.test(svg))).toEqual([]);
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
