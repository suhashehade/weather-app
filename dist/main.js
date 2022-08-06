const renderer = new Renderer();
const tempManager = new TempManager();

const searchInput = $("#search-field");
const currentPosition = [];

const loadPage = function () {
  let citiesPromise = tempManager.getCitiesFromDB();
  citiesPromise.then(function () {
    refresh();
  });
};

const refresh = function () {
  let cities = tempManager.getCities();
  renderer.renderCities(cities);
};

function handleSearch(cityName) {
  let cityPromise = tempManager.getCityData(cityName);
  cityPromise.then(function () {
    refresh();
  });
}

const save = function (city) {
  let cityPromise = tempManager.saveCity(city);
  cityPromise.then(function () {
    refresh();
  });
};
const update = function (cityName) {
  let cityPromise = tempManager.updateCityTemp(cityName);
  cityPromise.then(function () {
    refresh();
  });
};
const remove = function (name) {
  let cityPromise = tempManager.removeCity(name);
  cityPromise.then(function () {
    let cities = tempManager.getCities();
    renderer.renderCities(cities);
  });
};

$("#search-btn").on("click", function () {
  let cityName = searchInput.val();
  searchInput.val("");
  handleSearch(cityName);
});

$("body").on("click", "#save-btn", function () {
  let cityCard = $(this).closest(".city-card");
  let name = cityCard.find(".name").html();
  let temp = cityCard.find(".temp").html();
  temp = temp.slice(0, 2);
  let condition = cityCard.find(".condition").text();
  let conditionPic = cityCard.find(".condition-icon").attr("src");

  let city = {
    name: name,
    temperature: temp,
    condition: condition,
    conditionPic: conditionPic,
  };

  console.log();
  save(city);
});

$("body").on("click", "#remove-btn", function () {
  let cityCard = $(this).closest(".city-card");
  let name = cityCard.find(".name").html();
  remove(name);
});

$("body").on("click", "#update-btn", function () {
  let cityCard = $(this).closest(".city-card");
  let name = cityCard.find(".name").html();
  update(name);
});

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    console.log("error");
  }
}

function showPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  currentPosition[(lat, lon)];
}

loadPage();
