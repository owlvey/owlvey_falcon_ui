import { Component, OnInit, ViewChildren } from '@angular/core';
import { SourceService } from '../source.service';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';


@Component({
  selector: 'app-list-Source',
  templateUrl: './list-Source.component.html',
  styleUrls: ['./list-Source.component.scss']
})
export class ListSourceComponent implements OnInit {

  isLoading: boolean = false;
  sources: any[];
  actionConfirmWord: string;

  constructor(
    private location: Location,
    private sourceService: SourceService) { }
  
  ngOnInit() {    
      
  }
}