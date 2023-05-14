import {Component, OnInit, ViewChild, Output, EventEmitter} from '@angular/core';
import { NgForm } from '@angular/forms';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { HttpClient} from '@angular/common/http';
import { Forecast } from '../weather.model';

@Component({
    selector: "app-form",
    templateUrl: "./form.component.html",
    styleUrls: ['./form.component.css']
})

export class formComponent implements OnInit {
    @ViewChild('f', { static: false }) signupForm: NgForm;
    end_point : string = "http://localhost:8080/auto?";
    IP_URL : string = "https://ipinfo.io/json?";
    WEATHER_URL : string = "http://localhost:8080/tomorrow?";
    TOKEN : string = "d05fe0b97ee7ef";


    @Output() forecastReceived = new EventEmitter<Forecast[][]>();
    @Output() submitConfirmed = new EventEmitter<boolean>();
    @Output() cityAndState = new EventEmitter<string>();
    @Output() sendLat = new EventEmitter<number>();
    @Output() sendLng = new EventEmitter<number>();
    @Output() clearData = new EventEmitter<boolean>();
    // user entered location
    enteredCity : string = "";
    enteredStreet : string = "";
    enteredState : string = "Default";


    submitted : boolean = false;
    validation : boolean = false;
    isChecked : boolean = false;

    // ip returned address
    retrivedCity : string = "";
    retrivedState : string = "";

    // lat & lng from ip and google api
    lat : number;
    lng : number;

    // auto suggested location
    cities : string[] = [];
    states : string[] = [];
    myControl = new FormControl();

    filteredOptions: Observable<string[]>;
    constructor(public http : HttpClient) {

    }
    ngOnInit() {
        this.filteredOptions = this.myControl.valueChanges
        .pipe(
            startWith(''),
            map(value => this._filter(value))
        );
    }
    _filter(value: string): string[] {
        const filterValue = value.toLowerCase();

        return this.cities.filter(city => city.includes(filterValue));
    }
    async getCity(){
        if (this.enteredCity.length < 3) return;
        if (this.cities.length > 0) {
            while (this.cities.length > 0) {
                this.cities.pop();
            }
        }
        if (this.states.length > 0) {
            while (this.states.length > 0) {
                this.states.pop();
            }
        }
        let city = this.enteredCity;
        let res = await this.http.get(this.end_point + `input=${city}`).toPromise() as any;
        for (let city of res.r1) {
            this.cities.push(city);
        } 
        for (let state of res.r2) {
            this.states.push(state);
        }
    };

    getState(i) {
        this.enteredState = this.states[i];
    }
    clearForm() {
        this.signupForm.reset();
        this.enteredState = "Default";
        this.lat = undefined;
        this.lng = undefined;
        this.signupForm.controls.userCity.enable();
        this.signupForm.controls.userStreet.enable();
        this.signupForm.controls.userState.enable();
        this.validation = false;
        this.submitted = false;
        this.isChecked = false;
        this.retrivedCity = undefined;
        this.retrivedState = undefined;
        this.clearData.emit(true);
    }
    async submitForm() {

        if (this.validateInput() !== false) {
            let result = [];
        this.submitConfirmed.emit(true);
        if (this.lng != undefined && this.lat != undefined) {
            let res = await this.http.get(this.WEATHER_URL + `lat=${this.lat}&lng=${this.lng}&checked=${this.isChecked}`).toPromise() as any;
            let five = res.five.intervals;
            let fif = res.fifteen.intervals;

            const {fiveDay,fifDay} = this.populateResult(five,fif);
            result.push(fiveDay);
            result.push(fifDay);
            this.cityAndState.emit(this.retrivedCity + "," + this.retrivedState);
            this.forecastReceived.emit(result);
            
  
        } else {
            let res = await this.http.get(this.WEATHER_URL + `street=${this.enteredCity}&city=${this.enteredCity}&state=${this.enteredState}&checked=${this.isChecked}`).toPromise() as any;
            let five = res.five.intervals;
            let fif = res.fifteen.intervals;
            this.lat = res.lat;
            this.lng = res.lng;
            const {fiveDay,fifDay} = this.populateResult(five,fif);
            result.push(fiveDay);
            result.push(fifDay);
            this.forecastReceived.emit(result);
            this.cityAndState.emit(this.enteredCity + "," + this.enteredState);
        }
        this.sendLat.emit(this.lat);
        this.sendLng.emit(this.lng);
        this.submitConfirmed.emit(false);
        }
    }
    validateInput() {
        if (this.enteredCity != null || this.enteredStreet != null) {
            this.validation = (this.enteredCity.length > 0 && this.enteredStreet.length > 0) || this.isChecked == true;
        }
        return this.validation;
    }
    async checkBox() {
        this.isChecked = !this.isChecked;
        if (this.isChecked == false) {
            this.signupForm.controls.userCity.enable();
            this.signupForm.controls.userStreet.enable();
            this.signupForm.controls.userState.enable();
            this.lat = undefined;
            this.lng = undefined;
        } else {
            // this.signupForm.reset();
            this.signupForm.controls.userCity.disable();
            this.signupForm.controls.userStreet.disable();
            this.signupForm.controls.userState.disable();
            this.validation = true;
            let res = await this.http.get(this.IP_URL + `token=${this.TOKEN}`).toPromise() as any;
            let loc = res.loc.split(',');
            this.retrivedCity = res.city;
            this.retrivedState = res.region;
            this.lat = parseFloat(loc[0]);
            this.lng = parseFloat(loc[1]);
        }
    }
    populateResult(five,fif) {
        let fiveDay = [];
        let fifDay = [];
        for (let i = 0; i < five.length; i++) {
            fiveDay.push(new Forecast(five[i].startTime,five[i].values.cloudCover,five[i].values.humidity,five[i].values.moonPhase,five[i].values.precipitationProbability,five[i].values.precipitationType,
                                    five[i].values.pressureSeaLevel, five[i].values.sunriseTime,five[i].values.sunsetTime,five[i].values.temperature,five[i].values.temperatureApparent,
                                    five[i].values.temperatureMax,five[i].values.temperatureMin,five[i].values.uvIndex,five[i].values.visibility,five[i].values.weatherCode,five[i].values.windDirection,five[i].values.windSpeed));
        }
        for (let i = 0; i < fif.length; i++) {
           
            
            fifDay.push(new Forecast(fif[i].startTime,fif[i].values.cloudCover,five[i].values.humidity,fif[i].values.moonPhase,fif[i].values.precipitationProbability,fif[i].values.precipitationType,
                                        fif[i].values.pressureSeaLevel, fif[i].values.sunriseTime,fif[i].values.sunsetTime,fif[i].values.temperature,fif[i].values.temperatureApparent,
                                        fif[i].values.temperatureMax,fif[i].values.temperatureMin,fif[i].values.uvIndex,fif[i].values.visibility,fif[i].values.weatherCode,fif[i].values.windDirection,fif[i].values.windSpeed));
        }

        return {fiveDay,fifDay};
    }
       
    
}

