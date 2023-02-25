import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'formatCurrency'})
export class FormatCurrencyPipe implements PipeTransform {
  constructor() {}

  transform(value: number): string {
    const s: string = value.toString();
    const f: string = s.slice(0, s.length - 2);
    const l: string = s.slice(s.length - 2, s.length);
    return f + ',' + l;
  }
}
