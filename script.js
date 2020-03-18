var cityNameDisplay = "My City";
var cityCurrent = "https://api.openweathermap.org/data/2.5/weather?q=" + "city" + "&appid=785f12a440a00e93dd6c2b0cfa40dc38";

$.ajax({
  url: queryURL,
  method: "GET"
}).then(function(response) {
  console.log(response);
});


 $.ajax({
    url: "https://api.openweathermap.org/data/2.5/weather?q=Washington%20DCo%20&appid=785f12a440a00e93dd6c2b0cfa40dc38",
    method: "GET"
  }).then(function(response) {
    console.log(response);
  });

  $.ajax({
    url: "https://api.openweathermap.org/data/2.5/weather?q=New%20York%20&appid=785f12a440a00e93dd6c2b0cfa40dc38",
    method: "GET"
  }).then(function(response) {
    console.log(response);
  });

  $.ajax({
    url: "https://api.openweathermap.org/data/2.5/weather?q=San%20Francisco%20&appid=785f12a440a00e93dd6c2b0cfa40dc38",
    method: "GET"
  }).then(function(response) {
    console.log(response);
  });