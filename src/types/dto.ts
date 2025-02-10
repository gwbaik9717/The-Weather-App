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

export type WeatherDTO = {
  weather: Array<WeatherIconDTO>;
  main: WeatherMainDTO;
  dt: number; // Time of data forecasted, unix, UTC
};

export type CurrentWeatherDTO = {
  name: string;
} & WeatherDTO;

export type ForecastWeatherDTO = {
  list: Array<WeatherDTO>;
  city: {
    name: string;
    country: string;
  };
};
