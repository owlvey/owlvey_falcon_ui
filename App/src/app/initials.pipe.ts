import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'initials'
})
export class InitialsPipe implements PipeTransform {

  transform(name: string, args?: any): any {
    let initials: string = '';
    let splittedName: string[] = name.split(' ');
    if (splittedName.length >= 2) {
      initials = splittedName[0].substring(0, 1).toUpperCase() + splittedName[1].substring(0, 1).toUpperCase();
    } else {
      initials = splittedName[0].substring(0, 1).toUpperCase();
    }

    return initials;
  }

}
