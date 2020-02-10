// store the value of the input
let city = $("#serchingInput").val();
//  api key
const apiKey = "&appid=66569c356f36c97349e4385fd588495f";

let date = new Date();

const queryUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + apiKey;
