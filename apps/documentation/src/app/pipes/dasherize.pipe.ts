import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dasherize',
})
export class DasherizePipe implements PipeTransform {
  transform(value: string): string {
    return value
      .replace(/([a-z\d])([A-Z])/g, '$1_$2')
      .toLowerCase()
      .replace(/[ _]/g, '-');
  }
}
