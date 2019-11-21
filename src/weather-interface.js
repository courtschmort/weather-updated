import $ from 'jquery';
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import './styles.css';
// import img from './file.png'; <-- file-loader
import { WeatherService } from './../src/weather-service.js';
import { GiphyService } from './../src/giphy-service.js';

$(document).ready(function() {

  $('#weatherLocation').click(function() {
    const city = $('#location').val();
    $('#location').val("");

    async function weatherCall() {
      let weatherService = new WeatherService();
      const response = await weatherService.getWeatherByCity(city);
      return response;
    }

    async function giphyCall(humidity) {
      let giphyService = new GiphyService();
      const response =await giphyService.getGifByHumidity(humidity);
      return response;
    }

    weatherCall()
    .then(function(response) {
      let humidity = response.main.humidity;
      $('.showHumidity').text(`The humidity in ${city} is ${response.main.humidity}%.`);
      $('.showTemp').text(`The temperature in Kelvins is ${response.main.temp} degrees.`);
      return giphyCall(humidity);
    })
    .then(function(response) {
      let image = response.data[0].images.downsized.url;
      $('.showImage').html(`<img src='${image}'>`);
    });
  });

});
