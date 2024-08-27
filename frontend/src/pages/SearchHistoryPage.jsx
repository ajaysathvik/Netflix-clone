import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import { SMALL_IMG_BASE_URL } from "../utils/constants";
import { Trash } from "lucide-react";
import toast from "react-hot-toast";

function formatDate(dateString) {
  const date = new Date(dateString);

  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const month = monthNames[date.getUTCMonth()];
  const day = date.getUTCDate();
  const year = date.getUTCFullYear();

  return `${month} ${day}, ${year}`;
}

const SearchHistoryPage = () => {
  const [searchHistory, setSearchHistory] = useState([]);

  useEffect(() => {
    const getSearchHistory = async () => {
      try {
        const response = await axios.get("/api/v1/search/history");
        setSearchHistory(response.data.content);
      } catch (error) {
        console.log(error);
        setSearchHistory([]);
      }
    };
    getSearchHistory();
  }, []);

  const handleDelete = async (search) => {
    try {
      await axios.delete(`/api/v1/search/history/${search.id}`);
      setSearchHistory(searchHistory.filter((s) => s.id !== search.id));
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete search history");
    }
  };

  if (searchHistory?.length === 0) {
    return (
      <div className="bg-black min-h-screen text-white">
        <Navbar />
        <div className="max-w-6xl mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-8">Search History</h1>
          <div className="flex justify-center items-center h-96">
            <p className="text-xl">No search history found</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-black text-white min-h-screen">
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Search History</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {searchHistory.map((search) => (
            <div
              key={search._id}
              className="bg-gray-800 p-4 rounded-lg flex items-start"
            >
              <img
                src={SMALL_IMG_BASE_URL + search.image}
                alt="History image"
                className="size-16 rounded-full object-cover mr-4"
              />
              <div className="flex flex-col">
                <span className="text-white text-lg">{search.title}</span>
                <span className="text-gray-400 text-sm">
                  {formatDate(search.createdAt)}
                </span>
              </div>
              <span
                className={
                  search.searchType === "movie"
                    ? "bg-red-400 text-black px-2 py-1 rounded-lg ml-auto"
                    : search.searchType === "tv"
                    ? "bg-blue-400 text-black px-2 py-1 rounded-lg ml-auto"
                    : "bg-green-400 text-black px-2 py-1 rounded-lg ml-auto"
                }
              >
                {search.searchType[0].toUpperCase() +
                  search.searchType.slice(1)}
              </span>
              <Trash
                className="size-5 ml-4 cursor-pointer hover:fill-red-600 hover:text-red-600"
                onClick={() => handleDelete(search)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchHistoryPage;
