import "./style.css";
import { fetchWeather } from "./api/WeatherApi";
import { RenderWeatherForcast } from "./render/WeatherForcast";
import { getElementSafe } from "./utils/dom";
import type { WeatherResponse } from "./types/WeatherResponse";

const listContainer = getElementSafe<HTMLUListElement>("weatherList");
const btn = getElementSafe<HTMLButtonElement>("loadMoreBtn");

// State variables
let weatherData: WeatherResponse | null = null;
let hoursToShow = 24;

// Handle the Load More click
btn.addEventListener("click", () => {
  if (!weatherData) return;
  hoursToShow += 24;
  RenderWeatherForcast(weatherData, hoursToShow);
});

async function init() {
  listContainer.innerHTML = `
    <li class="p-4 text-center text-blue-300 font-bold animate-pulse bg-blue-900 rounded-lg">
      Loading forecast...
    </li>
  `;

  try {
    weatherData = await fetchWeather(); 
    RenderWeatherForcast(weatherData, hoursToShow); 
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
    listContainer.innerHTML = `
      <li class="p-4 text-center text-red-400 bg-red-950 border border-red-800 rounded-lg font-bold shadow-md">
        ${errorMessage}
      </li>
    `;
  }
}

init();