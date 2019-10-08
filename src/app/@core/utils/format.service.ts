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

}
