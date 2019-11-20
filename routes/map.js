'use strict';

const fs = require('fs');
const express = require('express');
const router = express.Router();
const multer = require('multer')
const upload = multer();
const spots = require(__dirname + '/spots.json')




router.get('/', (req, res, next) => {
    res.render('index', {spots:JSON.stringify(spots)})
});

router.get('/addSpot',(req,res,next)=>{
    res.render('addSpot')
})
router.post('/addSpot',upload.none(),(req,res,next)=>{
    //coordinates:[longitud,latitud]
   let spotObject = {
        "type": "Feature",
        "properties": {
            "title": req.body.title,
            "description":req.body.description
        },
        "geometry": {
            "type": "Point",
            "coordinates": [
                2.166849374771118,
                41.38321659916387
            ]
        }
    }
    console.log(req.file)
    // spots.push(req.body)
   
    // fs.writeFile( __dirname+"/spots.json",JSON.stringify(spots), (err) => {
    //     if (err) throw err;
        
    // });
    // res.render('index',{spots:JSON.stringify(spots)})
    
})

module.exports = router;