import type { WeatherResponse } from "../types/WeatherResponse";

// HTML Injection
const app = document.querySelector<HTMLDivElement>("#app")!;
app.innerHTML = `
<div class="p-8 max-w-md mx-auto bg-blue-950 flex flex-col gap-6 rounded-xl shadow-lg font-sans">
  <h1 class="text-3xl font-bold text-blue-300 text-center">Weather Forecast</h1>
  <div id="metaInfo" class="bg-blue-900 border border-blue-800 p-4 rounded-lg hidden flex-col gap-2 text-blue-100 shadow-inner">
    <div class="flex justify-between"><strong>Latitude:</strong> <span id="lat"></span></div>
    <div class="flex justify-between"><strong>Longitude:</strong> <span id="lon"></span></div>
    <div class="flex justify-between"><strong>Timezone:</strong> <span id="tz"></span></div>
    <div class="flex justify-between"><strong>Elevation:</strong> <span><span id="elev"></span> m</span></div>
  </div>
  <ul id="weatherList" class="flex flex-col gap-3"></ul> 
  <button id="loadMoreBtn" class="px-4 py-3 bg-blue-500 hover:bg-blue-400 text-white font-bold rounded-lg hidden w-full transition-colors">
    Load Next 24 Hours
  </button>
</div>
`;

// Element Selectors
const listContainer = document.getElementById("weatherList") as HTMLUListElement;
const btn = document.getElementById("loadMoreBtn") as HTMLButtonElement;
const metaInfo = document.getElementById("metaInfo") as HTMLDivElement;
const latEl = document.getElementById("lat") as HTMLSpanElement;
const lonEl = document.getElementById("lon") as HTMLSpanElement;
const tzEl = document.getElementById("tz") as HTMLSpanElement;
const elevEl = document.getElementById("elev") as HTMLSpanElement;

//  render runction (accepts parameters data and hour to slice the data)
export function RenderWeatherForcast(data: WeatherResponse, hoursToShow: number) {
  // destructure from the passed data
  console.log("render called")
  const { latitude, longitude, timezone, elevation, hourly, hourly_units } = data;
  const { time, temperature_2m } = hourly; 
  const unit = hourly_units.temperature_2m;

  metaInfo.classList.remove("hidden"); 
  latEl.textContent = latitude.toString();
  lonEl.textContent = longitude.toString();
  tzEl.textContent = timezone;
  elevEl.textContent = elevation.toString();

  const unifiedWeather = time.map((timeString, index) => {
    return {
      dateObj: new Date(timeString),
      temp: temperature_2m[index],
      unit: unit
    };
  });

  const currentDisplayData = unifiedWeather.slice(0, hoursToShow);
  
  listContainer.innerHTML = currentDisplayData.map(({ dateObj, temp, unit }) => {
    const formattedDate = dateObj.toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' });
    const formattedTime = dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    return `
    <li class="bg-blue-900 border border-blue-800 p-4 rounded-lg shadow-md flex justify-between items-center hover:bg-blue-800 transition-colors">
      <div class="font-bold text-lg text-blue-100">${formattedDate} at ${formattedTime}</div>
      <div class="text-3xl text-blue-400 font-extrabold drop-shadow-md">${temp}${unit}</div>
    </li>
    `;
  }).join("");

  btn.textContent = `Showing ${hoursToShow} hours. Click for more.`;
}