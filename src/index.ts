import "./styles.css";
import { currentWeatherPage } from "@/view/currentWeatherPage";
import { $ } from "@/utils/dom";
import { router } from "@/router";

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
  ],
});
