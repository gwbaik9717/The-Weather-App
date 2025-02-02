import { Weather } from "@/domain/weather";
import { createElement } from "@/utils/dom";

const weatherCard = (weather: Weather) => {
  const getTemplate = () => {
    const wrapper = createElement("div");
    wrapper.setAttribute(
      "class",
      "overflow-hidden rounded-lg bg-white shadow w-full border border-gray-200"
    );

    const innerHTML = `
      <div class="px-6 py-5">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-xl font-semibold text-gray-900">${weather.location}</h2>
          <time class="text-sm text-gray-500">${new Date(weather.datetime).toLocaleString()}</time>
        </div>

        <div class="flex items-start justify-between"> 
          <div class="flex flex-col items-center">
            <img 
              src="${weather.iconUrl}" 
              alt="${weather.description}"
              class="w-16 h-16 object-contain"
            />
            <span class="text-sm text-gray-600 mt-1 capitalize">${weather.description}</span>
          </div>

          <div class="text-right">
            <div class="mb-2">
              <div class="text-3xl font-bold text-gray-900">
                ${Math.round(weather.temperature)}°C
              </div>
            </div>
            <div class="text-sm text-gray-600">
              <span class="inline-flex gap-1">
                <span>${Math.round(weather.minTemperature)}°C</span>
                <span>/</span>
                <span>${Math.round(weather.maxTemperature)}°C</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    `;

    wrapper.innerHTML = innerHTML;
    return wrapper;
  };

  return {
    getTemplate,
  };
};

export default weatherCard;
