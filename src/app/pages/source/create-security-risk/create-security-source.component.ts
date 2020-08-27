import { Component, OnInit } from '@angular/core';
import { NbWindowRef } from '@nebular/theme';


@Component({
  selector: 'app-create-security-source',
  templateUrl: './create-security-source.component.html',
  styleUrls: ['./create-security-source.component.scss']
})
export class CreateSecuritySourceComponent  {
  currentSource: any = null;
  currentThreat: any = null;

  constructor(public windowRef: NbWindowRef) {
    let state: any = windowRef.config.context;
    this.currentSource = state.currentSource;

  }
  onPreviousSecurityThreat(event){}
  onNextSecurityThreat(event){}
  onNewSecurityRiskSave(event){}

  close() {
    this.windowRef.close();
  }

}
