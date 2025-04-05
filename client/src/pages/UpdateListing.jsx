import React from "react";
import CreateListing from "./CreateListing";
import { useLocation } from "react-router-dom";

function UpdateListing() {
  const location = useLocation();
  const listing = location.state || {};
  return (
    <div>
      <CreateListing from="update" listingDetails={listing} />
    </div>
  );
}

export default UpdateListing;
