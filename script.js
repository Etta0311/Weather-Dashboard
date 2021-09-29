// searchBtn set same as HTML
var searchBtn = $(".searchBtn");
// specific key from weather API
var APIkey = "92f36480b75fd77dcca033bbff33cded";

var Currentcityname = $(".Currentcityname");
var CurrenttempinC = $(".CurrenttempinC");
var Currenthumidity = $(".Currenthumidity");
var CurrentFLtemp = $(".CurrentFLtemp");
var Currenticon = $(".Currenticon");


searchBtn.click(function(){
    // get value of cityname input by user
    var cityinput = $(".cityinput").val();
    console.log(cityinput);

    //Get current weather data from API
    fetch('http://api.openweathermap.org/data/2.5/weather?q=' + cityinput + '&appid=' + APIkey + "&units=metric")
    .then(response => response.json())
    .then(data => {
        var cityname = data.name;
        var countryname = data.sys.country;
        var tempinC = data.main.temp;
        var humidity = data.main.humidity;
        var FLtemp = data.main.feels_like;
        var icon = data.weather[0].icon;
        var iconlink = "http://openweathermap.org/img/w/" + icon + ".png";

        Currentcityname.text(cityname + " , " + countryname);
        CurrenttempinC.text("Current temperature : " + tempinC + "°C");
        Currenthumidity.text("Humidity : " + humidity + " %");
        CurrentFLtemp.text("Feels like : " + FLtemp + "°C");
        Currenticon.attr('src', iconlink);
    })

    // Get 5 day forcast weather data from API
    fetch('http://api.openweathermap.org/data/2.5/forecast?q=' + cityinput + '&appid=' + APIkey + "&units=metric")
    .then(response => response.json())
    .then(data => {
        console.log(data);
        var forcastdate = [data.list[0], data.list[8], data.list[16], data.list[24], data.list[32]];
    
        forcastdate.forEach(function(i) {
            console.log (i);
            var indicatedate = data.list[i].dt_txt;
            var forcasticon = data.list[i].weather[0].icon;
            var forcasticonlink = "http://openweathermap.org/img/w/" + forcasticon + ".png";
            var forcasttemp = data.list[i].main.temp;
            var forcasthumidity = data.list[i].main.humidity;
            var forcastwind = data.list[i].wind.speed;

            $(".5daydata").append(
                "<div class = 5dayweather>" + 
                "<p>" + indicatedate + "<br>" +
                forcasticonlink + "<br>" +
                "Temp : " + forcasttemp + "°C" + "<br>" +
                "Humidity : " + forcasthumidity + "%" + "<br>" +
                "Wind : " + forcastwind + " M/Sec" + 
                "</p>")
        })
        
    });

})

