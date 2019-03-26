'use strict';
/*
  Import modules/files you may need to correctly run the script.
  Make sure to save your DB's uri in the config file, then import it with a require statement!
 */
 //Variable declarations
var fs = require('fs'),
    mongoose = require('mongoose'),
    Listing = require('./ListingSchema.js'),
    config = require('./config'),
    listings = require('./listings.json');

/* Connect to your database */
    mongoose.connect(config.db.uri, function (err, db)
    {
      if (err) throw err;
    });
/*
  Instantiate a mongoose model for each listing object in the JSON file,
  and then save it to your Mongo database
 */

//Iterate through array of entries in "listings"
 for (var i = 0; i < listings.entries.length; i++)
 {
   //Store document at entries[i] as a Listing schema for MongoDB.
   var entry = Listing(listings.entries[i]);

   //Save "entry" in database
   entry.save(function(err, listing)
    {
      if (err) throw err;
    });
 };

/*
  Once you've written + run the script, check out your MongoLab database to ensure that
  it saved everything correctly.
 */
