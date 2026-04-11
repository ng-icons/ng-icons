import { iconsets } from './iconsets';
import { optimizeIcon } from './optimize-icon';

// Fixtures below are lifted verbatim from the upstream `solar-icons` package
// (`node_modules/solar-icons/icons/SVG/Line Duotone/Security/...`). They are
// intentionally kept in-source so the test can run without the dependency
// installed.

/** Source: Line Duotone / Security / Eye.svg — uses `stroke` only */
const EYE_SVG = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path opacity="0.5" d="M3.27 15.29C2.42 14.19 2 13.63 2 12C2 10.36 2.42 9.8 3.27 8.7C4.97 6.5 7.81 4 12 4C16.18 4 19.02 6.5 20.72 8.7C21.57 9.8 22 10.36 22 12C22 13.63 21.57 14.19 20.72 15.29C19.02 17.5 16.18 20 12 20C7.81 20 4.97 17.5 3.27 15.29Z" stroke="black" stroke-width="1.5"/>
<path d="M15 12C15 13.65 13.65 15 12 15C10.34 15 9 13.65 9 12C9 10.34 10.34 9 12 9C13.65 9 15 10.34 15 12Z" stroke="black" stroke-width="1.5"/>
</svg>`;

/** Source: Line Duotone / Security / Eye Closed.svg — uses `fill="black"` only */
const EYE_CLOSED_SVG = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M2.68 6.70C2.52 6.32 2.08 6.14 1.70 6.31C1.32 6.47 1.14 6.91 1.31 7.29L2.68 6.70Z" fill="black"/>
<path opacity="0.5" d="M12.75 14.0C12.75 13.58 12.41 13.25 12 13.25C11.58 13.25 11.25 13.58 11.25 14.0H12.75Z" fill="black"/>
</svg>`;

/** Source: Line Duotone / Security / Key Minimalistic Square 2.svg — mixes `fill="black"` and `stroke="black"` */
const KEY_MIXED_SVG = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M20.31 3.68L20.84 3.15Z" fill="black"/>
<path opacity="0.5" d="M15.51 8.48C15.16 8.12 15.16 7.54 15.51 7.18Z" fill="black"/>
<path opacity="0.5" d="M22 14.99C21.93 17.78 21.66 19.41 20.55 20.53Z" stroke="black" stroke-width="1.5" stroke-linecap="round"/>
</svg>`;

const HARDCODED_FILL = /fill="(?!none|currentColor)[^"]+"/;
const HARDCODED_STROKE = /stroke="(?!none|currentColor)[^"]+"/;

describe('optimizeIcon', () => {
  describe('with { strokeCurrentColor, fillCurrentColor } (the fixed Solar Line Duotone options)', () => {
    const options = { strokeCurrentColor: true, fillCurrentColor: true };

    it('rewrites fill="black" on child paths to currentColor (regression for #237)', async () => {
      const output = await optimizeIcon(EYE_CLOSED_SVG, options);

      expect(output).not.toMatch(HARDCODED_FILL);
      expect(output).toContain('fill="currentColor"');
      // The root keeps fill="none" so the duotone effect still works off child fills
      expect(output).toContain('fill="none"');
      // The 0.5 opacity on the second path is what produces the two-tone look
      expect(output).toContain('opacity="0.5"');
    });

    it('rewrites stroke="black" to currentColor', async () => {
      const output = await optimizeIcon(EYE_SVG, options);

      expect(output).not.toMatch(HARDCODED_STROKE);
      expect(output).toContain('stroke="currentColor"');
      expect(output).toContain('opacity="0.5"');
    });

    it('rewrites both fill and stroke in a single pass on a mixed icon', async () => {
      const output = await optimizeIcon(KEY_MIXED_SVG, options);

      expect(output).not.toMatch(HARDCODED_FILL);
      expect(output).not.toMatch(HARDCODED_STROKE);
      expect(output).toContain('fill="currentColor"');
      expect(output).toContain('stroke="currentColor"');
    });
  });

  describe('with { strokeCurrentColor } only (regression guard for historical bug)', () => {
    // Documents that `strokeCurrentColor` alone does NOT touch fills — so any
    // iconset whose source SVGs use `fill` for drawing must also set
    // `fillCurrentColor: true`, otherwise hardcoded fills leak through.
    it('leaves fill="black" intact on a fill-only icon', async () => {
      const output = await optimizeIcon(EYE_CLOSED_SVG, {
        strokeCurrentColor: true,
      });

      expect(output).toMatch(HARDCODED_FILL);
      expect(output).toContain('fill="black"');
    });
  });

  describe('Solar Line Duotone iconset config (end-to-end against iconsets.ts)', () => {
    // This test is the TDD red/green anchor for issue #237: it invokes
    // optimizeIcon with whatever options the Solar Line Duotone entry in
    // iconsets.ts declares today. If that entry only sets strokeCurrentColor,
    // the assertion fails; once fillCurrentColor is added, it passes.
    const lineDuotone = iconsets.find(
      entry => entry.output === 'packages/solar-icons/duotone/src/index.ts',
    );

    it('has a Line Duotone entry in iconsets.ts', () => {
      expect(lineDuotone).toBeDefined();
    });

    it('produces no hardcoded fill colors for a fill-only Solar icon', async () => {
      const output = await optimizeIcon(EYE_CLOSED_SVG, lineDuotone!.svg);

      expect(output).not.toMatch(HARDCODED_FILL);
      expect(output).toContain('fill="currentColor"');
    });

    it('produces no hardcoded stroke colors for a stroke-only Solar icon', async () => {
      const output = await optimizeIcon(EYE_SVG, lineDuotone!.svg);

      expect(output).not.toMatch(HARDCODED_STROKE);
      expect(output).toContain('stroke="currentColor"');
    });

    it('produces no hardcoded colors for a mixed Solar icon', async () => {
      const output = await optimizeIcon(KEY_MIXED_SVG, lineDuotone!.svg);

      expect(output).not.toMatch(HARDCODED_FILL);
      expect(output).not.toMatch(HARDCODED_STROKE);
    });
  });
});
