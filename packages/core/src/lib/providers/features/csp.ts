import {
  ContentSecurityPolicyFeature,
  NgIconFeatureKind,
  createFeature,
} from './features';

/**
 * Process icons in a way that is compliant with the content security policy
 */
export function withContentSecurityPolicy(): ContentSecurityPolicyFeature {
  return createFeature(NgIconFeatureKind.ContentSecurityPolicyFeature, []);
}
