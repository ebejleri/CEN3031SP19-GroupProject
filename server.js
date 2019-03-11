const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const axios = require('axios');
const { GoogleToken } = require('gtoken');
const gtoken = new GoogleToken({
	key: process.env.SERVICE_KEY,
	email: process.env.SERVICE_EMAIL,
	keyFile: 'hackathon-predictor-d83addc7234d.json',
	scope: ['https://www.googleapis.com/auth/cloud-platform']
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


let port = process.env.PORT || 5000;

app.use(express.static(path.join(__dirname, "client", "build")))

app.post('/api', async(req,res) => {
	// parse req.body and do the apropriate backend things
	// for example req.body.type == 'login' then do login things
})

app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

console.log("Server started on port " + port);

app.listen(port);