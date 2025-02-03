import { Weather } from "@/domain/weather";
import { weatherCard } from "@/view/weatherCard";
import { page } from "@/view/page";
import { weatherApi } from "@/domain/weatherApi";

const SeoulLocation = { lat: 44.34, lon: 10.99 };

export const currentWeatherPage = (() => {
  let $page: HTMLElement;
  let initialized = false;

  const init = (app: HTMLElement) => {
    if (initialized) return;
    $page = page.create();
    app.appendChild($page);
    initialized = true;
  };

  const renderSkeletonCard = () => {
    const $weatherSkeletonCard = weatherCard.createSkeleton();
    $page.appendChild($weatherSkeletonCard);
  };

  const renderCard = (weather: Weather) => {
    const $weatherCard = weatherCard.create(weather);
    $page.appendChild($weatherCard);
  };

  const clear = () => {
    $page.innerHTML = "";
  };

  const render = async (app: HTMLElement) => {
    init(app);
    renderSkeletonCard();

    try {
      const weather = await weatherApi.getCurrentWeatherData(SeoulLocation);
      clear();
      renderCard(weather);
    } catch (e) {
      console.error(e);
    }
  };

  return {
    render,
  };
})();
