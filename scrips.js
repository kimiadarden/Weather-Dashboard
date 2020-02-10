// store the value of the input
let city = $("#serchingInput").val();
//  api key
const apiKey = "&appid=66569c356f36c97349e4385fd588495f";

let date = new Date();

$("#serchingInput").keypress(function(event) { 
	// keycode===13 is the enter key 
	if (event.keyCode === 13) { 
		event.preventDefault();
		$("#serchingBt").click(); 
	} 
});

//function to be able to search for new city using the openweather URL
$("#serchingBt").on("click", function() {

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
    .then(function (response){
        //converting the tempreture
      let tempF = (response.main.temp - 273.15) * 1.80 + 32;
  
    
      })
    });
  
  


    function weatherList() {
        let userCitynames = $("<li>").addClass("list-group-item").text(city);
        $(".list").append(userCitynames);
      }
    
    




