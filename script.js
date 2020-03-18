// variables to append data
var APIkey = "&appid=785f12a440a00e93dd6c2b0cfa40dc38";
var cityName = "Miami"
var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=Miami&appid=785f12a440a00e93dd6c2b0cfa40dc38";

// Functions for current weather
function displayWeather () {

var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + APIkey;

    $.ajax({
    url: queryURL,
    method: "GET"
    }).then(function(response) {
    console.log(response);
    });

}
displayWeather();