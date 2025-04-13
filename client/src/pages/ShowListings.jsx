import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function ShowListings({ handleError }) {
  const navigate = useNavigate();

  const { currentUser } = useSelector((state) => state.user);
  const [listings, setListings] = useState([]);
  const [page, setPage] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const handlePagination = (type) => {
    if (type === "next") {
      setCurrentPage(currentPage + 5);
    } else if (type === "prev" && currentPage >= 5) {
      setCurrentPage(currentPage - 5);
    }
  };
  useEffect(() => {
    const fetchAllListings = async () => {
      try {
        const res = await fetch(
          `/api/listing/get/${currentUser.data._id}/${currentPage}`,
        );
        const data = await res.json();
        if (res.ok && data && data.listing) {
          setListings(data.listing);
        } else {
          handleError({
            error: "Error while fetching listings",
          });
          throw new Error("Something went wrong");
        }
      } catch (error) {}
    };
    fetchAllListings();
  }, [currentPage]);
  async function handleListingDelete(id) {
    try {
      const res = await fetch(`/api/listing/delete/${id}`, {
        method: "POST",
      });
      const data = await res.json();
      if (res.ok) {
        setListings(listings.filter((listing) => listing._id !== id));
        toast.success("Deleted Successfully");
      } else {
        throw new Error("Something went wrong");
      }
    } catch (error) {
      toast.error(error.message);
    }
  }
  const handleUpdateListing = (listing) => {
    navigate(`/update-listing/${listing._id}`, { state: listing });
  };
  return (
    <div>
      <h1 className="text-center font-semibold text-3xl my-5">
        {listings.length > 0
          ? "Your Listings"
          : "You don't have Listing, please create listing "}
      </h1>
      {listings.map((listing) => (
        <div
          key={listing._id}
          className="border rounded-lg p-3 flex justify-between items-center gap-4"
        >
          <img
            src={
              listing?.imageUrls[0]?.length > 10
                ? listing.imageUrls[0]
                : "https://imgs.search.brave.com/OmlaFOj-dvHM44hCBYzjLO7CS_71P1YljKlxxwtj47Y/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/cGl4YWJheS5jb20v/cGhvdG8vMjAyMS8x/MC8wNy8xNS8yMy9y/ZWFsLWVzdGF0ZS02/Njg4OTQ1XzY0MC5q/cGc"
            }
            alt="listing cover"
            className="h-16 w-16 object-contain cursor-pointer"
            onClick={() =>
              navigate(`/listing/${listing._id}`, { state: listing })
            }
          />

          <p
            className="text-slate-700 font-semibold  hover:underline truncate flex-1"
            onClick={() =>
              navigate(`/listing/${listing._id}`, { state: listing })
            }
          >
            {listing.name}
          </p>

          <div className="flex flex-col item-center">
            <button
              onClick={() => handleListingDelete(listing._id)}
              className="text-red-700 uppercase"
            >
              Delete
            </button>
            <button
              className="text-green-700 uppercase"
              onClick={() => handleUpdateListing(listing)}
            >
              Edit
            </button>
          </div>
        </div>
      ))}
     {listings?.length>0 ? <section className="py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-center items-center space-x-2">
            <button
              className="text-green-600 disabled:text-slate-600 bg-gray-200 py-2 px-4 rounded-lg transition duration-300"
              aria-label="Go to previous page"
              onClick={() => handlePagination("prev")}
              disabled={currentPage === 0}
            >
              Previous
            </button>
            <button
              className="text-green-600 disabled:text-slate-600 bg-gray-200 hover:bg-gray-300 py-2 px-4 rounded-lg transition duration-300"
              aria-label="Go to next page"
              onClick={() => handlePagination("next")}
              disabled={currentPage==0 && listings.length<5 ? true :  currentPage > listings.length}
            >
              Next
            </button>
          </div>
        </div>
      </section> : null}
    </div>
  );
}
export default ShowListings;
