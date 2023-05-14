import {Component, EventEmitter, Output} from "@angular/core"
// import { Forecast } from "../weather.model";
@Component ({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html'
})


export class navigationComponent {
    @Output() clickedLinks = new EventEmitter<number>();
    constructor(){};
    activeLink : number = 0;
    
    tableClicked() {
      this.clickedLinks.emit(0);
      this.activeLink = 0;
    }
    detailChartClicked() {
      this.clickedLinks.emit(1);
      this.activeLink = 1;
    }
    chartClicked() {
      this.clickedLinks.emit(2);
      this.activeLink = 2;
    }
    

}
