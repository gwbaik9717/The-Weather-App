import {
  CurrentWeatherDTO,
  ForecastWeatherItemDTO,
  isCurrentWeatherDTO,
} from "@/types/dto";

export type Weather = {
  readonly id: number;
  readonly temperature: number;
  readonly minTemperature: number;
  readonly maxTemperature: number;
  readonly description: string;
  readonly iconUrl: string;
  readonly datetime: string;
  readonly location: string;
};

export const createWeather = (
  dto: CurrentWeatherDTO | ForecastWeatherItemDTO
): Weather => {
  const ICON_BASE_URL = "https://openweathermap.org/img/wn";
  const weatherInfo = dto.weather[0];
  const location = isCurrentWeatherDTO(dto) ? dto.name : dto.city.name;

  return {
    id: weatherInfo.id,
    temperature: dto.main.temp,
    minTemperature: dto.main.temp_min,
    maxTemperature: dto.main.temp_max,
    description: weatherInfo.description,
    iconUrl: `${ICON_BASE_URL}/${weatherInfo.icon}@2x.png`,
    datetime: new Date(dto.dt * 1000).toISOString(),
    location,
  };
};
