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
    .replace(/([a-z\d])([A-Z])/g, '$1_$2')
    .toLowerCase()
    .replace(/[ _]/g, '-');
}
