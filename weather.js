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

var weatherApp = function () {

    return {
        weatherData: {},
        weatherUrl: 'http://api.openweathermap.org/data/2.5/weather?q=Salt+Lake+City',
        request: new XMLHttpRequest(),
        loadComplete: function (evt) {
            weatherApp.weatherData = JSON.parse(request.responseText);
            console.log(weatherApp.weatherData.main);
            document.getElementById("content").innerHTML = weatherApp.weatherData.main.temp_max;
        },
        loadData: function () {
            request.open('GET', weatherApp.weatherUrl);
            request.onload = weatherApp.loadComplete;
            request.send();
        }
    }

}();

weatherApp.loadData();