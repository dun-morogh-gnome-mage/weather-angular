import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {Forecast} from '../../weather.model';
@Component({
    selector : 'app-favorite-city',
    templateUrl :'./favorite-city.component.html',
})
export class favoriteCityComponent implements OnInit {
    constructor() {}
    isClicked : boolean = false;
    @Input() storedCity : {forecastFive : Forecast[] , forecastFif : Forecast[] };
    @Input() location : {city : string, state : string};
    @Input() cord : {lat : number , lng : number};
    @Output() direct = new EventEmitter<boolean>();
    
    addFavorite() {
        this.isClicked = !this.isClicked;
        if (this.isClicked && !localStorage.getItem(this.location.city)) {
            localStorage.setItem(this.location.city,  `${JSON.stringify({forecast : this.storedCity, 
                state: this.location.state, 
                lat : this.cord.lat,
                lng : this.cord.lng,
                city : this.location.city})}`);
        } else {
            localStorage.removeItem(this.location.city);
        }
    }
    ngOnInit() {
        if (localStorage.getItem(this.location.city)) {
            this.isClicked = true;
        }
    }

    getFirstDetail() {
        this.direct.emit(true);
    }


}