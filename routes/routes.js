const express = require('express');
const router = express.Router();

//TODO: add use model
const User = require('../models/UserSchema');

//path to 
router.get('/admin',function(req,res,next){
    
});

// path to login page
router.get('/login', function(req,res,next){

});

router.get('/account', function (req,res,next) {
        if (req.body.hash !== getHash(req.body.id)) {
            // err, not authenticated
        }
        // req.body.id
        
        User.find({'account_id':req.params.account_id})
        .then(data =>res.json(data));

});

module.exports = router;