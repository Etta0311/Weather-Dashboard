// searchBtn set same as HTML
var searchBtn = $(".searchBtn");
// specific key from weather API
var APIkey = "92f36480b75fd77dcca033bbff33cded";

var Currentcityname = $(".Currentcityname");
var CurrenttempinC = $(".CurrenttempinC");
var Currenthumidity = $(".Currenthumidity");
var CurrentFLtemp = $(".CurrentFLtemp");
var Currenticon = $(".Currenticon");
var searchHistory = [];
var historyBtn = $(".historybox");
var cityHistory;

searchBtn.on("click", search);
historyBtn.on("click", search);

function search() {

   // get value of cityname input by user
   var cityinput = $(".cityinput").val();
   console.log(cityinput);

   // save search history to localstorage and display in previous search part
   if (searchHistory.indexOf(cityinput) !== -1) {
       return;
     }
   searchHistory.push(cityinput);
   localStorage.setItem('history', JSON.stringify(searchHistory));

   cityHistory = JSON.parse(localStorage.getItem('history'));
   document.body.querySelector("ul").innerHTML = "";

   for (x = 0; x < cityHistory.length; x++) {
       var historyBtn = document.createElement("button");
       historyBtn.classList.add("row");
       historyBtn.classList.add("btn-secondary");
       historyBtn.classList.add("historyBtn");
       historyBtn.textContent = cityHistory[x];
       document.body.querySelector("ul").appendChild(historyBtn)

   }

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

   fetch('http://api.openweathermap.org/data/2.5/forecast?q=' + cityinput + '&appid=' + APIkey + "&units=metric")
   .then(secresponse => secresponse.json())
   .then(secdata => {
       var forcastdate = [secdata.list[0], secdata.list[8], secdata.list[16], secdata.list[24], secdata.list[32]];
       $(".5daydata").empty()

       forcastdate.forEach(function(i) {
           var indicatedate = i.dt_txt;
           var forcasticon = i.weather[0].icon;
           var forcasticonlink = "http://openweathermap.org/img/wn/" + forcasticon + "@2x.png";
           var forcasttemp = i.main.temp;
           var forcasthumidity = i.main.humidity;
           var forcastwind = i.wind.speed;

           $(".5daydata").append(
               "<div class = col 5dayweather>" +
               "<p>" + indicatedate + "<br>" +
               "<img src=" + forcasticonlink + ">"+ "<br>" +
               "Temp : " + forcasttemp + "°C" + "<br>" +
               "Humidity : " + forcasthumidity + "%" + "<br>" +
               "Wind : " + forcastwind + " M/Sec" +
               "</p>")
       })
   });
   });
}

function buttonSearch(cityHistory) {
    cityHistory = $(".historyBtn").text();
    console.log(cityHistory);

   fetch('http://api.openweathermap.org/data/2.5/weather?q=' + cityHistory + '&appid=' + APIkey + "&units=metric")
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

   fetch('http://api.openweathermap.org/data/2.5/forecast?q=' + cityHistory + '&appid=' + APIkey + "&units=metric")
   .then(secresponse => secresponse.json())
   .then(secdata => {
       var forcastdate = [secdata.list[0], secdata.list[8], secdata.list[16], secdata.list[24], secdata.list[32]];
       $(".5daydata").empty()
       forcastdate.forEach(function(i) {
           var indicatedate = i.dt_txt;
           var forcasticon = i.weather[0].icon;
           var forcasticonlink = "http://openweathermap.org/img/wn/" + forcasticon + "@2x.png";
           var forcasttemp = i.main.temp;
           var forcasthumidity = i.main.humidity;
           var forcastwind = i.wind.speed;
           $(".5daydata").append(
               "<div class = col 5dayweather>" +
               "<p>" + indicatedate + "<br>" +
               "<img src=" + forcasticonlink + ">"+ "<br>" +
               "Temp : " + forcasttemp + "°C" + "<br>" +
               "Humidity : " + forcasthumidity + "%" + "<br>" +
               "Wind : " + forcastwind + " M/Sec" +
               "</p>")
       })
   });
   })
}

historyBtn.on('click', buttonSearch);