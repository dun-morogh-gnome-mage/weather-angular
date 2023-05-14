
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
    apikey: `${process.env.KEY1}`,
    timezone: `${TIMEZONE}`,
  };

  const response = await axios.get(TimelineURL,{
      params:querystring
  });
  return response.data;
}

module.exports = getForecast;
