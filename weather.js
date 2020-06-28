var cityInputEl = document.getElementById("city-input");
var cityButton = document.getElementById("button-addon2");
var searchedCities = [
    {
        name:"San Francisco"
    },
    {
        name:"Detroit"
    },
    {
        name:"Baton Rouge"
    }
]



var getCityName = function() {
    var cityName = cityInputEl.value.trim();
    if (cityName === "") {
        alert("Please enter a city name")
    }
    else {
    console.log(cityName);
    }
    return cityName, getCurrentWeatherData();
}

//Save the selected name to local storage and append it to the ul (Office Hours)

// var saveCityName = function () {
//     localStorage.setItem('cities', stringCities)

// }

// saveCityName()

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