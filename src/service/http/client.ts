import axios from "axios";

const http = axios.create({ baseURL: "https://solved.ac/api/v3" });

// TODO: ENOTFOUND (no internet) handler (w/ interceptor)

export default http
