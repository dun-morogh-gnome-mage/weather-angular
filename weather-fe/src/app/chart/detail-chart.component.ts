import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Forecast } from '../weather.model';
import * as Highcharts from 'highcharts';

declare var require: any;
let boost = require('highcharts/modules/boost');
let noData = require('highcharts/modules/no-data-to-display');
let highMore = require('highcharts/modules/no-data-to-display');
let windBard = require('highcharts/modules/windbarb');

boost(Highcharts);
noData(Highcharts);
highMore(Highcharts);
windBard(Highcharts);

@Component({
  selector: 'app-detail-chart',
  templateUrl: './detail-chart.component.html',
  styleUrls :['./detail-chart.component.css']
})
export class detailChartComponent implements OnInit {
  @Input() forecast: Forecast[];
  constructor() {}
  ngOnInit() {
    this.drawFiveDay();
  }


  generateWeather() {
    let tem = [];
    for (let i = 0; i < this.forecast.length; i++) {
        
      let to = Date.parse(this.forecast[i].startTime) + 36e5;
      tem.push({
        x: Date.parse(this.forecast[i].startTime),
        y: this.forecast[i].temperature,
        to,
      });
    }
    return tem;
  }

  generateWind() {
    let win = [];
    for (let i = 0; i < this.forecast.length; i++) {
      win.push({
        x: Date.parse(this.forecast[i].startTime),
        value: this.forecast[i].windSpeed,
        direction: this.forecast[i].windDirection,
      });
    }
    return win;
  }

  generatePressure() {
    let pre = [];
    for (let i = 0; i < this.forecast.length; i++) {
      pre.push({
        x: Date.parse(this.forecast[i].startTime),
        y: this.forecast[i].pressureSeaLevel,
      });
    }
    return pre;
  }

  generateHumidity() {
    let hum = [];
    for (let i = 0; i < this.forecast.length; i++) {
      hum.push({
        x: Date.parse(this.forecast[i].startTime),
        y: this.forecast[i].humidity,
      });
    }
    return hum;
  }

