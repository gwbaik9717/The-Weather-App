import "./styles.css";
import { currentWeatherPage } from "@/view/currentWeatherPage";
import { forecastWeatherPage } from "@/view/forecastWeatherPage";
import { $ } from "@/utils/dom";
import { router } from "@/router";

document.addEventListener("DOMContentLoaded", () => {
  const app = $("#app");
  if (!app) {
    throw new Error("Cannot find app root element");
  }

  router.initialize({
    routes: [
      {
        path: "/",
        handler: () => {
          currentWeatherPage.render(app);
        },
      },
      {
        path: "/forecast",
        handler: () => {
          forecastWeatherPage.render(app);
        },
      },
    ],
  });
});
