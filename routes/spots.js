const express = require("express");
const multer = require("multer");
const cloudinary = require("cloudinary");
const cloudinaryStorage = require("multer-storage-cloudinary");

require("dotenv").config();

const router = express.Router();
// save the images in the correct directory
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});
const upload = multer({ dest: "./public/images/uploads" });
const Spot = require("../models/spot");
const User = require("../models/user");

router.get("/", (req, res, next) => {
  Spot.find()
    .then((spots) => {
      res.render("spots/show", {
        spots,
        token: process.env.MAPBOX,
        currentLocation: 1,
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/new", (req, res, next) => {
  res.render("spots/new");
  console.log(req.session.currentUser._id);
});

router.post("/new", upload.single("image"), (req, res, next) => {
  const { name, location, city, description } = req.body;
  console.log("NAME OF THE CITYYYYYYYY IS", req.body);
  const owner = req.session.currentUser._id;
  console.log("USER: ", req.session);
  const image = req.file;
  const imagePathRaw = image.path;
  const locationArray = location.split(",");
  console.log("LOCATION ARRAY: ", locationArray)
  cloudinary.v2.uploader.upload(image.path, (error, result) => {
    Spot.create({
      owner,
      name,
      location: {
        type: "Point",
        coordinates: locationArray,
      },
      city,
      description,
      image: result.secure_url,
    })
      .then((spot) => {
        spot.save();
        res.redirect("/spots");
      })
      .catch((err) => {
        console.log(err);
      });
  });
});

router.get("/:id", (req, res, next) => {
  const { id } = req.params;
  Spot.findById(id)
    .then((spot) => {
      User.findById(spot.owner).then((user) => {
        console.log("THIS IS THE USER: ", spot, "USER: ", user);
        res.render("spots/details", { spot, user, token: process.env.MAPBOX });
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/:id/edit", (req, res, next) => {
  const { id } = req.params;
  Spot.findById(id).then((spot) => {
    res.render("spots/edit", { spot });
  });
});

router.post("/:id/edit", (req, res, next) => {
  const { id } = req.params;
  const { name, description } = req.body;
  console.log(name, description);
  Spot.findByIdAndUpdate({ _id: id }, { name, description })
    .then(() => {
      res.redirect(`/spots/${id}`);
    })
    .catch(next);
});

router.post("/:id/delete", (req, res, next) => {
  const { id } = req.params;
  Spot.findByIdAndDelete(id)
    .then(() => {
      res.redirect("/spots");
    })
    .catch(next);
});

module.exports = router;
