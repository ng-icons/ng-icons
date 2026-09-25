// lib.dom does not declare Trusted Types, so type only what we use
type TrustedTypePolicy = { createHTML(html: string): unknown };

let policy: TrustedTypePolicy | null | undefined;

/**
 * Wrap an html string in a TrustedHTML value when Trusted Types are available,
 * so it can be assigned to innerHTML under `require-trusted-types-for 'script'`.
 */
export function trustedHTMLFromString(html: string): unknown {
  // create the policy once, createPolicy throws if the CSP does not allow the name
  if (policy === undefined) {
    const { trustedTypes } = globalThis as {
      trustedTypes?: {
        createPolicy(
          name: string,
          rules: { createHTML(html: string): string },
        ): TrustedTypePolicy;
      };
    };

    try {
      policy =
        trustedTypes?.createPolicy('ng-icons', { createHTML: s => s }) ?? null;
    } catch {
      policy = null;
    }
  }

  return policy?.createHTML(html) ?? html;
}
