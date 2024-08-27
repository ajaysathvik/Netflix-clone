import { Link } from "react-router-dom";
import { useState } from "react";
import { LogOut, Menu, Search } from "lucide-react";
import { useAuthStore } from "../store/authUser";
import { useContentStore } from "../store/content";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { logout, user } = useAuthStore();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const { setContentType } = useContentStore();

  return (
    <header className="max-w-7xl mx-auto flex flex-wrap items-center justify-between p-4 h-20">
      <div className="flex items-center gap-10 z-50 ">
        <Link to="/">
          <img
            src="/netflix-logo.png"
            alt="netflix logo"
            className="w-32 sm:w-40 "
          />
        </Link>
        {/* desktop navbar*/}
        <div className="hidden sm:flex gap-2 items-center">
          <Link
            to="/"
            className="hover:text-gray-300 transition duration-300 ease-in-out"
            onClick={() => setContentType("movie")}
          >
            Movies
          </Link>
          <Link
            to="/"
            className="hover:text-gray-300 transition duration-300 ease-in-out"
            onClick={() => setContentType("tv")}
          >
            TV Shows
          </Link>
          <Link
            to="/history"
            className="hover:text-gray-300 transition duration-300 ease-in-out"
          >
            History
          </Link>
        </div>
      </div>
      <div className="flex gap-2 items-center z-50">
        <Link to={"/search"}>
          <Search className="w-6 h-6" />
        </Link>
        <img
          src={user.image}
          alt="avatar"
          className="h-8 rounded cursor-pointer"
        />
        <LogOut className="size-6 cursor-pointer" onClick={logout} />
        <div className="sm:hidden">
          <Menu className="w-6 h-6" onClick={toggleMobileMenu} />
        </div>
      </div>
      {/* mobile navbar */}
      {isMobileMenuOpen && (
        <div className="w-full sm:hidden mt-4 border rounded-md border-gray-800 bg-black z-50">
          <Link
            to={"/"}
            className="block hover:text-gray-300 p-2"
            onClick={toggleMobileMenu}
          >
            Movies
          </Link>
          <Link
            to={"/"}
            className="block hover:text-gray-300 p-2"
            onClick={toggleMobileMenu}
          >
            TV Shows
          </Link>
          <Link
            to={"/history"}
            className="block hover:text-gray-300 p-2"
            onClick={toggleMobileMenu}
          >
            History
          </Link>
        </div>
      )}
    </header>
  );
};

export default Navbar;
