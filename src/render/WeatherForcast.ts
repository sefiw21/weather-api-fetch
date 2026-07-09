import type { WeatherResponse } from "../types/WeatherResponse";
import { getElementSafe } from "../utils/dom";

// Select the list layout and control buttons
const listContainer = getElementSafe<HTMLUListElement>("weatherList");
const btn = getElementSafe<HTMLButtonElement>("loadMoreBtn");

// Select the single row metadata elements
const latEl = getElementSafe<HTMLSpanElement>("lat");
const lonEl = getElementSafe<HTMLSpanElement>("lon");
const tzEl = getElementSafe<HTMLSpanElement>("tz");
const elevEl = getElementSafe<HTMLSpanElement>("elev");

export function RenderWeatherForcast(data: WeatherResponse, hoursToShow: number) {
  const { latitude, longitude, timezone, elevation, hourly, hourly_units } = data;
  const { time, temperature_2m } = hourly; 
  const unit = hourly_units.temperature_2m;

  //  Populate metadata row coordinates immediately
  latEl.textContent = latitude.toFixed(2);
  lonEl.textContent = longitude.toFixed(2);
  tzEl.textContent = timezone;
  elevEl.textContent = Math.round(elevation).toString();

  // data transformation
  const unifiedWeather = time.map((timeString, index) => ({
    dateObj: new Date(timeString),
    temp: temperature_2m[index],
    unit: unit
  }));

  // .filter() for daytime windows
  const daytimeForecast = unifiedWeather.filter(weather => {
    const hour = weather.dateObj.getHours();
    return hour >= 8 && hour <= 18; 
  });

  // .find() search execution
  const coldSpike = daytimeForecast.find(weather => weather.temp < 15);
  if (coldSpike) {
    console.log(`Cold spike identified at: ${coldSpike.dateObj.toLocaleTimeString()}`);
  }

  // Paginate list representation
  const currentDisplayData = daytimeForecast.slice(0, hoursToShow);

  // .map() dynamic rendering
  listContainer.innerHTML = currentDisplayData.map(({ dateObj, temp, unit }) => {
    const formattedDate = dateObj.toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' });
    const formattedTime = dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    return `
    <li class="bg-blue-900 border border-blue-800 p-4 rounded-lg shadow-md flex justify-around items-center hover:bg-blue-800 transition-colors">
      <div class="font-bold text-lg text-blue-100">${formattedDate} <span class="text-blue-300 text-sm ml-2">${formattedTime}</span></div>
      <div class="text-3xl text-blue-400 font-extrabold">${temp}${unit}</div>
    </li>
    `;
  }).join("");

  // Display pagination state button 
  btn.classList.remove("hidden");

  if (hoursToShow >= daytimeForecast.length) {
    btn.textContent = "You reached the final forecast";
    btn.disabled = true; 
    btn.classList.remove("bg-blue-600", "hover:bg-blue-500", "text-white");
    btn.classList.add("bg-blue-950", "text-blue-500/50", "cursor-not-allowed", "border", "border-blue-900", "shadow-inner");
  } else {
    btn.textContent = `Showing ${hoursToShow} hours. Click for more.`;
    btn.disabled = false;
    btn.classList.add("bg-blue-600", "hover:bg-blue-500", "text-white");
    btn.classList.remove("bg-blue-950", "text-blue-500/50", "cursor-not-allowed", "border", "border-blue-900", "shadow-inner");
  }
}