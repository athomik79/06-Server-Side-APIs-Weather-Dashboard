moment().format('L');

// Current city weather search function
function searchCity(cityname) {

    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityname + "&units=imperial&appid=785f12a440a00e93dd6c2b0cfa40dc38";
    var queryURLforcast = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityname + "&units=imperial&appid=785f12a440a00e93dd6c2b0cfa40dc38";

    $.ajax({
        url: queryURL,
        method: 'GET'
    }).then(function (response) {
        console.log(response);
        console.log(queryURL);
        // Empty divs and ids to dump info
        $("#current").empty();
       var mainDate = moment().format('L');

        // Create HTML for city info
        var cityNameEl = $("<h2>").text(response.name);
        var displayMainDate = cityNameEl.append(" " + mainDate);
        var tempEL = $("<p>").text("Temperature: " + response.main.temp);
        var humEl = $("<p>").text("Humidity: " + response.main.humidity);
        var windEl = $("<p>").text("Wind Speed: " + response.wind.speed);
        var iconEl = $("<i class='fas fa-cloud-showers-heavy'></i>");
        // Div to append new elements 
        var newDiv = $('<div>');

        newDiv.append(displayMainDate, iconEl, tempEL, humEl, windEl);

        $("#current").html(newDiv);

// UV call
var lat = response.coord.lat;
var lon = response.coord.lon;
var queryURLUV = "https://api.openweathermap.org/data/2.5/uvi?&appid=785f12a440a00e93dd6c2b0cfa40dc38&lat=" + lat  + "&lon=" + lon;

        $.ajax({
            url: queryURLUV,
            method: 'GET'
        }).then(function (response) {
            console.log(response);
            console.log(queryURLUV);
            $('#uvl-display').empty();
            var uvlresults = response.value;
            //create HTML for new div
            var uvlEl = $("<button class='btn bg-danger'>").text("UV Index: " + response.value);
            $('#uvl-display').html(uvlEl);

        });
    });

        $.ajax({
            url: queryURLforcast,
            method: 'GET'
        }).then(function (response) {
            console.log(response);
            console.log(queryURLforcast);
             // Storing an array in the results variable
            var results = response.list;
            // Empty 5day div
            $("#5day").empty();
            // Create HTML for 5 day forecast
            for (var i = 0; i < results.length; i += 9) {
            // Creating a div
            var fiveDayDiv = $("<div class='card text-white bg-primary mx-auto' style='width: 8.5rem; height: 11rem;'>");
            //Storing the responses date temp and humidity
            var date = results[i].dt_txt;
            var setD = date.substr(0,10)
            var temp = results[i].main.temp;
            var hum = results[i].main.humidity;
            console.log(setD);
            console.log(temp);
            console.log(hum);
            // Creating tags
            var h5date = $("<h5 class='card-title'>").text(setD);
            var pTemp = $("<p class='card-text'>").text("Temp: " + temp);;
            var pHum = $("<p class='card-text'>").text("Humidity " + hum);;

            var weather = results[i].weather[0].main

            if (weather === "Rain") {
                var icon = $('<img>').attr("src", "http://openweathermap.org/img/wn/09d.png");
                icon.attr("style", "height: 30px; width: 30px");
            } else if (weather === "Clouds") {
                var icon = $('<img>').attr("src", "http://openweathermap.org/img/wn/03d.png");
                icon.attr("style", "height: 30px; width: 30px");
            } else if (weather === "Clear") {
                var icon = $('<img>').attr("src", "http://openweathermap.org/img/wn/01d.png");
                icon.attr("style", "height: 30px; width: 30px");
            }
             else if (weather === "Drizzle") {
                var icon = $('<img>').attr("src", "http://openweathermap.org/img/wn/10d.png");
                icon.attr("style", "height: 30px; width: 30px");
            }
             else if (weather === "Snow") {
                var icon = $('<img>').attr("src", "http://openweathermap.org/img/wn/13d.png");
                icon.attr("style", "height: 30px; width: 30px");
            }

            //append items
            fiveDayDiv.append(h5date);
            fiveDayDiv.append(icon);
            fiveDayDiv.append(pTemp);
            fiveDayDiv.append(pHum);
            $("#5day").append(fiveDayDiv);
        }

    });

}
pageLoad();
// Event handler city search
$("#select-city").on("click", function (event) {
    // Prevent button from submitting
    event.preventDefault();
    // Store city name
    var cityInput = $("#city-input").val().trim();

    // Save to local storage
    var textContent = $(this).siblings("input").val();
    var storearr = [];
    storearr.push(textContent);
    localStorage.setItem('cityName', JSON.stringify(storearr));
  
    searchCity(cityInput);
    pageLoad();
});
// Call storage on page load
function pageLoad () {
    var lastSearch = JSON.parse(localStorage.getItem("cityName"));
    var searchDiv = $("<button class='btn border text-muted' style='width: 12rem;'>").text(lastSearch);
    var psearch = $("<div>");
    psearch.append(searchDiv)
    $("#searchhistory").prepend(psearch);
}

$("#searchhistory").on('click', '.btn', function(event) {
event.preventDefault();
    console.log($(this).text());
    searchCity($(this).text());

});