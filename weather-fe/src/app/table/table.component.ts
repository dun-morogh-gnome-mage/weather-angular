import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Forecast } from '../weather.model';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})

export class tableComponent{
    @Input() forecastFiveDays : Forecast[]; // for second chart only
    @Input() forecastFifteenDays : Forecast[]; // for first chart and detail weather table and need image!


    // @Input() received : boolean;
    @Input() path : any[];
    @Input() dateString : string[];



    @Output() clickedRow = new EventEmitter<number>();
    selectSpec(r : number) {
      this.clickedRow.emit(r);
    }
    

    constructor() {        
    };
 

}