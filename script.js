// searchBtn set same as HTML
var searchBtn = $(".searchBtn");
// specific key from weather API
var APIkey = "92f36480b75fd77dcca033bbff33cded";

var Currentcityname = $(".Currentcityname");
var CurrenttempinF = $(".CurrenttempinF");
var Currenthumidity = $(".Currenthumidity");
var CurrentFLtemp = $(".CurrentFLtemp");
var Currenticon = $(".Currenticon");


searchBtn.click(function(){
    // get value of cityname input by user
    var cityinput = $(".cityinput").val();
    console.log(cityinput);

    fetch('http://api.openweathermap.org/data/2.5/weather?q=' + cityinput + '&appid=' + APIkey)
    .then(response => response.json())
    .then (data => console.log(data))
    
})



// .then(data => {
//     var cityname = data['name'];
//     var tempinF = data["main"]["temp"];
//     var humidity = data["humidity"];
//     var FLtemp = data["feels_like"];
//     var icon = data["weather"][0]["icon"];

//     Currentcityname.innerHTML = cityname;
//     CurrenttempinF.innerHTML = tempinF;
//     Currenthumidity.innerHTML = humidity;
//     CurrentFLtemp.innerHTML = FLtemp;
//     Currenticon.innerHTML = icon;