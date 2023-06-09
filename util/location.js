const axios = require("axios");
const GEO_URL = "https://maps.googleapis.com/maps/api/geocode/json";
async function getCoords(address) {
    const {street, city, state} = address;
    const loc_res = await axios.get(`${GEO_URL}?address=${street},${city},${state}&key=${process.env.API2}`);
    return loc_res.data.results[0].geometry.location;
}

module.exports = getCoords;