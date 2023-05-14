const URL = "https://maps.googleapis.com/maps/api/place/autocomplete/json?";


const axios = require("axios");

async function getAutocomplete(input) {
    const predictions = await axios.get(
      `${URL}input=${input}&types=(cities)&key=${process.env.KEY}`
    );
    const results = [];
    const cities = [];
    const states = [];
    for (let city of predictions.data.predictions) {
        let c = city.structured_formatting.main_text;
        let s = city.structured_formatting.secondary_text.split(',')[0];
        cities.push(c);
        states.push(s);
    }
    results.push(cities);
    results.push(states);
    return results;
}

module.exports = getAutocomplete;