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
          var subjectAccount = "An Account has been Made for You in Essence Events!"
          var mailOptions = {
            from: 'swamphackscommunityhub@gmail.com',
            to: email,
            subject: subjectAccount,
            text: mailText
        };
            transporter.sendMail(mailOptions, function(error, info){
                console.log(error);
                if(error)
                res.json({err:true, msg:"Send Failed"});
            else
                res.json({err:false, msg:"success"});

            });
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