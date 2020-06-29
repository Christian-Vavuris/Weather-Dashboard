var cityInputEl = document.getElementById("city-input");
var cityButton = document.getElementById("button-addon2");
var cityList = document.getElementById("city-list")
var placeholderCity = document.getElementById("placeholder-city")
var today = moment().format('MMMM Do, YYYY')
var searchedCities = []




var getCityName = function() {
    var cityName = cityInputEl.value.trim();
    if (cityName === "") {
        alert("Please enter a city name")
    }
    else {
    saveCityName(cityName);
    getCurrentWeatherData()
    fiveDayForecast()
    cityInputEl.value = "";
    }
    return cityName;
}

var date = moment().format('MMMM Do, YYYY')

//Save the selected name to the Array, add it local storage. Have names persist. 

var saveCityName = function (city) {
    var storedCities = localStorage.getItem("cities");
    let workingArray;
    if(storedCities === null) {
        workingArray = []
    } else {
        workingArray = JSON.parse(storedCities);
    }
     // add city name to array
    workingArray.push(city);
    // console.log(workingArray)

    //re-commit to local storage
    localStorage.setItem("cities", JSON.stringify(workingArray))
}



// fetch information from the weather API

var getCurrentWeatherData = function () {
    var city = document.getElementById("city-input").value;
    fetch(
        "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=266f11527048c408054397eabed73286"
    )
    .then(function (response) {
        return response.json();
      })
      // now we display it to the HTML
      .then(function (data) {
        // console.log(data);
        document.getElementById("date").innerHTML = date
        document.getElementById("name").innerHTML = data.name;
        document.getElementById("temp").innerHTML = Math.floor(((data.main.temp -273)*1.8)+32) + " degrees farenheight";
        document.getElementById("humidity").innerHTML = (data.main.humidity) + '% humidity';
        document.getElementById("wind").innerHTML = data.wind.speed + " mph wind speed";

      });
  };


var fiveDayForecast = function () {
    var city = document.getElementById("city-input").value;
    fetch(
        "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=266f11527048c408054397eabed73286"
    )
    .then(function (response) {
        return response.json();
      })
    .then(function (data) {
        console.log(data);
        //Card1
        document.getElementById("ch1").innerHTML = moment().add(1, "days").format('dddd')
        document.getElementById("temp1").innerHTML =  Math.floor(((data.list[4].main.temp -273)*1.8)+32) + " degrees farenheight";
        document.getElementById("humid1").innerHTML = data.list[4].main.humidity + "% Humid";
        //Card2
        document.getElementById("ch2").innerHTML = moment().add(2, "days").format('dddd')
        document.getElementById("temp2").innerHTML =  Math.floor(((data.list[12].main.temp -273)*1.8)+32) + " degrees farenheight";
        document.getElementById("humid2").innerHTML = data.list[12].main.humidity + "% Humid";
        //Card3
        document.getElementById("ch3").innerHTML = moment().add(3, "days").format('dddd')
        document.getElementById("temp3").innerHTML =  Math.floor(((data.list[20].main.temp -273)*1.8)+32) + " degrees farenheight";
        document.getElementById("humid3").innerHTML = data.list[20].main.humidity + "% Humid";
        //Card4
        document.getElementById("ch4").innerHTML = moment().add(4, "days").format('dddd')
        document.getElementById("temp4").innerHTML =  Math.floor(((data.list[28].main.temp -273)*1.8)+32) + " degrees farenheight";
        document.getElementById("humid4").innerHTML = data.list[28].main.humidity + "% Humid";
        //Card5
        document.getElementById("ch5").innerHTML = moment().add(5, "days").format('dddd')
        document.getElementById("temp5").innerHTML =  Math.floor(((data.list[36].main.temp -273)*1.8)+32) + " degrees farenheight";
        document.getElementById("humid5").innerHTML = data.list[36].main.humidity + "% Humid";
    })
}

var displayPreviousSearches = function() {
    var storedCities = localStorage.getItem("cities")
    var citiesToList = JSON.parse(storedCities);
    console.log(citiesToList)

    for (i=0; i<citiesToList.length; i++) {
        var newItem =  document.createElement("li");
        newItem.className = "list-group-item";
        var textInput = document.createTextNode(citiesToList[i]);
        newItem.appendChild(textInput);
        cityList.appendChild(newItem)
    }
}



// event listener for when the button is clicked (DONE)

cityButton.addEventListener("click", getCityName)
cityInputEl.addEventListener("submit", getCityName)
cityButton.addEventListener("click", getCurrentWeatherData())
cityInputEl.addEventListener("submit", getCurrentWeatherData())

displayPreviousSearches()