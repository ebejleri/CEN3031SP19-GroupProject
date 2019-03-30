const express = require('express');
const router = express.Router();
var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'swamphackscommunityhub@gmail.com',
        pass: 'C0mmun1tyHub'
    }
});

//TODO: add use model
const User = require('../models/UserSchema');

//path to 
router.get('/admin',function(req,res,next){
    
});

// path to login page
router.get('/login', function(req,res,next){

});
 // data: {
 //          name: name,
 //          phone: phone,
 //          email: email,
 //          message: message
 //        },
router.post('/contactUs', function(req,res,next){
        var userConatactName = req.body.name;
        var userConatactPhone = req.body.phone;
        var userConatactEmail = req.body.email;
        var userConatactMessage = req.body.message;
        var mailText = ("Full Name: " + userConatactName + "\n" + "Phone: "+userConatactPhone
        + "\n" + "Email: " + userConatactEmail + "\n" + userConatactMessage);
        var userSubject=("New Request From: " + userConatactEmail);
        var mailOptions = {
    from: 'swamphackscommunityhub@gmail.com',
    to: 'swamphackscommunityhub@gmail.com',
    subject: userSubject,
    text: mailText
};
    transporter.sendMail(mailOptions, function(error, info){
        console.log(error);
        if(error)
        res.json({err:true, msg:"Send Failed"});
    else
        res.json({err:false, msg:"success"});

    });
    // res.json({err:false, msg:"success"});

});

router.get('/getaccount', function (req,res,next) {
        if (req.body.hash !== getHash(req.body.id)) {
            // err, not authenticated
        }
        // req.body.id
        
        User.find({'account_id':req.body.id})
        .then(data =>res.json(data));

});


router.post('/createaccount',function(req,res,next){

    
});

router.post('/setaccount',function(req,res,next){
    
    if (req.body.hash !== getHash(req.body.id)) {
        // err, not authenticated
    }

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



module.exports = router;