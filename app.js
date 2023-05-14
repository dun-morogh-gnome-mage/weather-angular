
const express = require("express");
const cors = require("cors");

const getCoords = require("./util/location");
const getForecast = require("./util/forecast");
const getAutocomplete = require("./util/autocomplete");
const app = express();



// app.all('*',(req,res,next) => {
//   res.header("Access-Control-Allow-Origin" , "*");
//   res.header("Access-Control-Allow-Header" , "X-Requested-With");
//   res.header("Access-Control-Allow-Methods" , "PUT,POST,GET,DELETE,OPTIONS");
//   res.header("X-Powered-By" , "3.2.1");
//   res.header("Content-Type" , "application/json; charset=utf-8");
//   next();
// })
app.use(cors());

app.get("/", (req, res) => {
  res.status(200).send("Hello, world!").end();
});



app.get("/tomorrow",async (req,res) => {
  if (req.query.checked == "true") {
    const lat = req.query.lat;
    const lng = req.query.lng;
    const forecast = await getForecast(lat, lng);

    const five = forecast.data.timelines[0];
    const fifteen = forecast.data.timelines[1];
    console.log(five);
    console.log(fifteen);
    res.status(200).json({ five, fifteen });

  } else {
      const { lat, lng } = await getCoords({
        street: req.query.street,
        city: req.query.city,
        state: req.query.state,
      });
      const forecast = await getForecast(lat, lng);
      const five = forecast.data.timelines[0];
      const fifteen = forecast.data.timelines[1];

      res.status(200).json({ five, fifteen, lat, lng});
  }
});

app.get("/auto",async (req,res) => {
  const input = req.query.input;
  const results = await getAutocomplete(input);
  res.status(200).json({r1 : results[0],r2 : results[1]});
});







const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log("Press Ctrl+C to quit.");
});

module.exports = app;
