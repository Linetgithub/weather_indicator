const express = require('express');
const axios = require('axios');
require('dotenv').config();

const app = express();
const port = 4000;

const API_KEY = process.env.API_KEY;

app.get('/', (req, res) => {
  const address = req.query.address;
  const url = 'https://api.tomorrow.io/v4/weather/forecast?location=42.3478,-71.0466&apikey=fejStCbUhO81QE4GppmJsWMayxIqtIgH';
  console.log(url)

  console.log('Requesting URL:', url);

  axios.get(url)
    .then(response => {
      const data = response.data;
      const cityName = data.name;
      const temperature = data.main.temp;
      const sunsetTime = new Date(data.sys.sunset * 1000).toLocaleTimeString();
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
