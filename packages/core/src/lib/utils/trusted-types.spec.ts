import { trustedHTMLFromString } from './trusted-types';

describe('trustedHTMLFromString', () => {
  // the tests run in chromium, which implements Trusted Types natively
  it('should wrap the string in TrustedHTML without changing it', () => {
    const html = trustedHTMLFromString('<svg></svg>');
    expect(Object.prototype.toString.call(html)).toBe('[object TrustedHTML]');
    expect(String(html)).toBe('<svg></svg>');
  });
});
