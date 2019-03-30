const express = require('express');
const router = express.Router();

//TODO: add use model
const User = require('../models/UserSchema');



//hash
var confirmHash = function (id,hash,then){

    User.findOne({'account_id' :String(id) } , function(err, account){
        then(err || !!account && hash!=account.hash, account);

    });
};

//path to 
router.get('/admin',function(req,res,next){
    
});

// path to login page
router.get('/login', function(req,res,next){

});

router.get('/getaccount', function (req,res,next) {
        confirmHash(req.body.id, req.body.hash, (err, account) => {
            User.find({'account_id':req.body.id})
            .then(data =>res.json(data))
            .err((err) => {
                throw err;
            });
        });

});


router.post('/createaccount',function(req,res,next){

    
});

router.post('/setaccount',function(req,res,next){
    
    confirmHash(res.body.id, res.body.hash, (err, account) => {
        const newAccountInformation = req.body.account;
        User.findOneAndUpdate( {'account_id':req.body.id},{
            first_name      : newAccountInformation.first_name,
            last_name       : newAccountInformation.last_name,
            account_id      : newAccountInformation.account_id,
            //user_name     : newAccountInformation.user_name,
            //password      : newAccountInformation.password,
            email           : newAccountInformation.email,
            //phone_number  : newAccountInformation.phone_number,
            is_admin         : newAccountInformation.is_admin,
            hash            : newAccountInformation.hash,
            todo            : newAccountInformation.todo,
            pending_payment : newAccountInformation.pending_payment,
    
        },function(err , account){
            if(err){
                throw err;
            }
        });
    });

    

});



module.exports = router;