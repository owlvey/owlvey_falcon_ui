import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { delay, share } from 'rxjs/operators';

@Injectable()
export class FormatService {

    getGridDateFromDate(date: Date): string {
        //return `${date.getFullYear()}-${date.getMonth()}-${date.getDay()}`;
        date = new Date(date);
        return date.getUTCFullYear() + '-' +
           ('0' + (date.getUTCMonth() + 1)).slice(-2) + '-' +
           ('0' + date.getUTCDate()).slice(-2);
    }

    getTooltipDateFromDate(date: Date): string {
        date = new Date(date);
        return date.getUTCFullYear() + '-' +
           ('0' + (date.getUTCMonth() + 1)).slice(-2) + '-' +
           ('0' + date.getUTCDate()).slice(-2) + ' : ';
    }

    round2Decimals(target: number){
        return Math.round( ( target * 100) ) /100;          
    }
    round3Decimals(target: number){
        return Math.round( ( target * 1000) ) /1000;          
    }

    compareIconNumberColumn (direction: any, a: any, b: any) {          

        if ( typeof a !== 'string' || typeof b !== 'string')
        {
          return 0;
        }          
        a = a.replace(a.substring(0, a.indexOf(">") + 1), "");
        a = a.replace(a.substring(a.indexOf("<"), a.length), "");
        b = b.replace(b.substring(0, b.indexOf(">") + 1), "");
        b = b.replace(b.substring(b.indexOf("<"), b.length), "");

        let number_a = Number(a);
        let number_b = Number(b);
        
        if (number_a < number_b) {
            return -1 * direction;
        }
        if (number_a > number_b) {
            return direction;
        }
        return 0;
      }
}
