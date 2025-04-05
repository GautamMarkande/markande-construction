import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import React from "react";

function Header() {
  const { currentUser } = useSelector((state) => state.user);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    const urlsParams = new URLSearchParams(window.location.search);
    urlsParams.set("searchTerm", searchTerm);
    const searchQueries = urlsParams.toString();
    navigate(`/search?${searchQueries}`);
  };
  useEffect(() => {
    const urlsParams = new URLSearchParams(location.search);
    const searchTermFromParams = urlsParams.get("searchTerm");
    if (searchTermFromParams) {
      setSearchTerm(searchTermFromParams);
    }
  }, [location.search]);
  return (
    <header className="bg-slate-200 sticky top-0 z-10 shadow-md shadow-gray-500/50">
      <div className="flex justify-between items-center mx-auto max-w-6xl p-3">
        <Link to="/">
          <h1 className="font-bold text-sm sm:text-xl md:text-2xl lg:text-4xl flex flex-wrep flex-col sm:flex-row">
            <span className="text-slate-500">Markande</span>
            <span className="text-slate-700">Construction</span>
          </h1>
        </Link>
        <form
          onSubmit={handleSubmit}
          className="bg-slate-100 rounded-lg p-3 flex items-center w-30 sm:w-64"
        >
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent focus:outline-none w-24 sm:w-64"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="submit">
            <FaSearch className="text-slate-600" />
          </button>
        </form>
        <ul className="flex gap-4 items-center">
          <Link to="/">
            <li className="hidden sm:inline text-slate-700 hover:underline cursor-pointer">
              Home
            </li>
          </Link>
          <Link to="/about">
            <li className="hidden sm:inline text-slate-700 hover:underline cursor-pointer">
              About
            </li>
          </Link>
          {currentUser ? (
            <Link to="/profile">
              <img
                src={currentUser?.data?.photo}
                alt="profile"
                className="w-7 rounded-full h-7 object-cover"
              />
            </Link>
          ) : (
            <Link to="/sign-in">
              <li className="sm:inline text-slate-700 hover:underline cursor-pointer">
                SignIn
              </li>
            </Link>
          )}
        </ul>
      </div>
    </header>
  );
}

export default Header;
