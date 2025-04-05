const express = require("express");
const ListingRouter = express.Router();
const listingSchema = require("./../Schemas/ListingSchema");

ListingRouter.post("/create", async (req, res) => {
  try {
    const listing = await listingSchema.create(req.body);
    return res.status(201).send({
      data: listing,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error creating listing",
    });
  }
});

const getListing = async (req, res) => {
  try {
    const limit = parseInt(req.params.limit) || 5;
    const startIndex = parseInt(req.params.startIndex) || 0;
    const listing = await listingSchema
      .find({ userRef: req.params.id })
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(startIndex);
    if (!listing) {
      return res
        .status(404)
        .json({ error: "Not Found", message: "Unable to find" });
    }
    res.status(200).json({ success: true, listing });
  } catch (error) {
    return res.status(500).json({
      message: "Interenal server error",
    });
  }
};
const updateListing = async (req, res) => {
  try {
    const listing = await listingSchema.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
    );
    return res.status(201).json({
      data: listing,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

const deleteListing = async (req, res) => {
  try {
    const listing = await listingSchema.findByIdAndDelete(req.params.id);
    return res.status(201).json({
      data: listing,
      message: "Deleted Successfully",
    });
  } catch (error) {
    return res.status(500).res({
      message: "Internal Server Error",
    });
  }
};

const getAllFilteredListings = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 8;
    const startIndex = parseInt(req.query.startIndex) || 0;
    let offer = req.query.offer;
    if (offer === undefined || offer === "false") {
      offer = { $in: [false, true] };
    }

    let furnished = req.query.furnished;
    if (furnished === undefined || furnished === "false") {
      furnished = { $in: [false, true] };
    }

    let parking = req.query.parking;
    if (parking === undefined || parking === "false") {
      parking = { $in: [false, true] };
    }

    let type = req.query.type;
    if (type == "all" || type === undefined || type === "false") {
      type = { $in: ["rent", "sale"] };
    }

    let searchTerm = req.query.searchTerm || "";
    let sort = req.query.sort === "createdAt" ? "createdAt" : "created_at";
    let order = req.query.order || "desc";
    let price = req.query.price || "";
    let searchedLists = await listingSchema
      .find({
        name: { $regex: searchTerm, $options: "i" },
        offer,
        furnished,
        parking,
        type,
      })
      .sort({
        [sort]: order,
      })
      .limit(limit)
      .skip(startIndex);
    return res.status(200).json(searchedLists);
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
ListingRouter.get("/get/:id/:startIndex", getListing);
ListingRouter.post("/update/:id", updateListing);
ListingRouter.post("/delete/:id", deleteListing);
ListingRouter.get("/get", getAllFilteredListings);
module.exports = ListingRouter;
