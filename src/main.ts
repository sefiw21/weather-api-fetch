import "./style.css";
import { fetchWeather } from "./api/WeatherApi";
import type { WeatherResponse } from "./types/WeatherResponse";
import { RenderWeatherForcast } from "./render/WeatherForcast";

let weatherData: WeatherResponse | null = null;
let hoursToShow = 24;

const listContainer = document.getElementById("weatherList") as HTMLUListElement;
const btn = document.getElementById("loadMoreBtn") as HTMLButtonElement;

btn.addEventListener("click", () => {
  if (!weatherData) return;
  hoursToShow += 24;
  RenderWeatherForcast(weatherData, hoursToShow); // Pass the updated state to the view
});

// initialization
async function init() {
  listContainer.innerHTML = '<li class="text-white">Loading data...</li>';
  try {
    weatherData = await fetchWeather(); 
    btn.classList.remove("hidden");    
    RenderWeatherForcast(weatherData, hoursToShow); // Pass the fetched data to the view              
  } catch (error) {
    listContainer.innerHTML = '<li class="text-red-500">Error loading data</li>';
    console.error(error);
  }
}

init();