import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Forecast } from 'src/app/weather.model';

@Component({
    selector : 'app-favorite-list',
    templateUrl :'./favorite-list.component.html',
    styleUrls : ['./favorite-list.component.css']
})
export class favoriteListComponent implements OnInit {
    constructor() {}
    storedItems : {forecast : { forecastFive : Forecast[], forecastFif: Forecast[]}, 
    state : string, 
    lat : number, 
    lng : number, 
    city : string}[] = []; //store data from local storage

    length : number = 0;
    @Output() clickLink = new EventEmitter<number>();
    // send data to app to populate data
    @Output() retrivedLocalData = new EventEmitter<{forecast : { forecastFive : Forecast[], forecastFif: Forecast[]},
     state : string,
     lat : number,
     lng : number,
     city : string}>();
    ngOnInit() {
        this.length = localStorage.length;
        this.getDataFromLocal();
    }
    getDataFromLocal() {
        if (localStorage.length != 0) {
            for (let i = 0; i < localStorage.length; i++) {
                console.log(JSON.parse(localStorage.getItem(localStorage.key(i))));
                this.storedItems.push(JSON.parse(localStorage.getItem(localStorage.key(i))));
                // this.cities.push(localStorage.key(i));
            }
        }
        
    }

    removeItem(r : number) {
        localStorage.removeItem(this.storedItems[r].city);
        // this.retrivedLocalData.emit({forecast : {forecastFive : [], forecastFif :[]}, // if removed, table should not display the last displayed data
        //                         state : undefined ,
        //                         lat : undefined,
        //                         lng : undefined,
        //                         city : undefined });
        this.storedItems.splice(r,1);
        this.length--;
    }
    retriveTable(r : number) {
        this.retrivedLocalData.emit({forecast : {forecastFive : this.storedItems[r].forecast.forecastFive, forecastFif: this.storedItems[r].forecast.forecastFif},
                                        state : this.storedItems[r].state,
                                        lat : this.storedItems[r].lat,
                                        lng : this.storedItems[r].lng,
                                        city: this.storedItems[r].city});
        this.clickLink.emit(0);

    }
    

}