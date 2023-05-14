const WEATHER_API = "c3wu5X0VAPqvdbY8MjRPMHCm64s8BDoz";
// const WEATHER_API = "LhZQJmvcwo123otHrRLmAX9EHSx1d6Gm";
const TIMEZONE = "America/Los_Angeles";
const TimelineURL = "https://api.tomorrow.io/v4/timelines";
const axios = require("axios");
async function getForecast(lat, lng) {
  let querystring = {
    location: `${lat},${lng}`,
    fields: [
      "temperature",
      "windSpeed",
      "temperatureApparent",
      "windDirection",
      "temperatureMin",
      "temperatureMax",
      "humidity",
      "pressureSeaLevel",
      "uvIndex",
      "weatherCode",
      "precipitationProbability",
      "precipitationType",
      "sunriseTime",
      "sunsetTime",
      "visibility",
      "moonPhase",
      "cloudCover",
    ],
    units: "imperial",
    timesteps: "1h,1d",
    apikey: `${WEATHER_API}`,
    timezone: `${TIMEZONE}`,
  };

  const response = await axios.get(TimelineURL,{
      params:querystring
  });
  return response.data;
}

module.exports = getForecast;
