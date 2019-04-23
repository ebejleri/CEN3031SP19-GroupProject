const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const axios = require('axios');
const accounts = require('./routes/routes.js');
const mongoose = require('mongoose');
const config = require('./config/config.js');

mongoose.connect(config.db.uri, {useNewUrlParser: true});
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/account',accounts);

var request = require('request');
// Add your credentials:
// Add your client ID and secret
var CLIENT =
  '';
var SECRET =
  '';
var PAYPAL_API = 'https://api.sandbox.paypal.com';

app
  // Set up the payment:
  // 1. Set up a URL to handle requests from the PayPal button
  .post('/my-api/create-payment/', function(req, res)
  {
    // 2. Call /v1/payments/payment to set up the payment
    request.post(PAYPAL_API + '/v1/payments/payment',
    {
      auth:
      {
        user: CLIENT,
        pass: SECRET
      },
      body:
      {
        intent: 'sale',
        payer:
        {
          payment_method: 'paypal'
        },
        transactions: [
        {
          amount:
          {
            total: '20.00',
            currency: 'USD'
          }
        }],
        redirect_urls:
        {
          return_url: 'https://www.essenceevents.com',
          cancel_url: 'https://www.essenceevents.com'
        }
      },
      json: true
    }, function(err, response)
    {
      if (err)
      {
        console.error(err);
        return res.sendStatus(500);
      }
      // 3. Return the payment ID to the client
      res.json(
      {
        id: response.body.id
      });
    });
  })
  // Execute the payment:
  // 1. Set up a URL to handle requests from the PayPal button.
  .post('/my-api/execute-payment/', function(req, res)
  {
    // 2. Get the payment ID and the payer ID from the request body.
    var paymentID = req.body.paymentID;
    var payerID = req.body.payerID;
    // 3. Call /v1/payments/payment/PAY-XXX/execute to finalize the payment.
    request.post(PAYPAL_API + '/v1/payments/payment/' + paymentID +
      '/execute',
      {
        auth:
        {
          user: CLIENT,
          pass: SECRET
        },
        body:
        {
          payer_id: payerID,
          transactions: [
          {
            amount:
            {
            	//Pay amount
              total: '20.00',
              currency: 'USD'
            }
          }]
        },
        json: true
      },
      function(err, response)
      {
        if (err)
        {
          console.error(err);
          return res.sendStatus(500);
        }
        // 4. Return a success response to the client
        res.json(
        {
          status: 'success'
        });
      });
    // next();
  });
// Run `node ./server.js` in your terminal
let port = process.env.PORT || 5000;

// req = {url: params: body: }

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