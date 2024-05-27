const express =require('express');
const axios = require('axios');
const { json } = require('body-parser');
require('dotenv').config();

const app = express();
const port = 4000;

const API_KEY = process.env.API_KEY;

app.use(json());

app.get('/', (req, res) => {
  const address = req.query.address;
  const url = 'https://api.tomorrow.io/v4/weather/forecast?location=9.0820,8.6753&apikey=fejStCbUhO81QE4GppmJsWMayxIqtIgH';
  console.log(url)

  console.log('Requesting URL:', url);

  axios.get(url)
    .then(response => {
        const data = response.data;
        const dailyData = data.timelines.dily[0];
        //
        console.log(dailyData);
        const cityName = "Nigeria";
        const temperature = dailyData.values.temperatureAvg;
        const sunsetTime = new Date(sunsetTimeString).toISOString().slice(11,16);
        const message = `City Name: ${cityName}<br>Temperature: ${temperature}&deg;C<br>Sunset Time: ${sunsetTime}`;
        
        res.send(`<html><body><div id='container'><h1>${message}</h1></div></body></html>`);
})

    .catch(error => {
      console.error(error);
      res.status(500).send('Error occurred while fetching weather data');
    });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
