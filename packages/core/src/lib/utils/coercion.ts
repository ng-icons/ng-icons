export function coerceCssPixelValue(value: string): string {
  return value == null ? '' : /^\d+$/.test(value) ? `${value}px` : value;
}
