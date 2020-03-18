// //define the varibles that we'll need to append data pulled from api to cards above---------------------------------//
// var APIkey = "&appid=ecc0be5fd92206da3aa90cc41c13ca56";
// var cityName = "Seattle"
//var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=Seattle&appid=ecc0be5fd92206da3aa90cc41c13ca56";



// Current city weather search function

function searchCity(cityname) {

    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityname + "&units=imperial&appid=ecc0be5fd92206da3aa90cc41c13ca56";
    var queryURLforcast = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityname + "&units=imperial&appid=ecc0be5fd92206da3aa90cc41c13ca56";

    $.ajax({
        url: queryURL,
        method: 'GET'
    }).then(function (response) {
        console.log(response);
        console.log(queryURL);
        // Empty divs and ids to dump info
        $("#current").empty();
 

        
        // Create HTML for city info
        var cityNameEl = $("<h2>").text(response.name);
        var tempEL = $("<p>").text(response.main.temp);
        var humEl = $("<p>").text(response.main.humidity);
        // Div to append new elements 
        var newDiv = $('<div>');
       
        newDiv.append(cityNameEl, tempEL, humEl);
        
        $("#current").html(newDiv);

    });

    $.ajax({
        url: queryURLforcast,
        method: 'GET'
    }).then(function (response) {
        console.log(response);
        console.log(queryURLforcast);
        // Storing an array of results in the results variable
        var results = response.list;
        //empty 5day div--------
        $("#5day").empty();
        //create HTML for 5day forcast...........................
        for (var i = 0; i < results.length; i += 9) {
            // Creating a div
            var fiveDayDiv = $("<div class='card text-white bg-primary mx-auto' style='width: 8.5rem; height: 11rem;'>");
            //Storing the responses date temp and humidity
            var date = results[i].dt_txt;
            var temp = results[i].main.temp;
            var hum = results[i].main.humidity;
            console.log(date);
            console.log(temp);
            console.log(hum);
            //creating a tags with the result items information
            var h5date = $("<h5 class='card-title'>").text(date);
            var pTemp = $("<p class='card-text'>").text(temp);;
            var pHum = $("<p class='card-text'>").text(hum);;
            //append items to 
            fiveDayDiv.append(h5date);
            fiveDayDiv.append(pTemp);
            fiveDayDiv.append(pHum);
            $("#5day").prepend(fiveDayDiv);
        }

    });


}


// Event handler city search


$("#select-city").on("click", function (event) {
    // Prevent button from submitting
    event.preventDefault();
    // Store city name
    var cityInput = $("#city-input").val().trim();

    //save search term to local storage.....
    var textContent = $(this).siblings("input").val();
    localStorage.setItem(cityInput, textContent);

    // Running the searchCity function (passing in the city as an argument) 
    searchCity(cityInput);

});