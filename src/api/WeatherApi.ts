import type { WeatherResponse } from "../types/WeatherResponse";

export async function fetchWeather(): Promise<WeatherResponse> {
  const url = "https://api.open-meteo.com/v1/forecast?latitude=9&longitude=39.5&hourly=temperature_2m";
  const response = await fetch(url);
  console.log(response);

  if (!response.ok) throw new Error("Could not fetch weather data");
  return await response.json() as WeatherResponse;
}
