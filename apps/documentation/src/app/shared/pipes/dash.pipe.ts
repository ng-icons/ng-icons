import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dash',
})
export class DashPipe implements PipeTransform {
  transform(value: string): string {
    return dasherize(value);
  }
}

export function dasherize(value: string): string {
  return value
    .replace(/([A-Z])/g, ' $1')
    .trim()
    .split(' ')
    .join('-')
    .toLowerCase();
}
