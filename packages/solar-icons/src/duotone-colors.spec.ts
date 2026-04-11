import * as boldDuotoneIcons from '../bold-duotone/src/index';
import * as duotoneIcons from '../duotone/src/index';

/**
 * Regression guard for ng-icons/ng-icons#237. The two duotone Solar variants
 * must render in `currentColor` — no hardcoded fills or strokes may leak
 * through the generator. `fill="none"` on the root <svg> is expected and
 * preserved; everything else should be `currentColor`.
 */
const HARDCODED_FILL = /fill="(?!none|currentColor)[^"]+"/;
const HARDCODED_STROKE = /stroke="(?!none|currentColor)[^"]+"/;

describe.each([
  ['duotone', duotoneIcons as Record<string, string>],
  ['bold-duotone', boldDuotoneIcons as Record<string, string>],
])('SolarIcons %s variant uses currentColor', (_variant, icons) => {
  const entries = Object.entries(icons);

  it('has icons to scan', () => {
    expect(entries.length).toBeGreaterThan(0);
  });

  it.each(entries)('%s has no hardcoded fill colors', (_name, svg) => {
    expect(svg).not.toMatch(HARDCODED_FILL);
  });

  it.each(entries)('%s has no hardcoded stroke colors', (_name, svg) => {
    expect(svg).not.toMatch(HARDCODED_STROKE);
  });
});
