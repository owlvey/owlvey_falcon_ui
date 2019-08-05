import { Component, OnInit, OnChanges, SimpleChanges, Input, ViewChild, ElementRef } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnChanges, OnInit {
  @Input() loading: boolean;
  isLoading: boolean;
  @ViewChild("progress") private progress: ElementRef; 
  constructor() {
  }

  ngOnInit() {
    //setTimeout(() => {
    //  $(this.progress.nativeElement).animate({
    //    width: "40%"
    //  }, 500)
    //}, 0)
  }

  ngOnChanges(changes: SimpleChanges) {
    if (!changes.loading.currentValue) {
      //$(this.progress.nativeElement).animate({
      //  width: "100%"
      //}, 40)
      setTimeout(() => {
        this.isLoading = false;
      }, 50)
    } else {
      this.isLoading = true;
    }
  }

}
