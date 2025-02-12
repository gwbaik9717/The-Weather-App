import { Weather } from "@/domain/weather";
import { weatherCard } from "@/view/weatherCard";
import { page } from "@/view/page";
import { weatherApi, WeatherLocation } from "@/domain/weatherApi";
import { createElement } from "@/utils/dom";
import { router } from "@/router";

const NUM_CARDS = 15;

export const forecastWeatherPage = (() => {
  let $page: HTMLElement;

  const getLocation = (): WeatherLocation | null => {
    const params = router.getParams();

    const paramsLat = params.searchParams?.get("lat");
    const paramsLon = params.searchParams?.get("lon");

    if (paramsLat && paramsLon) {
      const lat = Number(paramsLat);
      const lon = Number(paramsLon);

      return {
        lat,
        lon,
      };
    }

    return null;
  };

  const renderSkeletonCards = () => {
    const $wrapper = createElement("div");
    $wrapper.setAttribute("class", "flex flex-col gap-4");

    const weatherSkeletonCards = Array.from({ length: NUM_CARDS }, () =>
      weatherCard.createSkeleton()
    );

    weatherSkeletonCards.forEach(($skeletonCard) => {
      $wrapper.appendChild($skeletonCard);
    });

    $page.appendChild($wrapper);
  };

  const renderCards = (forecastWeather: Array<Weather>) => {
    const $wrapper = createElement("div");
    $wrapper.setAttribute("class", "flex flex-col gap-4");

    forecastWeather.forEach((weather) => {
      const $weatherCard = weatherCard.create(weather);
      $wrapper.appendChild($weatherCard);
    });

    $page.appendChild($wrapper);
  };

  const clear = () => {
    $page.innerHTML = "";
  };

  const render = async ($app: HTMLElement) => {
    $page = page.create();
    $app.innerHTML = "";
    $app.appendChild($page);
    renderSkeletonCards();

    const location = getLocation();

    if (!location) {
      return;
    }

    try {
      const forecastWeather = await weatherApi.getForecastWeatherData(location);
      clear();
      renderCards(forecastWeather.slice(0, NUM_CARDS));
    } catch (e) {
      console.error(e);
    }
  };

  return {
    render,
  };
})();
