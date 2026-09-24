import { vi } from 'vitest';
import { trustedHTMLFromString } from './trusted-types';

// the policy is cached per module, so each case imports a fresh copy
let copy = 0;
const importFresh = (): Promise<typeof import('./trusted-types')> =>
  import(/* @vite-ignore */ `./trusted-types?copy=${copy++}`);

describe('trustedHTMLFromString', () => {
  afterEach(() => vi.unstubAllGlobals());

  // the tests run in chromium, which implements Trusted Types natively
  it('should wrap the string in TrustedHTML without changing it', () => {
    const html = trustedHTMLFromString('<svg></svg>');
    expect(Object.prototype.toString.call(html)).toBe('[object TrustedHTML]');
    expect(String(html)).toBe('<svg></svg>');
  });

  it('should create the policy once and reuse it', async () => {
    const createPolicy = vi.fn(
      (_name: string, rules: { createHTML(html: string): string }) => rules,
    );
    vi.stubGlobal('trustedTypes', { createPolicy });
    const { trustedHTMLFromString } = await importFresh();

    trustedHTMLFromString('<svg></svg>');
    trustedHTMLFromString('<svg></svg>');
    expect(createPolicy).toHaveBeenCalledOnce();
    expect(createPolicy).toHaveBeenCalledWith('ng-icons', expect.anything());
  });

  it('should return the string when Trusted Types are unavailable', async () => {
    vi.stubGlobal('trustedTypes', undefined);
    const { trustedHTMLFromString } = await importFresh();
    expect(trustedHTMLFromString('<svg></svg>')).toBe('<svg></svg>');
  });

  it('should return the string when the policy name is not allowed', async () => {
    const createPolicy = vi.fn(() => {
      throw new TypeError('Policy "ng-icons" disallowed.');
    });
    vi.stubGlobal('trustedTypes', { createPolicy });
    const { trustedHTMLFromString } = await importFresh();

    expect(trustedHTMLFromString('<svg></svg>')).toBe('<svg></svg>');
    // a rejected policy is not retried for every icon
    trustedHTMLFromString('<svg></svg>');
    expect(createPolicy).toHaveBeenCalledOnce();
  });
});
