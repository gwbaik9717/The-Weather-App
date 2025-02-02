import { CurrentWeatherDTO } from "@/types/dto";

export type Weather = {
  readonly id: number;
  readonly temperature: number;
  readonly minTemperature: number;
  readonly maxTemperature: number;
  readonly description: string;
  readonly iconUrl: string;
};

export const createWeather = (dto: CurrentWeatherDTO): Weather => {
  const ICON_BASE_URL = "https://openweathermap.org/img/wn";
  const weatherInfo = dto.weather[0];

  return {
    id: weatherInfo.id,
    temperature: dto.main.temp,
    minTemperature: dto.main.temp_min,
    maxTemperature: dto.main.temp_max,
    description: weatherInfo.description,
    iconUrl: `${ICON_BASE_URL}/${weatherInfo.icon}@2x.png`,
  };
};
