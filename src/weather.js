//Date and time update on page refresh

let today = new Date();
let displayDateTime = document.querySelector("h4#dateHeading");
displayDateTime.innerHTML = today;

// //Add current location button function

function inputCurrentCity(response) {
  let pinDrop = document.querySelector("input#enterDeparture");
  let pinDropCity = response.data.name;
  pinDrop.value = `${pinDropCity}`;
}

function retrievePosition(position) {
  let apiKey = "27e752237bc0828f4f7f01fa505fc851";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;
  axios.get(url).then(inputCurrentCity);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(retrievePosition);
}

let currentLocaleButton = document.getElementById("current-locale-button");
currentLocaleButton.addEventListener("click", getCurrentLocation);

//Add search engine
//Display current city & temp

function showDepartureCityWeather(response) {
  let departureTempNow = Math.round(response.data.main.temp);
  let departureHumidity = Math.round(response.data.main.humidity);
  let departureWind = Math.round(response.data.wind.speed);
  let displayTemp = document.getElementById("fromTempTop");
  let departureHumidityElement = document.getElementById("departureHumidity");
  let departureWindElement = document.getElementById("departureWind");
  displayTemp.innerHTML = `${departureTempNow}° F`;
  departureHumidityElement.innerHTML = `${departureHumidity}%`;
  departureWindElement.innerHTML = `${departureWind} mph`;
}

function showArrivalCityWeather(response) {
  let arrivalTempNow = Math.round(response.data.main.temp);
  let arrivalHumidity = Math.round(response.data.main.humidity);
  let arrivalWind = Math.round(response.data.wind.speed);
  let displayTemp = document.getElementById("fromTempBtm");
  let arrivalHumidityElement = document.getElementById("arrivalHumidity");
  let arrivalWindElement = document.getElementById("arrivalWind");
  displayTemp.innerHTML = `${arrivalTempNow}° F`;
  arrivalHumidityElement.innerHTML = `${arrivalHumidity}%`;
  arrivalWindElement.innerHTML = `${arrivalWind} mph`;
}

function userSubmitCities(event) {
  event.preventDefault();
  let departureSelected = document.querySelector("input#enterDeparture");
  let arrivalSelected = document.querySelector("input#enterArrival");
  let leavingFrom = document.querySelector(".panel-heading#fromCity");
  let goingTo = document.querySelector(".panel-heading#toCity");
  let leavingFromFive = document.querySelector(
    ".panel-heading#fromCityFiveDay"
  );
  let goingToFive = document.querySelector(".panel-heading#toCityFiveDay");

  if (departureSelected.value && arrivalSelected.value) {
    leavingFrom.innerHTML = `${departureSelected.value}`;
    goingTo.innerHTML = `${arrivalSelected.value}`;
    leavingFromFive.innerHTML = `${departureSelected.value}`;
    goingToFive.innerHTML = `${arrivalSelected.value}`;
    let apiKey = "27e752237bc0828f4f7f01fa505fc851";
    let apiUrlLeavingFrom = `https://api.openweathermap.org/data/2.5/weather?q=${departureSelected.value}&units=imperial`;
    let apiUrlGoingTo = `https://api.openweathermap.org/data/2.5/weather?q=${arrivalSelected.value}&units=imperial`;
    axios
      .get(`${apiUrlLeavingFrom}&appid=${apiKey}`)
      .then(showDepartureCityWeather);
    axios.get(`${apiUrlGoingTo}&appid=${apiKey}`).then(showArrivalCityWeather);
  } else {
    alert("Please enter DEPARTURE & ARRIVAL city");
  }
}

let goSearch = document.querySelector("#get-weather-button");
goSearch.addEventListener("click", userSubmitCities);

//Convert temp to C / to F

function convertTempToC(tempInF) {
  let tempNumber = Number(tempInF.substring(0, tempInF.indexOf("° F")));
  let tempInC = Math.round((tempNumber - 32) * (5 / 9));
  return tempInC.toString() + "° C";
}

function convertTempToF(tempInC) {
  let tempNumber = Number(tempInC.substring(0, tempInC.indexOf("° C")));
  let tempInF = Math.round(tempNumber * (9 / 5) + 32);
  return tempInF.toString() + "° F";
}

document.getElementById("temp-button-top").onclick = function convertTemp() {
  let currentTemp = document.getElementById("fromTempTop").innerHTML;
  if (currentTemp.endsWith("° F")) {
    let tempInCString = convertTempToC(currentTemp);
    document.getElementById("fromTempTop").innerHTML = tempInCString;
  } else {
    let tempInFString = convertTempToF(currentTemp);
    document.getElementById("fromTempTop").innerHTML = tempInFString;
  }
};

function convertTempToCBtm(tempInF) {
  let tempNumber = Number(tempInF.substring(0, tempInF.indexOf("° F")));
  let tempInC = Math.round((tempNumber - 32) * (5 / 9));
  return tempInC.toString() + "° C";
}

function convertTempToFBtm(tempInC) {
  let tempNumber = Number(tempInC.substring(0, tempInC.indexOf("° C")));
  let tempInF = Math.round(tempNumber * (9 / 5) + 32);
  return tempInF.toString() + "° F";
}

document.getElementById("temp-button-btm").onclick = function convertTemp() {
  let currentTemp = document.getElementById("fromTempBtm").innerHTML;
  if (currentTemp.endsWith("° F")) {
    let tempInCString = convertTempToCBtm(currentTemp);
    document.getElementById("fromTempBtm").innerHTML = tempInCString;
  } else {
    let tempInFString = convertTempToFBtm(currentTemp);
    document.getElementById("fromTempBtm").innerHTML = tempInFString;
  }
};
