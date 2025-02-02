export type WeatherIconDTO = {
  id: number;
  main: string;
  description: string;
  icon: string;
};

export type WeatherMainDTO = {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
  sea_level: number;
  grnd_level: number;
};

export type CurrentWeatherDTO = {
  weather: Array<WeatherIconDTO>;
  main: WeatherMainDTO;
};

export type ForecastWeatherDTO = {
  list: Array<CurrentWeatherDTO>;
};
