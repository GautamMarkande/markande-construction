import { useNavigate } from "react-router-dom";
import { MdLocationOn } from "react-icons/md";
function ListingItem({ listing }) {
  const navigate = useNavigate();
  const handleClick = (listing) => {
    navigate(`/listing/${listing._id}`, { state: listing });
  };
  return (
    <div
      onClick={() => handleClick(listing)}
      className="cursor-pointer bg-white shadow-md rounded-lg overflow-hidden max-w-[300px]"
    >
      <div className="listing-item">
        <img
          src={
            listing?.imageUrls[0]?.length > 10
              ? listing.imageUrls[0]
              : "https://imgs.search.brave.com/OmlaFOj-dvHM44hCBYzjLO7CS_71P1YljKlxxwtj47Y/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/cGl4YWJheS5jb20v/cGhvdG8vMjAyMS8x/MC8wNy8xNS8yMy9y/ZWFsLWVzdGF0ZS02/Njg4OTQ1XzY0MC5q/cGc"
          }
          alt={listing.name}
          className="listing-image hover:scale-105 translate-scale duration-300 w-full h-[320px] sm:h-[220px]
             object-cover
             "
        />
        <div className="p-3 flex flex-col gap-2">
          <p
            className="
            truncate
            font-semibold text-slate-700 text-lg
            "
          >
            {listing.name}
          </p>
          <div className="flex gap-2 items-center">
            <MdLocationOn className=" w-4 h-4 text-green-700" />
            <p className="text-gray-600 text-sm truncate">{listing.address}</p>
          </div>
          <p className="line-clamp-2 text-gray-600 text-sm">
            {listing.description}
          </p>
          <p className="text-gray-600 text-sm font-semibold">
            {listing.offer
              ? listing.discountPrice.toLocaleString("en-US")
              : listing.regularPrice.toLocaleString("en-US")}{" "}
            {listing.type === "rent" ? "$/month" : "$"}
          </p>
          <div className="flex gap-2 items-center text-gray-600 text-sm font-semibold">
            <div className="flex gap-1">
              <span>{listing.bedrooms}</span>
              <span>{listing.bedrooms > 1 ? "Beds" : "Bed"}</span>
            </div>
            <div className="flex gap-1">
              <span>{listing.bathrooms}</span>
              <span>{listing.bathrooms > 1 ? "Bathrooms" : "Bathroom"}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ListingItem;
