"use strict";

const search = document.querySelector("#searchInput");
const searchBtn = document.querySelector("#searchBtn");
const weatherCards = document.querySelector("#weatherCards");

async function fetchData(location) {
    let data;
    try {
        const res = await fetch(
            `https://api.weatherapi.com/v1/forecast.json?key=fe1e54d7b66d4c7da01173847252506&q=${location}&days=3`
        );
        if (!res.ok) throw new Error("Invalid city name or API issue");
        data = await res.json();
    } catch (error) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: `Something went wrong: ${error.message}`,
        });
    }
    return data;
}

searchBtn.addEventListener("click", async () => {
    const location = search.value.trim();
    if (!location) return;

    const data = await fetchData(location);
    if (data) {
        displayCards(data);
    } else {
        weatherCards.innerHTML = `<p style="color:red;text-align:center;">No data found. Please try another city.</p>`;
    }
});
const relativeDays = ['Today', 'Tomorrow','The Day After']
function displayCards(data) {
    const days = data.forecast.forecastday;
    let blackBox='';
    days.forEach((day,i) => {
        blackBox += `
        <div class="col-lg-4 glassy-bg item">
        <p class="h2">${relativeDays[i]}</p>
        <p>${day.day.condition.text}</p>
        <hr />
        <h3>${day.date}</h3>
        <img src="https:${day.day.condition.icon}" class="w-25" alt="icon" />
        <div class="d-flex justify-content-around">
        <p>🌡️ Max: ${day.day.maxtemp_c}°C</p>
        <p> Avg: ${day.day.avgtemp_c}°C</p>
        <p>❄️ Min: ${day.day.mintemp_c}°C</p>
        </div>
        </div>
        `;
    });
    weatherCards.innerHTML = blackBox;
}
