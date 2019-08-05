import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderBy'
})
export class OrderByPipe implements PipeTransform {

  transform(array: any, args?: any): any {
    if (!array)
      return null;

    array.sort((a: any, b: any) => {
      if (a[args] < b[args]) {
        return -1;
      } else if (a[args] > b[args]) {
        return 1;
      } else {
        return 0;
      }
    });
    return array;
  }
}
