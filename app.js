const apiKey = "3588993ceffe5fa779609367d6b4280e";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=imperial&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
    // Checks if the input is empty before making the request
    if (city.trim() === "") {
        // Default background color
        document.querySelector(".card").style.background = "linear-gradient(120deg, rgb(37, 2, 153), rgb(38, 132, 213))";

        // Checks for width under or equal to 425px to apply these styles
        if (window.innerWidth <= 425) {
            document.querySelector(".card").style.minHeight = "100vh";
            document.querySelector(".card").style.borderRadius = "0";
        }

        document.querySelector(".error p").innerText = "Please enter a city name.";
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
        document.querySelector(".title").style.display = "none";

        return; // stops further execution
    }
    
    // fetches the weather data only if the input is not empty
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

    if (response.status == 404) {
        // Default background color
        document.querySelector(".card").style.background = "linear-gradient(120deg, rgb(37, 2, 153), rgb(38, 132, 213))";

        // Checks for width under or equal 425px to apply these styles
        if (window.innerWidth <= 425) {
            document.querySelector(".card").style.minHeight = "100vh";
            document.querySelector(".card").style.borderRadius = "0";
        }

        document.querySelector(".error p").innerText = "City not found.";
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
        document.querySelector(".title").style.display = "none";

    } else {
        let data = await response.json();

        // Checks for width under or equal to 425px to apply these styles
        if (window.innerWidth <= 425) {
            document.querySelector(".card").style.minHeight = "unset";
            document.querySelector(".card").style.borderRadius = "0 0 30px 30px";
        }

        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.feels_like) + "°F";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + " mph";
        document.querySelector("#high").innerHTML = "H:" + Math.round(data.main.temp_max) + "°";
        document.querySelector("#low").innerHTML = "L:" + Math.round(data.main.temp_min) + "°";

        // Changes weather icon and background color based on the type of weather conditions
        if (data.weather[0].main === "Mist") {
            weatherIcon.src = "images/mist.png";
            document.querySelector(".card").style.background = "#A9C9D9";
        } else if (data.weather[0].main === "Clouds") {
            weatherIcon.src = "images/clouds.png";
            document.querySelector(".card").style.background = "#9DB4C0";
        } else if (data.weather[0].main === "Clear") {
            weatherIcon.src = "images/clear.png";
            document.querySelector(".card").style.background = "#64C7F3";
        } else if (data.weather[0].main === "Drizzle") {
            weatherIcon.src = "images/drizzle.png";
            document.querySelector(".card").style.background = "#6089B2";
        } else if (data.weather[0].main === "Rain") {
            weatherIcon.src = "images/rain.png";
            document.querySelector(".card").style.background = "#35576D";
        } else if (data.weather[0].main === "Snow") {
            weatherIcon.src = "images/snow.png";
            document.querySelector(".card").style.background = "#A8C6D1";
        } 

        document.querySelector(".weather").style.display = "block";
        document.querySelector(".error").style.display = "none";
        document.querySelector(".title").style.display = "none";
    }
}

// Adds event listener for the button when clicked
searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
    searchBox.value = "";
});

// Adds event listener for the Enter key 
searchBox.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        checkWeather(searchBox.value);
        searchBox.value = "";
    }
});



