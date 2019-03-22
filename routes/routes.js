const express = require('express');
const router = express.Router();

//TODO: add use model
const SomeSchema = require('../models/path_to_Schema');

//path to 
router.get('/admin',function(req,res,next){
    
});

// path to login page
router.get('/login', function(req,res,next){

});

router.get('/account/:id', function (req,res,next) {

});

module.exports = router;