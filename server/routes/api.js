const axios = require("axios");
const express = require("express");
const router = express.Router();
const City = require("../models/City");
const bodyParser = require("body-parser");
const zeroCelsius = 273.15;

const externalRequest = function (cityName) {
  return axios.get(
    `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=a52395204fdf355af697b3c603aae61d`
  );
};

router.get("/city/:cityName", function (request, response) {
  let cityName = request.params.cityName;
  let requestPromise = externalRequest(cityName);
  requestPromise
    .then(function (resp) {
      let cityData = resp.data;
      let temperature = parseInt(cityData.main.temp - zeroCelsius);
      let city = {
        name: cityData.name,
        temperature: temperature,
        condition: cityData.weather[0].description,
        conditionPic:
          "http://openweathermap.org/img/w/" +
          cityData.weather[0].icon +
          ".png",
      };
      response.send(city);
    })
    .catch(function (error) {
      response.status(404).send({ error: "The city name does not exist" });
    });
});

router.get("/cities", function (request, response) {
  City.find({}, function (err, res) {
    response.send(res);
  });
});

router.post("/city", function (request, response) {
  let city = request.body;
  let newCity = new City({
    name: city.name,
    temperature: city.temperature,
    condition: city.condition,
    conditionPic: city.conditionPic,
  });
  newCity.save();
  response.send(newCity);
});

router.put("/city/:cityName", function (request, response) {
  let cityName = request.params.cityName;
  let requestPromise = externalRequest(cityName);
  requestPromise
    .then(function (resp) {
      let cityData = resp.data;
      let temperature = parseInt(cityData.main.temp - zeroCelsius);
      City.findOneAndUpdate(
        {
          name: cityData.name,
        },
        {
          temperature: temperature,
          condition: cityData.weather[0].description,
          conditionPic:
            "http://openweathermap.org/img/w/" +
            cityData.weather[0].icon +
            ".png",
        },
        { new: true },
        function (err, city) {
          response.send(city);
        }
      );
    })
    .catch(function (error) {
      response.status(404).send({ error: "The city name does not exist" });
    });
});

router.delete("/city/:cityName", function (request, response) {
  let cityName = request.params.cityName;

  City.findOneAndDelete({ name: cityName }, function (err, res) {
    response.send(res);
  });
});

module.exports = router;
