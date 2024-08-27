import { fetchFromTMDB } from "../services/tmdb.service.js";
import { User } from "../models/user.model.js";

export async function searchPerson(req, res) {
  const { query } = req.params;
  try {
    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/search/person?query=${query}&language=en-US&page=1`
    );
    if (!data) {
      return res.status(404).json({ message: "No person found" });
    }

    await User.findByIdAndUpdate(req.user._id, {
      $push: {
        searchHistory: {
          id: data.results[0].id,
          image: data.results[0].profile_path,
          title: data.results[0].name,
          searchType: "person",
          createdAt: new Date(),
        },
      },
    });

    res.status(200).json({
      success: true,
      content: data.results,
    });
  } catch (error) {
    console.log("Error in searchPerson: ", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

export async function searchTv(req, res) {
  const { query } = req.params;
  try {
    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/search/tv?query=${query}&language=en-US&page=1`
    );
    if (!data) {
      return res.status(404).json({ message: "No tv show found" });
    }

    await User.findByIdAndUpdate(req.user._id, {
      $push: {
        searchHistory: {
          id: data.results[0].id,
          image: data.results[0].poster_path,
          title: data.results[0].name,
          searchType: "tv",
          createdAt: new Date(),
        },
      },
    });

    res.status(200).json({
      success: true,
      content: data.results,
    });
  } catch (error) {
    console.log("Error in searchTv: ", error);
  }
}

export async function searchMovie(req, res) {
  const { query } = req.params;
  try {
    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`
    );
    if (!data) {
      return res.status(404).json({ message: "No movie found" });
    }

    await User.findByIdAndUpdate(req.user._id, {
      $push: {
        searchHistory: {
          id: data.results[0].id,
          image: data.results[0].poster_path,
          title: data.results[0].title,
          searchType: "movie",
          createdAt: new Date(),
        },
      },
    });

    res.status(200).json({
      success: true,
      content: data.results,
    });
  } catch (error) {
    console.log("Error in searchMovie: ", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

export async function searchHistory(req, res) {
  try {
    res.status(200).json({
      success: true,
      content: req.user.searchHistory,
    });
  } catch {
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}

export async function removeItemFromSearchHistroy(req, res) {
  let { id } = req.params;
  id = parseInt(id);
  
  try {
    await User.findByIdAndUpdate(req.user._id, {
      $pull: {
        searchHistory: {
          id: id,
        },
      },
    });
    res.status(200).json({
      success: true,
      message: "Item removed from search history",
    });
  } catch (error) {
    console.log("Error in removeItemFromSearchHistroy: ", error);
  }
}
