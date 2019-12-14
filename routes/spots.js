const express = require('express');
const multer = require('multer');
const cloudinary = require('cloudinary');
const cloudinaryStorage = require('multer-storage-cloudinary');

require('dotenv').config();


const router = express.Router();
// save the images in the correct directory
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});
const upload = multer({ dest: './public/images/uploads' });
const Spot = require('../models/spot');
const User = require('../models/user');

router.get('/', (req, res, next) => {
  Spot.find()
    .then((spots) => {
      console.log(spots)
     res.send({result:spots})
    })
    .catch((err) => {
      console.log(err);
    });
});



router.post('/new',(req, res, next) => {
  console.log("IM HEREEEE",req.body)
  const {
    spotName, spotLocation, spotDescription,
  } = req.body;
 
    Spot.create({
      name:spotName,
      location: {
        type: 'Point',
        coordinates: spotLocation.split(','),
      },
      description:spotDescription
    })
      .then((spot) => {
        console.log(spot,"SPOOOOTO")
        spot.save();
        res.status(spot)
      })
      .catch((err) => {
        console.log(err,"ERROOOOOR")
        res.error(err)
      });
});

router.get('/:id', (req, res, next) => {
  const { id } = req.params;
  Spot.findById(id)
    .then((spot) => {
      User.findById(spot.owner)
        .then((user) => {
          res.render('spots/details', { spot, user, token: process.env.MAPBOX });
        });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get('/:id/edit', (req, res, next) => {
  const { id } = req.params;
  Spot.findById(id)
    .then((spot) => {
      res.render('spots/edit', { spot });
    });
});

router.post('/:id/edit', (req, res, next) => {
  const { id } = req.params;
  const { name, description } = req.body;
  console.log(name, description);
  Spot.findByIdAndUpdate({ _id: id }, { name, description })
    .then(() => {
      res.redirect(`/spots/${id}`);
    })
    .catch(next);
});

router.post('/:id/delete', (req, res, next) => {
  const { id } = req.params;
  Spot.findByIdAndDelete(id)
    .then(() => {
      res.redirect('/spots');
    })
    .catch(next);
});

module.exports = router;
