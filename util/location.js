const axios = require("axios");
const GEO_URL = "https://maps.googleapis.com/maps/api/geocode/json";
const GEO_API = "AIzaSyCF-ApUa_YU-7nGr6ZIWZxddO8s-GHMZr0";
async function getCoords(address) {
    const {street, city, state} = address;
    const loc_res = await axios.get(`${GEO_URL}?address=${street},${city},${state}&key=${GEO_API}`);
    return loc_res.data.results[0].geometry.location;
}

module.exports = getCoords;