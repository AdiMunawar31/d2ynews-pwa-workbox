import axios from "axios";

export const apiClient = axios.create({
  baseURL: "https://newsapi.org/v2",
  timeout: 10000,
  params: {
    apiKey: "eef61386182e47b7a9bb74c1440bae58",
  },
});