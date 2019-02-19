
const express = require('express');
const app = express();
const path = require('path');
const router = express.Router();
var mongoose = require('mongoose');
var mongodb = require('mongoose');
var bodyParser = require('body-parser');

//DATABASE SETUP BEGINS
app.use(express.static(path.join(__dirname, 'views')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
var db = mongoose.connect('mongodb://user:password1@ds161144.mlab.com:61144/communityhub');
var nameSchema = new mongoose.Schema({
  fullName: String,
  age: String,
  message: String,
  needDescription: String,
  category: String,
  needDescription: String,

});
var peopleWithNeed = mongoose.model('peopleWithNeed', nameSchema);
//DATABASE SETUP ENDS

//app.use(express.static("public"));
app.set('views', './views');
app.set('view engine', 'ejs');

var mailText;
var charityChosen  = "John Doe"; //This will be used to keep track of who you're going to donate to


var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		user: 'swamphackscommunityhub@gmail.com',
		pass: 'C0mmun1tyHub'
	}
});


app.get('/', function (req, res) {
console.log('in serve');

  var arrayPeople = [];
  peopleWithNeed.find({},function( err, documents){
    if(err) throw err;    	
		arrayPeople = documents;
    return res.render('index', {arrayPeople: arrayPeople});
   });
})

app.get('/JillRoberts', function(req, res){
    res.sendFile(path.join(__dirname+'/views/charity1.html'));
    charityChosen = "Jill Roberts";
});


app.listen(3000, function () {
  console.log('Server started on port 3000!');
})





app.get('/donate', function(req, res){
    console.log()
    var amount = req.query.amount;//swamphackscommunityhub@gmail.com
    var firstName = req.query.firstname;//C0mmun1tyHub
    var lastName = req.query.lastname;
    var accountNumber = req.query.accountNumber;
    var CVV = req.query.cvv;
    var billingAdress = req.query.addy;
    console.log('amount = ', amount);
})

app.get('/donateT', function(req, res){
    console.log()
    mailText = req.query.myTextBox;
    console.log('amount = ', mailText);
    var mailOptions = {
	from: 'swamphackscommunityhub@gmail.com',
	to: 'swamphackscommunityhub@gmail.com',
	subject: 'New Question/Donation',
	text: mailText
};

    transporter.sendMail(mailOptions, function(error, info){});
})
    //transporter.sendMail(mailOptions, function(error, info){});

app.use('/', router); 


app.post('/post-feedback', function(req,res){

	 var mySchema = new peopleWithNeed({fullName: req.body.fullName, age: req.body.age,
    message: req.body.message, needDescription: req.body.needDescription});
  	mySchema.save(function(err){
  		if (err) throw err;
  		else{
		// res.send('Data received:\n' + JSON.stringify(req.body));
    return res.redirect('/')
	}
  	})
});



