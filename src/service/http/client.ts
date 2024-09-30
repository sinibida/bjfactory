import axios from "axios";

export const http = axios.create({ baseURL: "https://solved.ac/api/v3" });
