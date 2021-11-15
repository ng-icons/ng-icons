/**
 * Hyphenated to UpperCamelCase
 */
export function toUpperCamelCase(str: string): string {
  return toCapitalCase(toPropertyName(str));
}

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

/**
 * Capitalizes the first letter of a string
 */
export function toCapitalCase(str: string): string {
  return str.charAt(0).toUpperCase() + str.substr(1);
}
