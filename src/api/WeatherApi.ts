import type { WeatherResponse } from "../types/WeatherResponse";

export interface FetchWeatherParams {
  latitude?: number;
  longitude?: number;
}

// take ethiopia coordinate data as defauld it will scall for the feature upgrade 
export async function fetchWeather({
  latitude = 9.145,
  longitude = 40.489
}: FetchWeatherParams = {}): Promise<WeatherResponse> {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Weather API Error: ${response.status}`);
  }

  const data = await response.json();
  return data as WeatherResponse;
}