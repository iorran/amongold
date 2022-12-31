import axios from "axios";

const baseURL = process.env.BASE_URL ?? "http://localhost:3000";

export const api = axios.create({ baseURL });
