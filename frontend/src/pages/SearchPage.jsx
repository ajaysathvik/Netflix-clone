import { useState } from "react";
import { useContentStore } from "../store/content";
import Navbar from "../components/Navbar";
import { Search } from "lucide-react";
import axios from "axios";
import { Link } from "react-router-dom";
import { ORIGINAL_IMG_BASE_URL } from "../utils/constants.js";

const SearchPage = () => {
  const [activeTab, setActiveTab] = useState("movie");
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const { setContentType } = useContentStore();

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    tab === "movie" ? setContentType("movie") : setContentType("tv");
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        `/api/v1/search/${activeTab}/${searchTerm}`
      );
      setSearchResults(response.data.content);
    } catch (error) {
      if (error.response.status === 404) {
        setSearchResults([]);
      }
      console.log(error);
    }
  };

  return (
    <div className="bg-black min-h-screen text-white">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center gap-3 mb-4">
          <button
            className={`py-2 px-4 rounded-lg ${
              activeTab === "movie" ? "bg-red-500" : "bg-gray-500"
            } hover:bg-red-700`}
            onClick={() => handleTabClick("movie")}
          >
            Movies
          </button>
          <button
            className={`py-2 px-4 rounded-lg ${
              activeTab === "tv" ? "bg-red-500" : "bg-gray-500"
            } hover:bg-red-700`}
            onClick={() => handleTabClick("tv")}
          >
            Tv Shows
          </button>
          <button
            className={`py-2 px-4 rounded-lg ${
              activeTab === "person" ? "bg-red-500" : "bg-gray-500"
            } hover:bg-red-700`}
            onClick={() => handleTabClick("person")}
          >
            People
          </button>
        </div>
        <form
          action=""
          className="flex gap-2 items-stretch mb-8 max-w-2xl mx-auto"
          onSubmit={handleSearch}
        >
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
            }}
            placeholder={"Search for a " + activeTab}
            className="w-full p-4 rounded-lg bg-gray-700  text-white"
          />
          <button className="bg-red-600  hover:bg-red-700 text-white p-2 rounded-lg">
            <Search className="size-10 " />
          </button>
        </form>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {searchResults.map((result) => {
            let path =
              result.poster_path === null
                ? result.backdrop_path
                : result.poster_path;
            if (
              result.poster_path &&
              !result.profile_path &&
              !result.backdrop_path
            )
              return null;
            return (
              <div key={result.id} className="bg-gray-800 p-4 rounded-lg">
                {activeTab === "person" ? (
                  <div className="flex flex-col items-center">
                    <img
                      src={ORIGINAL_IMG_BASE_URL + result.profile_path}
                      alt={result.name}
                      className="mt-2 text-xl font-bold"
                    />
                    <h2 className=" mt-2 text-xl font-bold">{result.name}</h2>
                  </div>
                ) : (
                  result.poster_path && (
                    <Link
                      to={"/watch" + result.id}
                      onClick={() => {
                        setContentType(activeTab);
                      }}
                    >
                      <img
                        src={ORIGINAL_IMG_BASE_URL + path}
                        alt={result?.title || result?.name}
                        className="w-full h-auto rounded-lg"
                      />
                      <h2 className="mt-2 text-xl font-bold">
                        {result.title || result.name}
                      </h2>
                    </Link>
                  )
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
