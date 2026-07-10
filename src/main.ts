import "./style.css";
import { fetchWeather } from "./api/WeatherApi";
import { uiElements } from "./utils/dom";
import { renderWeatherForecast, renderMetadata } from "./render/WeatherForecast";
import { getDaytimeForecast, type ProcessedWeather } from "./utils/weatherProcessor";

// State variables
let processedData: ProcessedWeather[] = []; // Store the processed data here
let hoursToShow = 24;

async function init() {
  uiElements.list.innerHTML = `
    <li class="p-4 text-center text-blue-200/80 font-bold animate-pulse bg-blue-900/40 backdrop-blur-md rounded-xl border border-blue-800/50 shadow-lg">
      Loading forecast...
    </li>
  `;

  try {
    const rawWeatherData = await fetchWeather(); 
    //  Render the static metadata exactly once first
    renderMetadata(rawWeatherData);
    
    // Process the daytime data 
    processedData = getDaytimeForecast(rawWeatherData);
    
    //  Render the initial list
    renderWeatherForecast(processedData, hoursToShow); 

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
    uiElements.list.innerHTML = `
      <li class="p-4 text-center text-red-300 bg-red-950/60 backdrop-blur-md border border-red-800/50 rounded-xl font-bold shadow-lg">
         ${errorMessage}
      </li>
    `;
  }
}
// handle the Load More click
uiElements.loadBtn.addEventListener("click", () => {
  if (processedData.length === 0) return;
  hoursToShow += 24;
  // We only pass the processed data now
  renderWeatherForecast(processedData, hoursToShow);
});
init();