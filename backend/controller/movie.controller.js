import { fetchFromTMDB } from "../services/tmdb.service.js";

export async function getTrendingMovies(req, res) {
  try {
    const data = await fetchFromTMDB(
      "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1"
    );
    const randomMovie =
      data.results[Math.floor(Math.random() * data.results?.length)];

    res.status(200).json({ success: true, content: randomMovie });
  } catch (error) {
    console.log("Error in getTrendingMovies: ", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
}

export async function getMovieTrailer(req, res) {
  try {
    const { id } = req.params;
    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`
    );
    res.status(200).json({ success: true, trailers: data.results });
  } catch (error) {
    if (error.response.includes("404")) {
      return res.status(404).send("Movie not found");
    }
    console.log("Error in getMovieTrailer: ", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
}

export async function getMovieDetails(req, res) {
  const { id } = req.params;
  try {
    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/movie/${id}?language=en-US`
    );
    res.status(200).json({ success: true, content: data });
  } catch (error) {
    if (error.response.includes("404")) {
      return res.status(404).send("Movie not found");
    }
    console.log("Error in getMovieDetails: ", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
}

export async function getSimilarMovies(req, res) {
  const { id } = req.params;
  try {
    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/movie/${id}/similar?language=en-US&page=1`
    );
    res.status(200).json({ success: true, content: data.results });
  } catch (error) {
    console.log("Error in getSimilarMovies: ", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
}

export async function getMoviesByCategory(req, res) {
    const { category } = req.params;
    try {
        const data = await fetchFromTMDB(
            `https://api.themoviedb.org/3/movie/${category}?language=en-US&page=1`
        );
        res.status(200).json({ success: true, content: data.results });
    } catch (error) {
        console.log("Error in getMoviesByCategory: ", error.message);
        res.status(500).json({ success: false, message: error.message });
    }
}
