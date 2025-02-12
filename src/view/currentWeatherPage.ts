import { Weather } from "@/domain/weather";
import { weatherCard } from "@/view/weatherCard";
import { page } from "@/view/page";
import { weatherApi } from "@/domain/weatherApi";
import { router } from "@/router";

const SeoulLocation = { lat: 37.58, lon: 127 };

export const currentWeatherPage = (() => {
  let $page: HTMLElement;

  const renderSkeletonCard = () => {
    const $weatherSkeletonCard = weatherCard.createSkeleton();
    $page.appendChild($weatherSkeletonCard);
  };

  const renderCard = (weather: Weather) => {
    const $weatherCard = weatherCard.create(weather);
    $weatherCard.classList.add("cursor-pointer");
    $weatherCard.addEventListener("click", () => {
      const params = new URLSearchParams({
        lat: SeoulLocation.lat.toString(),
        lon: SeoulLocation.lon.toString(),
      });
      router.navigate(`/forecast?${params.toString()}`);
    });
    $page.appendChild($weatherCard);
  };

  const clear = () => {
    $page.innerHTML = "";
  };

  const render = async ($app: HTMLElement) => {
    $page = page.create();
    $app.innerHTML = "";
    $app.appendChild($page);
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
