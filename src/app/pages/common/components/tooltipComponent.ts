import { NgModule, Component, Input } from '@angular/core';

@Component({
    selector: 'tooltip-view',
    template: `    
        <p> {{ rowData.name }}  <abbr [title]='rowData.tooltip'> <nb-icon icon="info-outline"></nb-icon> </abbr>  </p>          
    `,
  })
  
  @NgModule()
  export class TooltipComponent{
    renderValue: string;
  
    @Input() value: string | number;
    @Input() rowData: any;
  }
  