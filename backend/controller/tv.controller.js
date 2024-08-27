import { fetchFromTMDB } from "../services/tmdb.service.js";

export async function getTrendingTv(req, res) {
  try {
    const data = await fetchFromTMDB(
      "https://api.themoviedb.org/3/tv/popular?language=en-US&page=1"
    );
    const randomTV =
      data.results[Math.floor(Math.random() * data.results?.length)];

    res.status(200).json({ success: true, content: randomTV });
  } catch (error) {
    console.log("Error in getTrendingTV: ", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
}

export async function getTvTrailer(req, res) {
  try {
    const { id } = req.params;
    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/tv/${id}/videos?language=en-US`
    );
    res.status(200).json({ success: true, trailers: data.results });
  } catch (error) {
    if (error.response.includes("404")) {
      return res.status(404).send("TV not found");
    }
    console.log("Error in getTvTrailer: ", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
}

export async function getTvDetails(req, res) {
  const { id } = req.params;
  try {
    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/tv/${id}?language=en-US`
    );
    res.status(200).json({ success: true, content: data });
  } catch (error) {
    if (error.response.includes("404")) {
      return res.status(404).send("TV not found");
    }
    console.log("Error in getTvDetails: ", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
}

export async function getSimilarTv(req, res) {
  const { id } = req.params;
  try {
    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/tv/${id}/similar?language=en-US&page=1`
    );
    res.status(200).json({ success: true, content: data.results });
  } catch (error) {
    console.log("Error in getSimilarTv: ", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
}

export async function getTvByCategory(req, res) {
  const { category } = req.params;
  try {
    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/tv/${category}?language=en-US&page=1`
    );
    res.status(200).json({ success: true, content: data.results });
  } catch (error) {
    console.log("Error in getTvByCategory: ", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
}
