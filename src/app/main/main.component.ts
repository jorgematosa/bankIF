import { MainService } from './main.service';
import { Component, OnInit, Input } from '@angular/core';
import { Router } from '../../../node_modules/@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  clicked = false;
  option = 'No Option Selected';

  selectedService = '';


  constructor(public mainService: MainService) { }

  ngOnInit() {
    this.mainService.option.subscribe(
      (option: string) => {
        this.option = option;
      });
  }

  onClick() {
    this.clicked = true;
  }

}
