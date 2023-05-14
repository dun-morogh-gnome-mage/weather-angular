import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { Forecast } from "src/app/weather.model";
@Component ({
    selector : "app-detail-table",
    templateUrl: './table.detail.component.html',
})
export class detailTable implements OnInit {
    constructor(){
    };
    // state : string = "right";
    @Input() latitude : number;
    @Input() longitude : number;
    @Output() setTable = new EventEmitter<number>();
    @Output() animate = new EventEmitter<number>();
    @Input() selected : Forecast;

    @Input() status : string;

    @Input() tweetInfo : { city : string, state : string, date : string};
    tweetText : string;
    // move from right to default position
    ngOnInit() {

       this.setTable.emit(3); 
       this.createTweet();
    }


    // called when detail is at default
    switchBack() {

        this.setTable.emit(0);
        this.animate.emit(0); // shift to right
    }

    createTweet() {
        this.tweetText = `The temperature in ${this.tweetInfo.city}, ${this.tweetInfo.state} on ${this.tweetInfo.date} is ${this.selected.temperature}°F. The weather conditions are ${this.status}`;
    }


}