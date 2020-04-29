import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'miliseconds'
})
export class MilisecondsPipe implements PipeTransform {

  transform(value: number, ...args: unknown[]): number {
    return value / 1000;
  }

}
