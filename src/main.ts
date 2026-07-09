import "./style.css";
import { fetchWeather } from "./api/WeatherApi";

import type { WeatherResponse } from "./types/WeatherResponse";
import { uiElements } from "./utils/dom";
import { renderWeatherForecast } from "./render/WeatherForecast";

let weatherData: WeatherResponse | null = null;
let hoursToShow = 24;

// Handle the Load More click
uiElements.loadBtn.addEventListener("click", () => {
  if (!weatherData) return;
  hoursToShow += 24;
  renderWeatherForecast(weatherData, hoursToShow);
});

async function init() {
  uiElements.list.innerHTML = `
    <li class="p-4 text-center text-blue-200/80 font-bold animate-pulse bg-blue-900/40 backdrop-blur-md rounded-xl border border-blue-800/50 shadow-lg">
      Loading forecast...
    </li>
  `;

  try {
    weatherData = await fetchWeather(); 
    renderWeatherForecast(weatherData, hoursToShow); 
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
    uiElements.list.innerHTML = `
      <li class="p-4 text-center text-red-300 bg-red-950/60 backdrop-blur-md border border-red-800/50 rounded-xl font-bold shadow-lg">
         ${errorMessage}
      </li>
    `;
  }
}

init();