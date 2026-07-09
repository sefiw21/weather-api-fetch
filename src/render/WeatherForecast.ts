import { uiElements } from "../utils/dom";
import { getDaytimeForecast } from "../utils/weatherProcessor";
import { WEATHER_CONFIG } from "../config/weatherConfig";
import type { WeatherResponse } from "../types/WeatherResponse";
//  pure day time filtering function


// main render function
export function renderWeatherForecast(data: WeatherResponse, hoursToShow: number) {
  // Update Metadata
  uiElements.lat.textContent = data.latitude.toFixed(2);
  uiElements.lon.textContent = data.longitude.toFixed(2);
  uiElements.tz.textContent = data.timezone;
  uiElements.elev.textContent = Math.round(data.elevation).toString();

  // Process Data
  const daytimeForecast = getDaytimeForecast(data);

  // Render List
  const currentDisplayData = daytimeForecast.slice(0, hoursToShow);

  uiElements.list.innerHTML = currentDisplayData.map(({ dateObj, temp, unit }) => {
    const formattedDate = dateObj.toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' });
    const formattedTime = dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    let bgStyle = "";
    let textStyle = "";
    let middleBadge = "";


// Very Cold State 
    if (temp < WEATHER_CONFIG.coldPoint) {
      bgStyle = "bg-cyan-900/40 border-cyan-500/50 hover:bg-cyan-800/60";
      textStyle = "text-cyan-300";
      middleBadge = `<span class="bg-cyan-950/80 text-cyan-200 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider border border-cyan-700/50 shadow-inner">Cold</span>`;
    } 
    // Very Hot State 
    else if (temp >= WEATHER_CONFIG.hotPoint) {
      bgStyle = "bg-orange-900/40 border-orange-500/50 hover:bg-orange-800/60";
      textStyle = "text-orange-400";
      middleBadge = `<span class="bg-orange-950/80 text-orange-200 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider border border-orange-700/50 shadow-inner">Hot</span>`;
    } 
    // Normal State 
    else {
      bgStyle = "bg-blue-900/30 border-blue-800/40 hover:bg-blue-800/50";
      textStyle = "text-blue-300";
      middleBadge = `<span class="bg-blue-950/60 text-blue-300/80 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider border border-blue-800/50 shadow-inner">Normal</span>`;
    }

return `
    <li class="${bgStyle} backdrop-blur-md border p-4 rounded-xl shadow-lg flex justify-between items-center transition-all duration-300 mb-2">
      
      <div class="font-bold text-lg text-blue-100 flex-1">
        ${formattedDate} <span class="text-blue-300/80 text-sm ml-2">${formattedTime}</span>
      </div>

      <div class="flex-1 flex justify-center">
        ${middleBadge}
      </div>

      <div class="text-3xl ${textStyle} font-extrabold flex-1 text-right">
        ${temp}${unit}
      </div>

    </li>
    `;
  }).join("");

  // Manage Button State
  updateLoadMoreButton(hoursToShow, daytimeForecast.length);
}


function updateLoadMoreButton(currentlyShowing: number, totalAvailable: number) {
  const btn = uiElements.loadBtn;
  btn.classList.remove("hidden");

  const isExhausted = currentlyShowing >= totalAvailable;
  btn.disabled = isExhausted;

  if (isExhausted) {
    btn.textContent = "You reached the final forecast";
    btn.className = "bg-blue-950/50 text-blue-500/50 cursor-not-allowed border border-blue-900/50 shadow-inner p-3 rounded-lg backdrop-blur-sm w-full mt-4";
  } else {
    btn.textContent = `Showing ${currentlyShowing} hours. Click for more.`;
    btn.className = "bg-blue-600/80 hover:bg-blue-500/80 text-white p-3 rounded-lg transition-colors backdrop-blur-sm shadow-md border border-blue-500/50 w-full mt-4";
  }
}