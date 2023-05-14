import {Component, OnInit, Input} from '@angular/core';
import { Forecast } from '../weather.model';
import * as Highcharts from 'highcharts';



declare let require: any;
let Boost = require('highcharts/modules/boost');
let noData = require('highcharts/modules/no-data-to-display');
let More = require('highcharts/highcharts-more');
let windbarb = require('highcharts/modules/windbarb');
Boost(Highcharts);
noData(Highcharts);
More(Highcharts);
noData(Highcharts);
windbarb(Highcharts);
@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./detail-chart.component.css']
})
export class chartComponent implements OnInit {
    constructor() {}
    @Input() forecastFif: Forecast[];
    ngOnInit() {
        this.drawFifDay();
    }
    drawFifDay(){
        let arr = [];

        for (let i = 0; i < this.forecastFif.length; i++) {
            let tmp = [];
            tmp.push((new Date(this.forecastFif[i].startTime.substring(0,10))).getTime());
            tmp.push(this.forecastFif[i].temperatureMin);
            tmp.push(this.forecastFif[i].temperatureMax);
            arr.push(tmp);
        }
        var chartOptions : any = {
            chart: {
                type: 'arearange',
                zoomType: 'x',
                scrollablePlotArea: {
                minWidth: 600,
                scrollPositionX: 1
                }
            },
            title: {
                text: 'Temperature Ranges(Min,Max)'
            },

            xAxis: {
                type: 'datetime',
                accessibility: {
                rangeDescription: 'Range: Sep 30 2021 to Oct 12 2021.'
                }
            },
                yAxis: {
                title: {
                text: null
                }
            },
                tooltip: {
                crosshairs: true,
                shared: true,
                valueSuffix: '°F',
                xDateFormat: '%A, %b %e'
            },
                legend: {
                enabled: false
            },
                series: [{
                    name: 'Temperatures',
                    data: arr,
                    marker:{
                        fillColor:"#4192ff"
                    },
                    lineColor: '#ffa40d',
                    color: {
                    linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 },
                    stops: [
                        [0, '#ed700f'],
                        [0.5, '#d6bf9b'],
                        [1, '#a5d6f8']
                    ]
                    },
                    opacity:0.6
                }]

        };


        Highcharts.chart('container1', chartOptions);
    }
}

