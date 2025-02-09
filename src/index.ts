import { createRouter } from "ganu-router";
import { currentWeatherPage } from "@/view/currentWeatherPage";
import { $ } from "./utils/dom";

const app = $("#app");
if (!app) {
  throw new Error("Cannot find app root element");
}

const router = createRouter();
router.initialize({
  routes: [
    {
      path: "/",
      handler: () => {
        currentWeatherPage.render(app);
      },
    },
  ],
});
