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


var hashCode = function(s){
	return s.split("").reduce(function(a,b){a=((a<<5)-a)+b.charCodeAt(0);return a&a},0);              
}

const sendAppointment = (date, time, email) =>{
    var userSubject = "Appointment Request"
    var mailText = "Appointment request from " +email + " on " + date + " at " + time;
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
};
//hash
var confirmHash = function (email,hash,then){

    User.findOne({'email' :String(email) } , function(err, account){
        then(err || !!account && hash!=account.hash, account);

    });
};

//path to 
router.get('/admin',function(req,res){
    
});

router.post('/appointment',function(req,res){
    sendAppointment(req.body.date, req.body.time, req.body.email);
    
});
// path to login page
router.get('/login', function(req,res){

});
 // data: {
 //          name: name,
 //          phone: phone,
 //          email: email,
 //          message: message
 //        },
let singleSend = true;
router.post('/contactUs', function(req,res){
        var userConatactName = req.body.name;
        var userConatactPhone = req.body.phone;
        var userConatactEmail = req.body.email;
        var userConatactMessage = req.body.message;
        var eventType = req.body.eventType;
        var mailText = ("Full Name: " + userConatactName + "\n" + "Phone: "+userConatactPhone
        + "\n" + "Email: " + userConatactEmail + "\nEvent Type: "+eventType+ "\n" + userConatactMessage);
        var userSubject=("New Request From: " + userConatactEmail);
        var mailOptions = {
    from: 'swamphackscommunityhub@gmail.com',
    to: 'swamphackscommunityhub@gmail.com',
    subject: userSubject,
    text: mailText
};
    if(singleSend)
    transporter.sendMail(mailOptions, function(error, info){
        console.log(error);
        if(error)
        res.json({err:true, msg:"Send Failed"});
    else
        res.json({err:false, msg:"success"});

    });
    singleSend = !singleSend;
    // res.json({err:false, msg:"success"});

});

router.get('/getaccount', function (req,res) {
        confirmHash(req.body.email, req.body.hash, (err, account) => {
            if (err) {
                res.json({err: true, msg: err})
                return;
            }
            User.find({'email':req.body.email})
            .then(data =>res.json(data))
            .err((err) => {
                res.json({err: true, msg: err});
                return;
            });
        });

});


const passLen = 8;
const getPass = () => {
	let pass = "";
	while (pass.length < passLen) {
		const alpha = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
		pass += alpha.charAt(Math.random() * alpha.length);
	}
	return pass;
}

router.post('/createaccount',function(req,res){
    confirmHash(req.body.email, req.body.hash, (err, account) => {
        if (err) {
            res.json({err: true, msg: err})
            return;
        }
        if (!account.is_admin) {
            res.json({err: true, msg: "Not admin user!"});
            return;
        }
        
		const user_email = req.body.email;
		const password = getPass();
		const hash = hashCode(password);
        const first_name = req.body.firstName;
        const last_name = req.body.lastName;

        const newAccount = new User();
        newAccount.first_name = first_name;
        newAccount.last_name = last_name;
        newAccount.account_id = getId();
        newAccount.email = user_email;
        newAccount.hash = hash;
        newAccount.save(function(error){

        });
        //TODO:
          var subjectAccount = "An Account has been Made for You in Essence Events!"
          var mailText = "Hello! Your account has been created for Essence Events (https://cen3031sp19essenceevents.herokuapp.com/)!\n "+"Username: "+user_email +"\n Password: "+ password;
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

router.post('/setaccount',function(req,res){
    
    confirmHash(req.body.email, req.body.hash, (err, account) => {
        if (err) {
            res.json({err: true, msg: err})
            return;
        }
        const AccountInformation = req.body.account;
        User.findOneAndUpdate( {'email':req.body.email},{
            first_name      : AccountInformation.first_name,
            last_name       : AccountInformation.last_name,
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