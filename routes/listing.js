const express = require("express");
const router = express.Router();
const wrapAsync = require("../utility/wrapAsync.js");
const Listing = require("../models/listing.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const { populate } = require("../models/review.js");
const listingController = require("../controllers/listings.js");
const multer = require("multer");
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });

router
  .route("/")
  .get(wrapAsync(listingController.index))
  .post(
    isLoggedIn,
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(listingController.createListing)
  );

//Edit Route
router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  wrapAsync(listingController.renderEditForm)
);

//New Route
router.get("/new", isLoggedIn, listingController.renderNewForm);

router
  .route("/:id")
  .get(wrapAsync(listingController.showListing))
  .put(
    isOwner,
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(listingController.updateListing)
  )
  .delete(isLoggedIn, isOwner, wrapAsync(listingController.destroyListing));

// //Index Route
// router.get("/", wrapAsync(listingController.index));

// //Update Route
// router.put(
//   "/:id",
//   isOwner,
//   validateListing,
//   wrapAsync(listingController.updateListing)
// );

// //Delete Route
// router.delete(
//   "/:id",
//   isLoggedIn,
//   isOwner,
//   wrapAsync(listingController.destroyListing)
// );

// //Create Route
// router.post("/", validateListing, wrapAsync(listingController.createListing));

// //Show Route
// router.get("/:id", wrapAsync(listingController.showListing));

module.exports = router;
