import dotenv from "dotenv";

dotenv.config();

export const ENV = {
  OPEN_WEATHER_API_KEY: process.env.OPEN_WEATHER_API_KEY as string,
} as const;

if (!ENV.OPEN_WEATHER_API_KEY) {
  throw new Error("OPEN_WEATHER_API_KEY is required");
}
