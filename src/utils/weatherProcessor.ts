import type { WeatherResponse } from "../types/WeatherResponse";
import { WEATHER_CONFIG } from "../config/weatherConfig";

export type ProcessedWeather = {
  dateObj: Date;
  temp: number;
  unit: string;
};

export function getDaytimeForecast(data: WeatherResponse): ProcessedWeather[] {
  // destructure weather data
  const { hourly, hourly_units } = data;

  // process data to unifiy it geting one flate array of objects
  const unifiedWeather = hourly.time.map((timeString, index) => ({
    dateObj: new Date(timeString),
    temp: hourly.temperature_2m[index],
    unit: hourly_units.temperature_2m,

  }));

  // filter and return daytime hour form 8:00am to 6:00pm from unified data
  return unifiedWeather.filter(weather => {
    const hour = weather.dateObj.getHours();
    return hour >= WEATHER_CONFIG.daytimeStartHour && hour <= WEATHER_CONFIG.daytimeEndHour;
  });
}