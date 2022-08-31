/**
 * Hyphenated to lowerCamelCase
 */
export function toPropertyName(str: string): string {
  return str
    .replace(/([^a-zA-Z0-9])+(.)?/g, (_, __, chr) =>
      chr ? chr.toUpperCase() : '',
    )
    .replace(/[^a-zA-Z\d]/g, '')
    .replace(/^([A-Z])/, m => m.toLowerCase());
}
