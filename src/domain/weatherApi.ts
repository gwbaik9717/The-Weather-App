import { createApiClient } from "@/domain/apiClient";
import { ForecastWeatherDTO, CurrentWeatherDTO } from "@/types/dto";
import { AxiosRequestConfig, isAxiosError } from "axios";
import { Weather, createWeather, createWeatherForecast } from "./weather";

const API_KEY = import.meta.env.VITE_OPEN_WEATHER_API_KEY;

if (!API_KEY) {
  throw new Error("VITE_OPEN_WEATHER_API_KEY is required in .env file");
}

export type WeatherLocation = {
  lat: number;
  lon: number;
};

const generateWeatherApiClient = () => {
  const BASE_URL = "https://api.openweathermap.org/data/2.5/";
  const apiClient = createApiClient({
    baseURL: BASE_URL,
  });

  return apiClient;
};

const generateWeatherQueryParams = (location: WeatherLocation) => {
  return {
    ...location,
    appid: API_KEY,
    units: "metric",
  };
};

const generateWeatherErrorMessage = (code?: string) => {
  switch (code) {
    case "401":
      throw new Error("API key is not valid.");
    case "404":
      throw new Error("Wrong location information provided.");
    case "429":
      throw new Error("Too many requests. Please try again later.");
    case "500":
    case "502":
    case "503":
    case "504":
      throw new Error("Internal Sever Error. Please try again later.");
    default:
      throw new Error("Unknown error. Please contact us.");
  }
};

export const weatherApi = (() => {
  const apiClient = generateWeatherApiClient();

  const getCurrentWeatherData = async (
    location: WeatherLocation
  ): Promise<Weather> => {
    try {
      const params = generateWeatherQueryParams(location);
      const config: AxiosRequestConfig = { params };
      const { data } = await apiClient.get<CurrentWeatherDTO>(
        "/weather",
        config
      );

      return createWeather(data);
    } catch (e: unknown) {
      if (isAxiosError(e)) {
        const errorMessage = generateWeatherErrorMessage(e.code);
        throw new Error(errorMessage);
      }
      throw e;
    }
  };

  const getForecastWeatherData = async (
    location: WeatherLocation
  ): Promise<Weather[]> => {
    try {
      const params = generateWeatherQueryParams(location);
      const config: AxiosRequestConfig = { params };
      const { data } = await apiClient.get<ForecastWeatherDTO>(
        "/forecast",
        config
      );

      return createWeatherForecast(data);
    } catch (e: unknown) {
      if (isAxiosError(e)) {
        const errorMessage = generateWeatherErrorMessage(e.code);
        throw new Error(errorMessage);
      }
      throw e;
    }
  };

  return {
    getCurrentWeatherData,
    getForecastWeatherData,
  };
})();
