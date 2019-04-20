const express = require('express');
const router = express.Router();
const crypto = require('crypto');
var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'swamphackscommunityhub@gmail.com',
        pass: 'ohHaiHoo25'
    }
});

//TODO: add use model
const User = require('../models/UserSchema');


var hashCode = function(s){
	return ""+(s.split("").reduce(function(a,b){a=((a<<5)-a)+b.charCodeAt(0);return a&a},0));              
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
	// console.log("finding account");
    User.findOne({email: email} , function(err, account){
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

router.get('/getaccount', (req,res) => {
  if (!req.query.user_email) {
    console.log("NON CONFORM: " +req.query.not_conform );
    req.query.user_email = req.query.not_conform?"-1":req.query.email;
    console.log(req.query.user_email);
  }
  console.log("getting account");
  confirmHash(req.query.email, req.query.hash, (err, account) => {
    if (err || !account || !account.is_admin && req.query.user_email != req.query.email) {
      console.log ("error");
      res.json({err: true, msg: err})
      return;
    }
    User.findOne({email:req.query.user_email}, (err, account) => {
      // console.log("Now sending account: ");
      // console.log(account);
      console.log(account);
      if (!account) {
        res.json({err: true, msg: "Account not found!"})
      }
      else {
        res.json({err:false, account: account});
      }
    });
  });
});

router.post('/deleteaccount',function(req,res){
  console.log("deleting account");
  confirmHash(req.body.email, req.body.hash, (err, account) => {
      if (err  || !account.is_admin && req.body.account.email != req.body.email) {
          res.json({err: true, msg: err})
          return;
      }
      console.log(req.body.userEmail);
      User.findOneAndDelete( {'email':req.body.userEmail},
        function(err , account){
          if(!account)
              res.json({ msg: "Account not found!"});
          else
            res.json({ msg: "Account successfully deleted!" });
        }
      );
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
        
        const user_email = req.body.userEmail;
        // console.log(user_email + " is the user_email");
        const password = getPass();
        const hash = hashCode(password);
        const first_name = req.body.firstName;
        const last_name = req.body.lastName;

        const newAccount = new User();
        newAccount.first_name = first_name;
        newAccount.last_name = last_name;
        newAccount.email = user_email;
        newAccount.hash = hash;
        newAccount.is_admin = false;
        newAccount.pending_payment = true;
        newAccount.save(function(error){
			// console.log("Error saving account " + user_email);
			// console.log(error);
        });
        //TODO:
          var subjectAccount = "An Account has been Made for You in Essence Events!"
          var mailText = "Hello " + first_name + "! Your account has been created for Essence Events (https://cen3031sp19essenceevents.herokuapp.com/)!\n "+"Username: "+user_email +"\n Password: "+ password;
          var mailOptions = {
            from: 'swamphackscommunityhub@gmail.com',
            to: user_email,
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
	});
});

router.post('/setaccount',function(req,res){
    console.log("setting account");
    confirmHash(req.body.email, req.body.hash, (err, account) => {
      console.log(account);
      req.body.account = JSON.parse(req.body.account);
      if (err  || !account.is_admin && req.body.account.email != req.body.email) {
          res.json({err: true, msg: err})
          return;
      }
      const AccountInformation = req.body.account;
      User.findOneAndUpdate( {'email':req.body.account.email},{
          ...AccountInformation
        },function(err , account){
          if(!account){
            res.json({err: true, msg: "Account not found!"});
          }
          else {
            res.json({err: false, msg: "Account updated!"});
          }
      });
    });
});

router.post('/setaccountemail',function(req,res){
  console.log("setting account email");
  confirmHash(req.body.email, req.body.hash, (err, account) => {
      if (err  || !account.is_admin && req.body.account.email != req.body.oldEmail) {
          res.json({err: true, msg: err})
          return;
      }
      console.log(req.body.oldEmail);
      console.log(req.body.userEmail);
      User.findOneAndUpdate( {'email':req.body.oldEmail},{
        email: req.body.userEmail,
      },{},function(err , account){
          if(!account)
              res.json({msg: "Could not find account to update!"});
          else
            res.json({msg: "Account successfully updated!" });

      });
  });

  

});


router.post('/update_usertodo',function(req, res){
    
    // confirm the user is an admin
    confirmHash(req.body.email, req.body.hash, (err, account) => {
        if (err) {
            res.json({err: true, msg: err})
            return;
        }
        if (!account.is_admin) {
            res.json({err: true, msg: "Not admin user!"});
            return;
        }
        
        // find the other user by email
        User.findOne({'email':req.body.userEmail}, function(err, account){

            if(err){
                res.json({err: true, msg: err});
                return;
            }
            
            if(!account){
                res.json({err: true, msg:"User does not exist"});
                return;
            }
            // modify the todo for the user account and save
            let todolist = JSON(account.todo);
            todolist.push(req.body.todo);
            const todo_str = JSON.stringify(todolist);

            account.todo = todo_str;
            account.save(function(err){
                if(err){
                    res.json({err: true, msg: err});
                    return;
                } 
            });
        });

    });
});

router.post('/forgot',function(req,res){

    User.findOne({'email':req.body.account.email}, function(err,account){
        let token="";
        let exprDate="";
        if(err){
            res.json({err: true, msg: err});
            return;
        }
        //if the email provide is not in the database
        if(!account){
            res.json({err: true, msg: "Email could not be verified"});
            return;
        }
        const buf = Buffer.alloc(20);
        crypto.randomFill(buf, function(err,buf){

            if(err){
                res.json({err: true, msg: err});
                return;
            }
            token = buf.toString();
            exprDate = Date.now() + (3600000 *24);
            account.reset_password_token  = token;
            account.reset_date = exprDate; //one day to update password

            account.save(function(err){

                if(err){
                    res.json({err: true, msg: err});
                    return;
                } 
            });
        
        });

        const emailSubject = "[Essence Events] Password Reset";
        const accountEmail = account.email;
        const resetLink    = req.headers.host+"/reset/"+token;
        const message = `Hello,\nYou are recieving this email, because you have requested a password reset\n
                        Click on the following link to reset your password :${resetLink}\n\nThank you`;

        let mailOptions ={
            to: accountEmail,
            from:  "swamphackscommunityhub@gmail.com",
            subject: emailSubject,
            text : message
        };

        transporter.sendMail(mailOptions,function(err,info){

            console.log(err);
            if(err)
            res.json({err:true, msg:"Send Failed"});
            else
            res.json({err:false, msg:"success"});


        })
    });

});

router.get('/reset/:token',function(req,res){

    User.find({'reset_password_token': req.body.token,'reset_date':{$gt : Date.now()} },function(err,account){

        if(err){
            res.json({err: true, msg: err});
            return;
        }
        //if the email provide is not in the database
        if(!account){
            res.json({err: true, msg: "Account not found"});
            return;
        }

        account.hash = hashCode(getPass());
        account.reset_date = undefined;
        account.reset_password_token = undefined,

        account.save(function(err){
        if(err){
            res.json({err: true, msg: err});
            return;
        }
        });

        
        const emailSubject = "[Essence Events] Password Reset Successful!!!";
        const accountEmail = account.email;
        const message = "Hello,\nYour password reset was sucessful\n\n";

        let mailOptions ={
            to: accountEmail,
            from:  "swamphackscommunityhub@gmail.com",
            subject: emailSubject,
            text : message
        };

        transporter.sendMail(mailOptions,function(err,info){

            console.log(err);
            if(err)
            res.json({err:true, msg:"Send Failed"});
            else
            res.json({err:false, msg:"success"});
        });
});

});



module.exports = router;