const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const axios = require('axios');

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