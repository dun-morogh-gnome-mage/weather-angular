export class Forecast {
    startTime : string;
    cloudCover : number;
    humidity : number;
    moonPhase: number;
    precipitationProbability: number;
    precipitationType: number;
    pressureSeaLevel: number;
    sunriseTime: string;
    sunsetTime: string;
    temperature: number;
    temperatureApparent: number;
    temperatureMax: number;
    temperatureMin: number;
    uvIndex: number;
    visibility: number;
    weatherCode: number;
    windDirection: number;
    windSpeed: number;
    constructor(startTime : string, cloudCover : number, humidity : number,
                moonPhase : number, precipitationProbability : number, precipitationType : number,
                pressureSeaLevel : number, sunriseTime : string, sunsetTime : string, temperature : number,
                temperatureApparent : number, temperatureMax : number,temperatureMin : number,
                uvIndex : number,visibility : number,weatherCode : number,
                windDirection : number,windSpeed : number) {
        this.startTime = startTime;
        this.cloudCover = cloudCover;
        this.humidity = humidity;
        this.moonPhase = moonPhase;
        this.precipitationProbability = precipitationProbability;
        this.precipitationType = precipitationType;
        this.pressureSeaLevel = pressureSeaLevel;
        this.sunriseTime = sunriseTime;
        this.sunsetTime = sunsetTime;
        this.temperature = temperature;
        this.temperatureApparent = temperatureApparent;
        this.temperatureMax = temperatureMax;
        this.temperatureMin = temperatureMin;
        this.uvIndex = uvIndex;
        this.visibility = visibility;
        this.weatherCode = weatherCode;
        this.windDirection = windDirection;
        this.windSpeed = windSpeed;
    }
}