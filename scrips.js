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
      forcastOfUser(response);
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

  // append it to the page 
  city.append(cityDate)
  cardBody.append(city, temperature, humidity, wind);
  card.append(cardBody);
  $("#usersCityNow").append(card)
 
}




  //5 day forcast function:
function forcastOfUser () {
  const query2 ="https://api.openweathermap.org/data/2.5/forecast?q=" + city + apiKey;

  $.ajax({
    url: query2,
    method: "GET"
  }).then(function (response){
    
    
    $('#WeatherForecast').empty();
    
var output= response.list;

for (var i=0 ;i<output.length;i++){
//getting the info from dt_txt using console log to find the right location
var day=Number(output[i].dt_txt.split('-')[2].split('')[0])
var hour=output[i].dt_txt.split('-')[2].split('')[1]

if(output[i].dt_txt.indexOf("12:00:00") !== -1){
          
  // get the temperature and convert to fahrenheit 
  var temp = (output[i].main.temp - 273.15) * 1.80 + 32;
  var tempF = Math.floor(temp);
  
  const card = $("<div>").addClass("card col-md-2 ml-4 bg-primary text-white");
  const cardBody = $("<div>").addClass("card-body p-3 forecastBody")
  const cityDate = $("<h4>").addClass("card-title").text(date.toLocaleDateString('en-US'));
  const temperature = $("<p>").addClass("card-text forecastTemp").text("Temperature: " + tempF + " °F");
  const humidity = $("<p>").addClass("card-text forecastHumidity").text("Humidity: " + output[i].main.humidity + "%");
  
  console.log(cityDate);
  
  const image = $("<img>").attr("src", "https://openweathermap.org/img/w/" + output[i].weather[0].icon + ".png")
  
  cardBody.append(cityDate, temperature,humidity,image);
  card.append(cardBody);
  $("#WeatherForecast").append(card);
  
}



}
  });
    
}
