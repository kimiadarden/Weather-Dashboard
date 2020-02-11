// store the value of the input
let city = $("#serchingInput").val();
//  api key
const apiKey = "&appid=66569c356f36c97349e4385fd588495f";

let date = new Date();

$("#serchingInput").keypress(function (event) {
  // keycode===13 is the enter key 
  if (event.keyCode === 13) {
    event.preventDefault();
    $("#serchingBt").click();
  }
});

//function to be able to search for new city using the openweather URL
$("#serchingBt").on("click", function () {

  $('#fiveDayForcast').addClass('show');

  // User input 
  city = $("#serchingInput").val();

  // clearing the data 
  $("#serchingInput").val("");

  // URL
  const mainQuery = "https://api.openweathermap.org/data/2.5/weather?q=" + city + apiKey;

  $.ajax({
    url: mainQuery,
    method: "GET"
  })
    .then(function (response) {
      //converting the tempreture
      let farenTemp = (response.main.temp - 273.15) * 1.80 + 32;

      usersLocation(response);
      weatherList();
    })
});



//append the new city after the old one 
function weatherList() {
  let userCitynames = $("<li>").addClass("list-group-item").text(city);
  $(".list").append(userCitynames);
}




function usersLocation (response) {
  
  // convert the temp to F
  let farenTemp = (response.main.temp - 273.15) * 1.80 + 32;
  farenTemp = Math.floor(farenTemp);

  $('#usersCityNow').empty();

  // using the console.log getting the right location for each items 
  const cardBody = $("<div>").addClass("card-body");
  const card = $("<div>").addClass("card");
  const city = $("<h4>").addClass("card-title").text(response.name);
  const cityDate = $("<h4>").addClass("card-title").text(date.toLocaleDateString('en-US'));
  const temperature = $("<p>").addClass("card-text current-temp").text("Temperature: " + farenTemp + " °F");
  const humidity = $("<p>").addClass("card-text current-humidity").text("Humidity: " + response.main.humidity + "%");
  const wind = $("<p>").addClass("card-text current-wind").text("Wind : " + response.wind.speed + " MPH");
  const image = $("<img>").attr("src", "https://openweathermap.org/img/w/" + response.weather[0].icon + ".png")

  // append it to the page 
  city.append(cityDate, image)
  cardBody.append(city, temperature, humidity, wind);
  card.append(cardBody);
  $("#usersCityNow").append(card)
 
}