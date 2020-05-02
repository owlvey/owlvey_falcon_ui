import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { delay, share } from 'rxjs/operators';
import { strictEqual } from 'assert';

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

    buildStatusColumn(target: number, title: string = '',  values: Array<number>=null, classes: Array<string>=null){                        
        if (!values){
            values = [0.40, 0.80, 0.95, 1];
            classes = ['text-danger', 'text-warning', 'text-warning', 'text-success']
        }

        for (let index = 0; index < values.length; index++) {            
            if ( target <= values[index]){
                return `<i class="fas fa-circle ${classes[index]} text-center d-block" title=${title}> ${target.toFixed(3)} </i>`;    
            }
        }
        return `<i class="fas fa-circle ${classes[ classes.length - 1 ]} text-center d-block" title=${title}> ${target.toFixed(3)} </i>`;        
    }

    buildTrendColumn(target: number, previous: number){                                
        const diff =  target - previous;               
        const title = 'Efectiveness:' + String(previous);
        if (diff === 0){
            return `<i class='fas text-info text-center text-nowrap' title=${title}> ${diff.toFixed(3)} </i>`;
        }
        else if (target >= previous){
            return `<i class='fas fa-arrow-up text-success text-center text-nowrap' title=${title}> ${diff.toFixed(3)} </i>`;
        }
        else{
            return `<i class='fas fa-arrow-down text-danger text-center text-nowrap' title=${title}> ${diff.toFixed(3)} </i>`;
        }
    }
    buildTrendColumnValue(target: number, previous: number){                                
        const diff =  target - previous;               
        const title = 'Diff:' + diff.toFixed(3);
        if (diff === 0){
            return `<i class='fas text-info text-center text-nowrap' title=${title}> ${target.toFixed(3)} </i>`;
        }
        else if (target >= previous){
            return ` <i class='fas fa-arrow-up text-success text-center text-nowrap' title=${title}> ${target.toFixed(3)} </i>`;
        }
        else{
            return `<i class='fas fa-arrow-down text-danger text-center text-nowrap' title=${title}> ${target.toFixed(3)} </i>`;
        }
    }

    buildDebtColumnValue(target: number, previous: number){
        target = target * 100;
        previous = previous * 100;
        const diff =  target - previous;               
        const title = 'Diff:' + diff.toFixed(3);
        if (target === 0){
            return `<i class='fas fa-star text-center text-nowrap text-success' title=${title}> ${target.toFixed(3)} </i>`;
        }
        else if (target >= previous){
            return ` <i class='fas fa-arrow-up text-danger text-center text-nowrap' title=${title}> ${target.toFixed(3)} </i>`;
        }
        else{
            return `<i class='fas fa-arrow-down text-warning text-center text-nowrap' title=${title}> ${target.toFixed(3)} </i>`;
        }
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
