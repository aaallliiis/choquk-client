import axios from "axios";
import { BASE_URL, ADMIN_BASE_URL } from "./constants";
const headers = {};

if (localStorage.getItem("token"))
  headers["Authorization"] = localStorage.getItem("token");

export const Axios = axios.create({
  baseURL: BASE_URL,
  headers,
});

export const AdminAxios = axios.create({
  baseURL: ADMIN_BASE_URL,
  headers,
});
