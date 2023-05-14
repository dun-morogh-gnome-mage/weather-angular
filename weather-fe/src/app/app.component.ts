import { Component, EventEmitter, Output } from '@angular/core';

import { Forecast } from './weather.model';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {


  title = 'weather-fe';

  clickedLink : number = 0; //determine which link is clicked

  inProgress : boolean = false; //determine whether data is receiving from backend

  forecastFive : Forecast[];
  forecastFif : Forecast[];
  
  forecastLoc : string; // title to output
  dateInfo : string; // tile to output for detail panel

  forecastlat: number;
  forecastlng : number;
  urls : any[]= [];
  dateList : string[] = [];

  activeButton : boolean = true; // true for result, false for favorite

  selectedRow : number;
  receivedData : boolean = false; //determine whether data is received from form
  @Output() hasBeenClicked = new EventEmitter<boolean>();
  // setTable : number = 0;
  city : string;
  state : string;

  storeForecast(forecast : Forecast[][]) {
    this.forecastFif = forecast[1];
    this.forecastFive = forecast[0];
    for (let i = 0; i< this.forecastFif.length; i++) {
      let cur_time = new Date(Date.parse(this.forecastFif[i].startTime));
      let set_time = new Date(Date.parse(this.forecastFif[i].sunsetTime.slice(0, 19)));
      let rise_time = new Date(Date.parse(this.forecastFif[i].sunriseTime.slice(0, 19)));
      let date = this.convertDate(cur_time);
      this.dateList.push(date);
      let status = this.determineStatus(this.forecastFif[i].weatherCode,cur_time,set_time,rise_time);

      this.urls.push(status);
    }
    this.clickedLink = 0;
    this.activeButton = true;
    this.receivedData = true;
  }

  directTable(f : boolean) {
    this.activeButton = true;
    this.clickedLink = 3;
    this.selectedRow = 0;
  }
  toggleButton(f : number) {
    if (f == 0) {
      this.activeButton = true;
    } else {
      this.activeButton = false;
      this.clickedLink = 4;
    }
  }
  storeStatus(inP : boolean) {
    this.inProgress = inP;
  }



  setClickedLink(link : number) {
    this.clickedLink = link;
    if (link == 0) {
      this.activeButton = true;
    }
  }

  storeTitle(cityAndState : string) {
    let result = cityAndState.split(",");
    this.city = result[0];
    this.state = result[1];
    this.forecastLoc = "Forecast at " + result[0] + ", " + result[1];
  } 

  setClickedRow(row : number) {
    this.clickedLink = 3;
    this.selectedRow = row;
    this.dateInfo = this.dateList[row];
  }


  clear(s : boolean) {
    if (s == true) {
      this.receivedData = false;
      this.clickedLink = 0;
      this.activeButton = true; 
    }
  }
  setLat(lat : number) {
    this.forecastlat = lat;
  }
  setLng(lng : number) {
    this.forecastlng = lng;
  }
  getDataFromFavorite(data : {forecast : { forecastFive : Forecast[], forecastFif: Forecast[]}, 
    state : string, 
    lat : number, 
    lng : number, 
    city : string}) {

    this.storeForecast([data.forecast.forecastFive,data.forecast.forecastFif]);
    this.setLat(data.lat);
    this.setLng(data.lng);
    this.storeTitle(`${data.city},${data.state}`);
  }
  convertDate(date :Date) {
        let day = date.getDay();
        let result = "";
        switch (day) {
            case 0:
            result += "Sunday, ";
            break;
            case 1:
            result += "Monday, ";
            break
            case 2:
            result += "Tuesday, ";
            break;
            case 3:
            result += "Wednesday, ";
            break;
            case 4:
            result += "Thursday, ";
            break;
            case 5:
            result += "Friday, ";
            break;
            case 6:
            result += "Saturday, ";
            break;
        }
        let num_day = date.getDate();
        if (num_day < 10) {
            result += "0" + num_day + " ";
        }
        else {
            result += num_day + " ";
        }

        let month = date.getMonth();
        switch (month) {
            case 0:
            result += "Jan ";
            break;
            case 1:
            result += "Feb ";
            break;
            case 2:
            result += "Mar ";
            break;
            case 3:
            result += "Apr ";
            break;
            case 4:
            result += "May ";
            break;
            case 5:
            result += "Jun ";
            break;
            case 6:
            result += "Jul ";
            break;
            case 7:
            result += "Aug ";
            break;
            case 8:
            result += "Sep ";
            break;
            case 9:
            result += "Oct ";
            break;
            case 10:
            result += "Nov ";
            break;
            case 11:
            result += "Dec ";
            break;
        }
        let year = date.getFullYear();
        return result + year;
  }

  determineDayNight(cur_hour,cur_min,set_hour,set_min,rise_hour,rise_min) {
    if (cur_hour < set_hour) {
        if (cur_hour > rise_hour) {
        return "day";
        } 
        else if (cur_hour == rise_hour) {
        if (cur_min < rise_min) {
            return "night";
        } else {
            return "day";
        }
        } 
        else {
        return "night";
        }
    }
    else if (cur_hour == set_hour) {
        if (cur_min < set_min) {
        return "day";
        } else {
        return "night";
        }
    } 
    else {
        return "night";
    }
  }
  
  determineStatus(code,cur,set,rise) {
      let cur_hour = cur.getHours();
      let cur_min = cur.getMinutes();
      let set_hour = set.getHours();
      let set_min = set.getMinutes();
      let rise_hour = rise.getHours();
      let rise_min = rise.getMinutes();

      switch (code){
          case 4201:
          return ["Heavy Rain","https://raw.githubusercontent.com/Tomorrow-IO-API/tomorrow-weather-codes/master/color/rain_heavy.svg"];
          case 4001:
          return ["Rain","https://raw.githubusercontent.com/Tomorrow-IO-API/tomorrow-weather-codes/master/color/rain.svg"];
          case 4200:
          return ["Light Rain","https://raw.githubusercontent.com/Tomorrow-IO-API/tomorrow-weather-codes/master/color/rain_light.svg"];
          case 6201:
          return ["Heavy Freezing Rain","https://raw.githubusercontent.com/Tomorrow-IO-API/tomorrow-weather-codes/master/color/freezing_rain_heavy.svg"];
          case 6001:
          return ["Freezing Rain", "https://raw.githubusercontent.com/Tomorrow-IO-API/tomorrow-weather-codes/master/color/freezing_rain.svg"];
          case 6200:
          return ["Light Freezing Rain", "https://raw.githubusercontent.com/Tomorrow-IO-API/tomorrow-weather-codes/master/color/freezing_rain_light.svg"];
          case 6000:
          return ["Freezing Drizzle", "https://raw.githubusercontent.com/Tomorrow-IO-API/tomorrow-weather-codes/master/color/freezing_drizzle.svg"];
          case 4000:
          return ["Drizzle", "https://raw.githubusercontent.com/Tomorrow-IO-API/tomorrow-weather-codes/master/color/drizzle.svg"];
          case 7101:
          return ["Heavy Ice Pellets","https://raw.githubusercontent.com/Tomorrow-IO-API/tomorrow-weather-codes/master/color/ice_pellets_heavy.svg"];
          case 7000:
          return ["Ice Pallets", "https://raw.githubusercontent.com/Tomorrow-IO-API/tomorrow-weather-codes/master/color/ice_pellets.svg"];
          case 7102:
          return ["Light Ice Pallets", "https://raw.githubusercontent.com/Tomorrow-IO-API/tomorrow-weather-codes/master/color/ice_pallets_light.svg"];
          case 5101:
          return ["Heavy Snow", "https://raw.githubusercontent.com/Tomorrow-IO-API/tomorrow-weather-codes/master/color/snow_heavy.svg"];
          case 5000:
          return ["Snow", "https://raw.githubusercontent.com/Tomorrow-IO-API/tomorrow-weather-codes/master/color/snow.svg"];
          case 5100:
          return ["Light Snow","https://raw.githubusercontent.com/Tomorrow-IO-API/tomorrow-weather-codes/master/color/snow_light.svg"];
          case 5001:
          return ["Flurries", "https://raw.githubusercontent.com/Tomorrow-IO-API/tomorrow-weather-codes/master/color/flurries.svg"];
          case 8000:
          return ["Thunderstorm", "https://raw.githubusercontent.com/Tomorrow-IO-API/tomorrow-weather-codes/master/color/tstorm.svg"];
          case 2100:
          return ["Light Fog", "https://raw.githubusercontent.com/Tomorrow-IO-API/tomorrow-weather-codes/master/color/fog_light.svg"];
          case 2000:
          return ["Fog", "https://raw.githubusercontent.com/Tomorrow-IO-API/tomorrow-weather-codes/master/color/fog.svg"];
          case 1001:
          return ["Cloudy", "https://raw.githubusercontent.com/Tomorrow-IO-API/tomorrow-weather-codes/master/color/cloudy.svg"];
          case 1102:
          return ["Mostly Cloudy", "https://raw.githubusercontent.com/Tomorrow-IO-API/tomorrow-weather-codes/master/color/mostly_cloudy.svg"];
          case 3000:
          return [
              "Light Wind",
              "https://www.clipartmax.com/png/middle/31-318730_cold-wind-blowing-vectorwind-blow-icon.png",
          ];
          case 3001:
          return ["Wind",
          "https://www.clipartmax.com/png/middle/31-319198_winds-weather-symbol-vectorweather-symbol-for-wind.png"];
          case 3002:
          return [
              "Strong Wind",
              "https://www.clipartmax.com/png/middle/2-27821_wind-clipart-forecast-icon-lineicon-weather-wind-windy-wind-clipart.png",
          ];
          
          case 1101:
          if (this.determineDayNight(cur_hour,cur_min,set_hour,set_min,rise_hour,rise_min) === "day") {
              return ["Partly Cloudy", "https://raw.githubusercontent.com/Tomorrow-IO-API/tomorrow-weather-codes/master/color/partly_cloudy_day.svg"];
          }
          return ["Partly Cloudy", "https://raw.githubusercontent.com/Tomorrow-IO-API/tomorrow-weather-codes/master/color/partly_cloudy_night.svg"];
          case 1100:
          if (this.determineDayNight(cur_hour,cur_min,set_hour,set_min,rise_hour,rise_min) === "day") {
              return ["Mostly Clear", "https://raw.githubusercontent.com/Tomorrow-IO-API/tomorrow-weather-codes/master/color/mostly_clear_day.svg"];
          }
          return ["Mostly Clear", "https://raw.githubusercontent.com/Tomorrow-IO-API/tomorrow-weather-codes/master/color/mostly_clear_night.svg"];
          case 1000:
          if (this.determineDayNight(cur_hour,cur_min,set_hour,set_min,rise_hour,rise_min) === "day") {
              return ["Clear", "https://raw.githubusercontent.com/Tomorrow-IO-API/tomorrow-weather-codes/master/color/clear_day.svg"];
          }
          return ["Clear", "https://raw.githubusercontent.com/Tomorrow-IO-API/tomorrow-weather-codes/master/color/clear_night.svg"];
          
          default:
          return "Unknown"; 
      }
  }
  
}
