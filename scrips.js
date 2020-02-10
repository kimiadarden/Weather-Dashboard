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


$("#serchingBt").on("click", function() {

    $('#fiveDayForcast').addClass('show');
  
    // get the value of the input from user
    city = $("#serchingInput").val();
    
    // clear input box
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
  
  





