import axios from "axios";
import { envVars } from "../config/envVars.js";

export const fetchFromTMDB = async (url) => {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: "Bearer " + envVars.TMDB_API_KEY,
    },
  };

  const response = await axios.get(url, options);

  if(response.status !== 200) {
    throw new Error("Failed to fetch data from TMDB");
  }

  return response.data;
};
