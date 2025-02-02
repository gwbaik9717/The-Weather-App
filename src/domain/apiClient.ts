import axios, { CreateAxiosDefaults } from "axios";

export const createApiClient = (config?: CreateAxiosDefaults) => {
  const apiClient = axios.create(config);

  return apiClient;
};
