var homePage = document.querySelector('#home-page');
var quoteModal = document.querySelector('#quote-modal');

var quoteContent1 = document.querySelector('.quote-text');
var quoteContent2 = document.querySelector('.quote-author');
var qButton = document.querySelector('#quote-button');


var photoModal = document.getElementById("photo-modal");
var photoButton = document.getElementById("photo-button");
var returnButton1 = document.querySelector('.return-button');
var returnButton2 = document.querySelector('.return-button-2');

var tempFahrenheit = document.getElementById("temp-fahrenheit");
var tempCelsius = document.getElementById("temp-celsius");
var weatherIcon = document.querySelector("#weather-icon");
var videoTags = document.querySelectorAll("video");
var backgroundVid = document.getElementsByClassName("background");

var locationInput = document.getElementById("zip-input");
var locationDisplay = document.getElementById("location-display");

var quotes = new Quotes(quoteContent1, quoteContent2, qButton);
var weather = new Weather (tempFahrenheit, tempCelsius, weatherIcon, videoTags, backgroundVid);
var photos = new Photos(weather);
var zipCode = new ZipCode (weather, locationInput, locationDisplay);
var userLocation = new UserLocation (weather, locationDisplay, locationInput);
var app = new App(userLocation, weather, zipCode, quotes);

app.start();
createEventListeners();

function createEventListeners() {
  returnButton1.addEventListener("click", function () {
    homePage.classList.remove('hidden');
    photoModal.classList.add('hidden');
  });

  returnButton2.addEventListener("click", function () {
    homePage.classList.remove('hidden');
    quoteModal.classList.add('hidden');
    clearInterval(quotes.setIntervalID);
  });

  document.getElementById("location-button").addEventListener("click", function () {
    zipCode.getZip(locationInput.value);
  });

  document.getElementById("recenter").addEventListener("click", function () {
    userLocation.getLocation();
  });
  document.getElementById("photo-button").addEventListener("click", function () {
    photos.initializeModal();
  });
}
