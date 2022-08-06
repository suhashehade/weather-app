class Renderer {
  renderCities(cities) {
    let citiesContainer = $("#cities-container");
    citiesContainer.empty();
    const source = $("#city-template").html();
    const template = Handlebars.compile(source);
    let cityHtmlElem = template({ cities });
    citiesContainer.append(cityHtmlElem);
  }
}
