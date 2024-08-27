import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useContentStore } from "../store/content";
import Navbar from "../components/Navbar";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ReactPlayer from "react-player";
import {
  ORIGINAL_IMG_BASE_URL,
  SMALL_IMG_BASE_URL,
} from "../utils/constants.js";
import { formatReleaseDate } from "../utils/dateFunction.js";
import WatchPageSkeleton from "../components/WatchPageSkeleton.jsx";

const WatchPage = () => {
  const { id } = useParams();
  const [trailers, setTrailers] = useState([]);
  const [currenttrailerindex, setCurrentTrailerindex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [content, setContent] = useState({});
  const [similarContent, setSimilarContent] = useState([]);
  const { contentType } = useContentStore();
  const sliderRef = useRef(null);

  useEffect(() => {
    const getTrailers = async () => {
      try {
        const response = await axios.get(
          `/api/v1/${contentType}/${id}/trailer`
        );
        setTrailers(response.data.trailers);
      } catch (error) {
        if (error.message.includes("404")) {
          setTrailers([]);
        }
      }
    };
    getTrailers();
  }, [contentType, id]);

  useEffect(() => {
    const getSimilarContent = async () => {
      try {
        const response = await axios.get(
          `/api/v1/${contentType}/${id}/similar`
        );
        setSimilarContent(response.data.content);
      } catch (error) {
        if (error.message.includes("404")) {
          setSimilarContent([]);
        }
      }
    };
    getSimilarContent();
  }, [contentType, id]);

  useEffect(() => {
    const getContentDetails = async () => {
      try {
        const response = await axios.get(
          `/api/v1/${contentType}/${id}/details`
        );
        setContent(response.data.content);
      } catch (error) {
        if (error.message.includes("404")) {
          setContent([]);
        }
      } finally {
        setLoading(false);
      }
    };
    getContentDetails();
  }, [contentType, id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black p-10">
        <WatchPageSkeleton />
      </div>
    );
  }

  const handelNext = () => {
    if (currenttrailerindex < trailers.length - 1) {
      setCurrentTrailerindex(currenttrailerindex + 1);
    }
  };
  const handelPrev = () => {
    if (currenttrailerindex > 0) {
      setCurrentTrailerindex(currenttrailerindex - 1);
    }
  };

  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({
        left: -sliderRef.current.offsetWidth,
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({
        left: sliderRef.current.offsetWidth,
        behavior: "smooth",
      });
    }
  };

  if (!content) {
    return (
      <div className=" bg-black text-white h-screen">
        <div className="max-w-6xl mx-auto">
          <Navbar />
          <div className="text-center mx-auto px-4 py-8 h-full mt-40">
            <h2 className="text-2xl sm:text-5xl font-bold text-balance">
              Content Not Found 😢
            </h2>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-black min-h-screen text-white">
      <div className="mx-auto container px-4 py-8 h-full">
        <Navbar />
        {trailers.length > 0 && (
          <div className="flex justify-between items-center mb-4">
            <button
              className={`bg-gray-500/70 hover:bg-gray-500/90 text-white py-2 px-4 rounded-full
                    ${
                      currenttrailerindex === 0
                        ? " opacity-50 cursor-not-allowed"
                        : ""
                    }
                    `}
              disabled={currenttrailerindex === 0}
              onClick={handelPrev}
            >
              <ChevronLeft size={24} />
            </button>
            <button
              className={`bg-gray-500/70 hover:bg-gray-500/90 text-white py-2 px-4 rounded-full 
                    ${
                      currenttrailerindex === trailers.length - 1
                        ? " opacity-50 cursor-not-allowed"
                        : ""
                    }`}
              disabled={currenttrailerindex === trailers.length - 1}
              onClick={handelNext}
            >
              <ChevronRight size={24} />
            </button>
          </div>
        )}
        <div className="aspect-video mb-8 p-2 sm:px-10 md:px-32">
          {trailers.length > 0 && (
            <ReactPlayer
              url={`https://www.youtube.com/watch?v=${trailers[currenttrailerindex].key}`}
              controls={true}
              width={"100%"}
              height={"70vh"}
              className="rounded-lg mx-auto overflow-hidden"
            />
          )}
          {trailers.length === 0 && (
            <h2 className="text-center text-xl mt-5">
              No trailers available for{" "}
              <span className="font-bold text-red-500">
                {content?.title || content?.name || content?.original_title}
              </span>{" "}
              😢
            </h2>
          )}
        </div>
        <div className="flex flex-col md:flex-row items-center justify-between gap-20 max-w-6xl mx-auto">
          <div className="mb-4 md:mb-0">
            <h2 className="text-5xl font-bold text-balance">
              {content?.title || content?.name || content?.original_title}
            </h2>
            <p className="mt-2 text-lg">
              {formatReleaseDate(
                content?.release_date || content?.first_air_date
              )}{" "}
              |{" "}
              {content?.adult ? (
                <span className="text-red-600">18+</span>
              ) : (
                <span className="text-green-600">PG-13</span>
              )}
            </p>
            <p className="mt-4 text-lg">{content?.overview}</p>
          </div>
          <img
            src={ORIGINAL_IMG_BASE_URL + content?.poster_path}
            alt="Poster image"
            className="max-h-[600px] rounded-2xl"
          />
        </div>
        {similarContent.length > 0 && (
          <div className="mt-24 max-w-7xl mx-auto relative">
            <h3 className="text-3xl font-bold mb-4">
              Similar {contentType === "movie" ? "Movies" : "TV Shows"} you may
              like
            </h3>
            <div
              className="flex overflow-x-scroll scrollbar-hide gap-4 pb-4 group"
              ref={sliderRef}
            >
              {similarContent.map((content) => {
                if (content.poster_path === null) return null;
                return (
                  <Link
                    to={`/watch/${content.id}`}
                    key={content.id}
                    className="w-52 hover:scale-105 transition-transform duration-300 flex-none"
                  >
                    <img
                      src={SMALL_IMG_BASE_URL + content.poster_path}
                      alt="Poster path"
                      className="w-full h-auto rounded-lg "
                    />
                    <h4 className="text-lg font-semibold mt-2 mx-auto items-center justify-center">
                      {content?.title ||
                        content?.name ||
                        content?.original_title}
                    </h4>
                  </Link>
                );
              })}
              <button
                className="absolute top-1/2 -translate-y-1/2 left-5 md:left-12 flex items-center justify-center size-12 rounded-full bg-black bg-opacity-50 ver:bg-opacity-75 text-white z-10"
                onClick={scrollLeft}
              >
                <ChevronLeft size={24} />
              </button>
              <button
                className="absolute top-1/2 -translate-y-1/2 right-5 md:right-12 flex items-center justify-center size-12 rounded-full bg-black bg-opacity-50 ver:bg-opacity-75 text-white z-10"
                onClick={scrollRight}
              >
                <ChevronRight size={24} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WatchPage;
