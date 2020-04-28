import { NgModule, Component, Input } from '@angular/core';

@Component({
    selector: 'tooltip-view',
    template: `    
        <span> {{ rowData.name }}  <abbr [title]='rowData.tooltip'> <nb-icon icon="info-outline"></nb-icon> </abbr>  </span>          
    `,
  })
  
  @NgModule()
  export class TooltipComponent{
    renderValue: string;
  
    @Input() value: string | number;
    @Input() rowData: any;
  }
  