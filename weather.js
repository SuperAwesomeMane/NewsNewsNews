//var weatherData;
//var request = new XMLHttpRequest();
//
//loadData();
//
//function loadData() {
//
//    request.open('GET', 'http://api.openweathermap.org/data/2.5/weather?q=Salt+Lake+City');
//    request.onload = loadComplete;
//    request.send();
//}
//
//function loadComplete(evt) {
//    weatherData = JSON.parse(request.responseText);
//    console.log(weatherData.main);
//    document.getElementById("content").innerHTML = weatherData.main.temp_max;
//}

//'http://api.openweathermap.org/data/2.5/forecast/daily?q=Salt+Lake+City&mode=xml&units=metric&cnt=7'
//http://api.openweathermap.org/data/2.5/weather?q=Salt+Lake+City

var weatherApp = function () {

    return {
        weatherData: {},
        locationString: 'Salt+Lake+City',
        numDays: 7,
        weatherUrl: 'http://api.openweathermap.org/data/2.5/forecast/daily?q=Salt+Lake+City&units=imperial',
        request: new XMLHttpRequest(),
        loadComplete: function (evt) {
            weatherApp.weatherData = JSON.parse(weatherApp.request.responseText);
            console.log(weatherApp.weatherData);
            //document.getElementById("weatherApp").innerHTML = weatherApp.weatherData.list[0].temp.max;
            var weatherSection = document.getElementById("weatherApp");
            for (i = 0; i < weatherApp.numDays; i++) {
                weatherSection.appendChild(weatherApp.parseForecast(weatherApp.weatherData.list[i]));
            }
        },
        parseForecast: function (forecastObject) {
            var forecastSection = document.createElement("section");
            forecastSection.setAttribute("class", "forecast");

            var weather = document.createElement("section");
            var weatherDescription = document.createElement("span");
            var weatherImage = document.createElement("img");
            weatherImage.setAttribute('src', 'http://openweathermap.org/img/w/' + forecastObject.weather[0].icon + '.png');
            weather.appendChild(weatherImage);

            weatherDescription.textContent = "Weather: " + forecastObject.weather[0].description;
            weather.appendChild(weatherDescription);
            forecastSection.appendChild(weather);

            var maxTemp = document.createElement("span");
            maxTemp.textContent = "High Temperature: " + forecastObject.temp.max;
            forecastSection.appendChild(maxTemp);

            var minTemp = document.createElement("span");
            minTemp.textContent = "Low Temperature: " + forecastObject.temp.min;
            forecastSection.appendChild(minTemp);

            var windSpeed = document.createElement("span");
            windSpeed.textContent = "Wind Speed: " + forecastObject.speed;
            forecastSection.appendChild(windSpeed);

            return forecastSection;
        },
        loadData: function () {
            weatherApp.request.open('GET', weatherApp.weatherUrl);
            weatherApp.request.onload = weatherApp.loadComplete;
            weatherApp.request.send();
        }
    }

}();

console.log("weather Loaded!");
weatherApp.loadData();