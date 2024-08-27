import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar.jsx";
import { Info, Play } from "lucide-react";
import useGetTreadingContent from "../../hooks/useGetTreadingContent.jsx";
import {
  MOVIE_CATEGORY,
  ORIGINAL_IMG_BASE_URL,
  TV_CATEGORY,
} from "../../utils/constants.js";
import { useContentStore } from "../../store/content.js";
import MovieSlider from "../../components/MovieSlider.jsx";
import { useState } from "react";

const HomeScreen = () => {
  const { treadingContent } = useGetTreadingContent();
  const { contentType } = useContentStore();
  const [loading, setLoading] = useState(true);

  if (!treadingContent) {
    return (
      <div className="h-screen text-white relative">
        <Navbar />
        <div className=" absolute top-0 left-0 w-full h-full bg-black/70 flex items-center justify-center -z-10 shimmer " />
      </div>
    );
  }

  return (
    <>
      <div className="relative h-screen text-white">
        <Navbar />
        {loading && (
          <div className="absolute top-0 left-0 w-full h-full bg-black/70 flex items-center justify-center -z-10 shimmer" />
        )}
        <img
          src={ORIGINAL_IMG_BASE_URL + treadingContent?.backdrop_path}
          alt="hero img"
          className="absolute top-0 left-0 w-full h-full -z-50"
          onLoad={() => setLoading(false)}
        />
        <div
          className="absolute top-0 left-0 w-full h-full bg-black/50 -z-50"
          aria-hidden="true"
        />
        <div className="absolute top-0 left-0 h-full w-full flex flex-col justify-center px-8 md:px-16 lg:px-32">
          <div className="bg-gradient-to-b from-black via-transparent to-transparent absolute w-full h-full top-0 left-0 -z-10" />
          <div className="max-w-2xl sm:mt-80">
            <h1 className="mt-4 text-6xl font-extrabold text-balance">
              {treadingContent?.title || treadingContent?.name}
            </h1>
            <p className="mt-2 text-lg">
              {treadingContent?.release_date?.split("-")[0] ||
                treadingContent?.first_air_date?.split("-")[0]}{" "}
              | {treadingContent?.adult ? "18+" : "13+"} |{" "}
              {treadingContent?.original_language}
            </p>
            <p className="mt-4 text-lg">
              {treadingContent?.overview.length > 200
                ? treadingContent?.overview.slice(0, 230) + "..."
                : treadingContent?.overview}
            </p>
          </div>
          <div className="flex mt-8">
            <Link
              to={`/watch/${treadingContent?.id}`}
              className="bg-white hover:bg-white/80 text-black font-bold py-2 px-4 rounded-md mr-4 flex items-center"
            >
              <Play className="mr-2  fill-red-500 size-6 text-red-500 " />
              Play
            </Link>
            <Link
              to={`/watch/${treadingContent?.id}`}
              className="bg-gray-500/70 hover:bg-gray-500 text-white py-2 px-4 rounded-md flex items-center"
            >
              <Info className="mr-2 size-6 " />
              More Info
            </Link>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-10 bg-black py-10">
        {contentType === "movie"  
          ? MOVIE_CATEGORY.map((category) => (  
              <MovieSlider key={category} category={category} />
            ))
          : TV_CATEGORY.map((category) => (
              <MovieSlider key={category} category={category} />
            ))}
      </div>
    </>
  );
};

export default HomeScreen;
