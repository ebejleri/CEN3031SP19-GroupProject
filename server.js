const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const axios = require('axios');
const accounts = require('./routes');

app.use('/account',accounts);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


let port = process.env.PORT || 5000;

app.post('/api', async(req,res) => {
	// parse req.body and do the apropriate backend things
	// for example req.body.type == 'login' then do login things
});

// app.use((req, res, next) => {
// 	const test = /\?[^]*\//.test(req.url);
// 	if (req.url.substr(-1) === '/' && req.url.length > 1 && !test)
// 		res.redirect(301, req.url.slice(0, -1));
// 	else
// 		next();
// });
app.use(express.static(path.join(__dirname, "client", "static")));

console.log("Server started on port " + port);

app.listen(port);