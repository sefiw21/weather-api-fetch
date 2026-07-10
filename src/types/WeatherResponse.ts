export interface HourlyData {
    time: string[];
    temperature_2m:number[];
}
export interface HourlyUnits {
  temperature_2m: string;
}

export interface WeatherResponse {
  latitude: number;
  longitude: number;
  elevation: number;
  generationtime_ms: number;
  utc_offset_seconds: number;
  timezone: string;
  timezone_abbreviation: string;
  hourly: HourlyData;
  hourly_units: HourlyUnits;
}