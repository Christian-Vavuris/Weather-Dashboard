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
    console.log(cityName);
    saveCityName(cityName);
    displaySearchedCities();
    cityInputEl.value = "";

    }
    return cityName, getCurrentWeatherData();
}

//Save the selected name to the Array, add it local storage. Have names persist. I can't get it to save to local storage when I dont have an array already in there

var saveCityName = function (city) {

    // pull array from Local Storage first
    var retrievedCities = localStorage.getItem('searchedCities');
    var citiesList = JSON.parse(retrievedCities); 
    citiesList.push(city);
    // console.log(searchedCities)
    localStorage.setItem("searchedCities", JSON.stringify(searchedCities))

}

//append the cities in local storage to the ul

var displaySearchedCities = function () {
 for (i=0; i < searchedCities.length; i++) {
    var nameEl = document.createElement("li");
    nameEl.classList = "list-group-item";
    nameEl.innerHTML(searchedCities[i]);
    cityList.appendChild(nameEl);
 }

}

// fetch information from the weather API

var getCurrentWeatherData = function () {
    var city = document.getElementById('city-input').value;
    fetch(
        "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=266f11527048c408054397eabed73286"
    )
    .then(function(response) {
        return response.json();
    });
}

// display API data to the HTML

// event listener for when the button is clicked (DONE)

cityButton.addEventListener("click", getCityName)
cityInputEl.addEventListener("submit", getCityName)
cityButton.addEventListener("click", getCurrentWeatherData())
cityInputEl.addEventListener("submit", getCurrentWeatherData())