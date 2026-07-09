import type { WeatherResponse } from "../types/WeatherResponse";

export async function fetchWeather(): Promise<WeatherResponse> {
  // forcast fetch for Central Ethiopia
  const url = "https://api.open-meteo.com/v1/forecast?latitude=9.145&longitude=40.489&hourly=temperature_2m";

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Weather API Error: ${response.status}`);
  }

  const data = await response.json();
  return data as WeatherResponse; 
}