  drawFiveDay() {
    let data = {
      humidity: this.generateHumidity(),
      winds: this.generateWind(),
      temperatures: this.generateWeather(),
      pressures: this.generatePressure(),
    };
    class Meteogram {
      constructor(json: any, container: any) {
        this.container = container;
        this.json = json;
        this.parseYrData();
      }

      humidity: [] = [];
      winds: [] = [];
      temperatures: [] = [];
      pressures: [] = [];
      container: any = null;
      json: any = null;
      parseYrData() {
        this.humidity = this.json.humidity;
        this.winds = this.json.winds;
        this.temperatures = this.json.temperatures;
        this.pressures = this.json.pressures;
        this.createChart();
      }

      createChart() {
        Highcharts.chart(this.container, this.getChartOptions());
        console.log(this.container);
        console.log(this.getChartOptions());
      }

      getChartOptions() : object {
        return {
          chart: {
            renderTo: this.container,
            marginBottom: 70,
            marginRight: 40,
            marginTop: 50,
            plotBorderWidth: 1,
            height: 400,
            alignTicks: false,
            scrollablePlotArea: {
              minWidth: 720,
            },
          },

          defs: {
            patterns: [
              {
                id: 'precipitation-error',
                path: {
                  d: [
                    'M',
                    3.3,
                    0,
                    'L',
                    -6.7,
                    10,
                    'M',
                    6.7,
                    0,
                    'L',
                    -3.3,
                    10,
                    'M',
                    10,
                    0,
                    'L',
                    0,
                    10,
                    'M',
                    13.3,
                    0,
                    'L',
                    3.3,
                    10,
                    'M',
                    16.7,
                    0,
                    'L',
                    6.7,
                    10,
                  ].join(' '),
                  stroke: '#68CFE8',
                  strokeWidth: 1,
                },
              },
            ],
          },

          title: {
            text: 'Hourly Weather (For Next 5 Days)',
            align: 'center',
            style: {
              whiteSpace: 'nowrap',
              textOverflow: 'ellipsis',
            },
          },

          tooltip: {
            shared: true,
            useHTML: true,
            headerFormat: '<small>{point.x:%A, %b %e, %H:%M:%S} </small><br>',
          },

          xAxis: [
            {
              type: 'datetime',
              tickInterval: 2 * 36e5,
              minorTickInterval: 36e5,
              tickLength: 0,
              gridLineWidth: 1,
              gridLineColor: 'rgba(128, 128, 128, 0.1)',
              startOnTick: false,
              endOnTick: false,
              minPadding: 0,
              maxPadding: 0,
              offset: 30,
              showLastLabel: true,
              labels: {
                format: '{value:%H}',
              },
              crosshair: true,
            },
            {
              // Top X axis
              linkedTo: 0,
              type: 'datetime',
              tickInterval: 24 * 3600 * 1000,
              labels: {
                format:
                  '{value:<span style="font-size: 12px; font-weight: bold">%a</span> %b %e}',
                align: 'left',
                x: 3,
                y: -5,
              },
              opposite: true,
              tickLength: 20,
              gridLineWidth: 1,
            },
          ],

          yAxis: [
            {
              // temperature axis
              title: {
                text: null,
              },
              labels: {
                format: '{value}°',
                style: {
                  fontSize: '10px',
                },
                x: -3,
              },
              plotLines: [
                {
                  // zero plane
                  value: 0,
                  color: '#BBBBBB',
                  width: 1,
                  zIndex: 2,
                },
              ],
              maxPadding: 0.3,
              minRange: 8,
              tickInterval: 1,
              gridLineColor: 'rgba(128, 128, 128, 0.1)',
            },
            {
              title: {
                text: null,
              },
              labels: {
                enabled: false,
              },
              gridLineWidth: 0,
              tickLength: 0,
              minRange: 10,
              min: 0,
            },
            {
              // Air pressure
              allowDecimals: false,
              title: {
                // Title on top of axis
                text: 'inHg',
                offset: 0,
                align: 'high',
                rotation: 0,
                style: {
                  fontSize: '10px',
                  color: '#fdb84b',
                },
                textAlign: 'left',
                x: 3,
              },
              labels: {
                style: {
                  fontSize: '8px',
                  color: '#fdb84b',
                },
                y: 2,
                x: 3,
              },
              gridLineWidth: 0,
              opposite: true,
              showLastLabel: false,
            },
          ],

          legend: {
            enabled: false,
          },

          plotOptions: {
            series: {
              pointPlacement: 'between',
            },
          },

          series: [
            {
              name: 'Temperature',
              data: this.temperatures,
              type: 'spline',
              marker: {
                enabled: false,
                states: {
                  hover: {
                    enabled: true,
                  },
                },
              },
              tooltip: {
                pointFormat:
                  '<span style="color:{point.color}">\u25CF</span> ' +
                  '{series.name}: <b>{point.y}°F</b><br/>',
              },
              zIndex: 1,
              color: '#FF3333',
              negativeColor: '#48AFE8',
            },
            {
              name: 'Humidity',
              data: this.humidity,
              type: 'column',
              color: '#68CFE8',
              yAxis: 0,
              groupPadding: 0,
              pointPadding: 0,
              grouping: false,
              dataLabels: {
                enabled: true,
                filter: {
                  operator: '>',
                  property: 'y',
                  value: 0,
                },
                style: {
                  fontSize: '8px',
                  color: 'gray',
                },
              },
              tooltip: {
                valueSuffix: ' %',
              },
            },
            {
              name: 'Air pressure',
              color: '#fdb84b',
              data: this.pressures,
              marker: {
                enabled: false,
              },
              shadow: false,
              tooltip: {
                valueSuffix: ' inHg',
              },
              dashStyle: 'shortdot',
              yAxis: 2,
            },
            {
              name: 'Wind',
              type: 'windbarb',
              id: 'windbarbs',

              color: '#bb2429',
              lineWidth: 1.5,
              data: this.winds,
              vectorLength: 18,
              yOffset: -15,
              tooltip: {
                valueSuffix: ' mph',
              },
            },
          ],
        };
      }
    }
    new Meteogram(data, 'container');
  }
}
