import { createRouter } from "ganu-router";
import { currentWeatherPage } from "@/view/currentWeatherPage";
import { $ } from "./utils/dom";

const app = $("#app");
if (!app) {
  throw new Error("Cannot find app root element");
}

const router = createRouter();
router.initialize();

// Define routes
router.addRoute("/", () => {
  currentWeatherPage.render(app);
});

// Default route
router.navigate("/");
