import { Component } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'ngx-footer',
  styleUrls: ['./footer.component.scss'],
  templateUrl: './footer.component.html',    
})
export class FooterComponent {
  options: any = {};
  constructor(){
      this.options = environment;
  }
}
