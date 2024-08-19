// Selectors
const tempratureElem = document.querySelector(".temprature");
const locationElem = document.querySelector(".location");
const emojiImg = document.getElementById("weatherIcon");
const timeElem = document.getElementById("time");
const dayElem = document.getElementById("day");
const dateElem = document.getElementById("date");
const conditionElem = document.querySelector(".condition");
const humidityElem = document.getElementById("humidity");
const windElem = document.getElementById("wind");
const pressureElem = document.getElementById("pressure");

// Event Listener
searchBtn.addEventListener('click', async function () {
    const location = searchInput.value;
    console.log(location);

    if (location !== "") {
        const data = await fetchWeather(location);
        searchInput.value = "";

        if (data !== null) {
            updateDOM(data);
        }
    }
});

function updateDOM(data) {
    console.log('Updating UI with:', data);
    
    const temp = data.current.temp_c;
    const location = data.location.name;
    const timeData = data.location.localtime;
    const [date, time] = timeData.split(" ");
    const day = new Date(timeData).toLocaleString('en-US', { weekday: 'long' });
    const iconLink = "https:" + data.current.condition.icon;
    const condition = data.current.condition.text;
    const humidity = data.current.humidity;
    const windSpeed = data.current.wind_kph;
    const pressure = data.current.pressure_mb;

    // Update DOM
    tempratureElem.textContent = temp + "°C";
    locationElem.textContent = location;
    conditionElem.textContent = condition;
    emojiImg.src = iconLink;
    dateElem.textContent = date;
    timeElem.textContent = time;
    dayElem.textContent = day;
    humidityElem.textContent = "Humidity: " + humidity + "%";
    windElem.textContent = "Wind Speed: " + windSpeed + " kph";
    pressureElem.textContent = "Pressure: " + pressure + " mb";
}

async function fetchWeather(location) {
    const url = `http://api.weatherapi.com/v1/current.json?key=f510da795bed4b34ac642154242207&q=${location}&aqi=yes`;
    const response = await fetch(url);
    if (response.status === 400) {
        alert("City not found");
        return null;
    } else if (response.status === 200) {
        const json = await response.json();
        console.log(json);
        return json;
    }
}
