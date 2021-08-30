import { KeyValue } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search',
})
export class SearchPipe implements PipeTransform {
  transform(
    items: KeyValue<string, unknown>[],
    filter: string,
  ): KeyValue<string, unknown>[] {
    return items.filter(item =>
      item.key.toLowerCase().includes(filter.toLowerCase()),
    );
  }
}
