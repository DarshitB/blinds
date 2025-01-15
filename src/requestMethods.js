import axios from "axios";
import getCookie from "./components/cookies/getCookies";

const BASE_URL = "http://localhost:5000/api/";

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  headers: { token: `Bearer ${getCookie("mytocken")}` },
});

export const baseUrlForMedia = BASE_URL;
