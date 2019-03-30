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
            if (err) {
                res.json({err: true, msg: err})
                return;
            }
            User.find({'account_id':req.body.id})
            .then(data =>res.json(data))
            .err((err) => {
                res.json({err: true, msg: err});
                return;
            });
        });

});


router.post('/createaccount',function(req,res,next){
    confirmHash(req.body.id, req.body.hash, (err, account) => {
        if (err) {
            res.json({err: true, msg: err})
            return;
        }
        if (!account.is_admin) {
            res.json({err: true, msg: "Not admin user!"});
            return;
        }
        const user_email = req.body.email;
        //TODO:
        
        // req.body.username
        
    });
    
});

router.post('/setaccount',function(req,res,next){
    
    confirmHash(req.body.id, req.body.hash, (err, account) => {
        if (err) {
            res.json({err: true, msg: err})
            return;
        }
        const AccountInformation = req.body.account;
        User.findOneAndUpdate( {'account_id':req.body.id},{
            first_name      : AccountInformation.first_name,
            last_name       : AccountInformation.last_name,
            account_id      : AccountInformation.account_id,
            //user_name     : AccountInformation.user_name,
            //password      : AccountInformation.password,
            email           : AccountInformation.email,
            //phone_number  : AccountInformation.phone_number,
            is_admin        : AccountInformation.is_admin,
            hash            : AccountInformation.hash,
            todo            : AccountInformation.todo,
            pending_payment : AccountInformation.pending_payment,
    
        },function(err , account){
            if(err){
                res.json({err: true, msg: err});
                return;
            }
        });
    });

    

});



module.exports = router;