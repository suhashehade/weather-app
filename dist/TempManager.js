class TempManager {
  constructor() {
    this.cityData = [];
  }

  getCitiesFromDB() {
    return $.ajax({
      method: "get",
      url: "/cities",
      success: (cities) => {
        for (let city of cities) {
          this.cityData.push(city);
        }
      },
      error: function (error, text) {
        console.log(error);
      },
    });
  }

  getCityData(cityName) {
    return $.ajax({
      method: "get",
      url: `/city/${cityName}`,
      success: (city) => {
        this.cityData.push(city);
      },
      error: function (error, text, xht) {
        alert(JSON.parse(error.responseText).error);
      },
    });
  }

  saveCity(city) {
    let index = this.cityData.findIndex((c) => c.name === city.name);
    this.cityData.splice(index, 1);
    return $.ajax({
      method: "post",
      url: "/city",
      data: city,
      success: (city) => {
        this.cityData.push(city);
      },
      error: function (error, text) {
        console.log(error);
      },
    });
  }

  removeCity(cityName) {
    return $.ajax({
      method: "delete",
      url: `/city/${cityName}`,
      success: (city) => {
        let index = this.cityData.findIndex((c) => c.name === cityName);
        this.cityData.splice(index, 1);
      },
      error: function (error, text) {
        console.log(error);
      },
    });
  }

  updateCityTemp(cityName) {
    return $.ajax({
      method: "put",
      url: `/city/${cityName}`,
      success: (city) => {
        let updatedCity = this.cityData.find((c) => c.name === city.name);
        updatedCity.temperature = city.temperature;
      },
      error: function (error) {
        alert(JSON.parse(error.responseText).error);
      },
    });
  }

  getCities() {
    return this.cityData;
  }
}
