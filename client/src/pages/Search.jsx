import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ListingItem from "../components/ListingItem";
function Search() {
  const [sideBarData, setSideBarData] = useState({
    searchTerm: "",
    type: "all",
    parking: false,
    furnished: false,
    offer: false,
    sort: "created_at",
    order: "desc",
  });
  const [loading, setLoading] = useState(false);
  const [listings, setListings] = useState([]);
  const [showMore, setShowMore] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    if (
      e.target.id == "all" ||
      e.target.id == "rent" ||
      e.target.id === "sale"
    ) {
      setSideBarData({ ...sideBarData, type: e.target.id });
    }
    if (
      e.target.id == "parking" ||
      e.target.id == "furnished" ||
      e.target.id == "offer"
    ) {
      setSideBarData({
        ...sideBarData,
        [e.target.id]:
          e.target.checked || e.target.checked == "true" ? true : false,
      });
    }

    if (e.target.id == "searchTerm") {
      setSideBarData({ ...sideBarData, searchTerm: e.target.value });
    }
    if (e.target.id == "sort_order") {
      const sort = e.target.value.split("_")[0] || "created_at";
      const order = e.target.value.split("_")[1] || "desc";
      setSideBarData({ ...sideBarData, sort, order });
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const searchParams = new URLSearchParams();
    searchParams.set("type", sideBarData.type);
    searchParams.set("parking", sideBarData.parking);
    searchParams.set("furnished", sideBarData.furnished);
    searchParams.set("offer", sideBarData.offer);
    searchParams.set("sort", sideBarData.sort);
    searchParams.set("order", sideBarData.order);
    searchParams.set("searchTerm", sideBarData.searchTerm);
    const searchQuery = searchParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const type = searchParams.get("type");
    const parking = searchParams.get("parking");
    const furnished = searchParams.get("furnished");
    const offer = searchParams.get("offer");
    const sort = searchParams.get("sort");
    const order = searchParams.get("order");
    const searchTerm = searchParams.get("searchTerm");
    if (type || parking || furnished || offer || sort || order || searchTerm) {
      setSideBarData({
        type: type || sideBarData.type,
        parking: parking === "true",
        furnished: furnished === "true",
        offer: offer === "true",
        sort: sort || sideBarData.sort,
        order: order || sideBarData.order,
        searchTerm: searchTerm || sideBarData.searchTerm,
      });
    }
    setLoading(true);
    const fetchListings = async () => {
      const searchUrl = searchParams.toString();
      const response = await fetch(`api/listing/get?${searchUrl}`);
      const data = await response.json();
      if (data.length < 8) {
        setShowMore(false);
      } else {
        setShowMore(true);
      }
      setListings(data);
      setLoading(false);
    };
    fetchListings();
  }, [location.search]);

  const onShowMoreClick = async () => {
    setLoading(true);
    const searchParams = new URLSearchParams(location.search);
    const start = listings.length;
    searchParams.set("startIndex", start);
    const response = await fetch(`api/listing/get?${searchParams.toString()}`);
    const data = await response.json();
    if (data.length < 8) {
      setShowMore(false);
    } else {
      setShowMore(true);
    }
    setListings((prevListings) => [...prevListings, ...data]);
    setLoading(false);
  };
  return (
    <div className="flex flex-col md:flex-row">
      <div className="p-7 border-b-2 md:border-r-2 md:min-h-screen">
        <form onSubmit={handleSubmit} className="flex flex-col gap-7">
          <div className="flex items-center gap-2">
            <label className="whitespace-nowrap font-semibold">
              {" "}
              Search Term :
            </label>
            <input
              type="text"
              id="searchTerm"
              placeholder="Search..."
              className="border rounded-lg p-3 w-full"
              value={sideBarData.searchTerm}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-wrap items-end gap-2">
            <label className="font-semibold">Type:</label>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="all"
                className="w-5"
                checked={sideBarData.type === "all"}
                onChange={handleChange}
              />
              <span>Sale & Rent</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="rent"
                className="w-5"
                checked={sideBarData.type === "rent"}
                onChange={handleChange}
              />
              <span>Rent</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="sale"
                className="w-5"
                checked={sideBarData.type === "sale"}
                onChange={handleChange}
              />
              <span>Sale</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="offer"
                className="w-5"
                checked={sideBarData.offer}
                onChange={handleChange}
              />
              <span>Offer</span>
            </div>
          </div>
          <div className="flex flex-wrap items-end gap-2">
            <label className="font-semibold">Amenities:</label>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="parking"
                className="w-5"
                checked={sideBarData.parking}
                onChange={handleChange}
              />
              <span>Parking</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="furnished"
                className="w-5"
                checked={sideBarData.furnished}
                onChange={handleChange}
              />
              <span>Furnished</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <label className="font-semibold">Sort:</label>
            <select
              className="border rounded-lg p-2"
              defaultValue="created_at_desc"
              id="sort_order"
              onChange={handleChange}
            >
              <option value="regularPrice_desc">Price high to low</option>
              <option value="regularPrice_asc">Price low to high</option>
              <option value="createdAt_desc">Latest</option>
              <option value="createdAt_asc">Oldest</option>
            </select>
          </div>
          <button
            type="submit"
            className="bg-slate-700 hover:opacity-95 text-white p-3 uppercase rounded-lg"
          >
            Search
          </button>
        </form>
      </div>
      <div className="flex-1">
        <h1 className="text-3xl font-semibold text-slate-700 mt-5 p-3">
          Listing Results :
        </h1>
        <div className="grid grid-cols-1 mobile:grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-5 p-5">
          {!loading && listings.length === 0 && (
            <h1 className="text-2xl font-semibold text-slate-700 mt-5 p-3">
              No Listings Found
            </h1>
          )}
          {loading && (
            <h1 className="text-2xl font-semibold text-slate-700 mt-5 p-3">
              Loading...
            </h1>
          )}
          {!loading &&
            listings.length > 0 &&
            listings.map((listing) => {
              return <ListingItem key={listing._id} listing={listing} />;
            })}
        </div>
        {showMore && (
          <button
            className="text-green-700 hover:underline font-semibold text-center w-full"
            onClick={onShowMoreClick}
          >
            Show More
          </button>
        )}
      </div>
    </div>
  );
}
export default Search;
