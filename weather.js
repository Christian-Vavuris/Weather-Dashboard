var cityInputEl = document.getElementById("city-input");
var cityButton = document.getElementById("button-addon2");
var cityList = document.getElementById("city-list")
var placeholderCity = document.getElementById("placeholder-city")
var searchedCities = []




var getCityName = function() {
    var cityName = cityInputEl.value.trim();
    if (cityName === "") {
        alert("Please enter a city name")
    }
    else {
    saveCityName(cityName);
    getCurrentWeatherData()
    cityInputEl.value = "";
    }
    return cityName;
}

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
    console.log(workingArray)

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
        console.log(data);
        document.getElementById("name").innerHTML = data.name;
        document.getElementById("temp").innerHTML = data.main.temp;
        document.getElementById("humidity").innerHTML = data.main.humidity;
        document.getElementById("wind").innerHTML = data.wind.speed;

      });
  };

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