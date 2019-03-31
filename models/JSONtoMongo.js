'use strict';
/*
  Import modules/files you may need to correctly run the script.
  Make sure to save your DB's uri in the config file, then import it with a require statement!
 */
 //Variable declarations
var fs = require('fs'),
    mongoose = require('mongoose'),
    Account = require('./UserSchema.js'),
    config = require('./config'),
    test_DB = require('./test_DB.json');

/* Connect to your database */
    mongoose.connect(config.db.uri, function (err, db)
    {
      if (err) throw err;
    });
/*
  Instantiate a mongoose model for each listing object in the JSON file,
  and then save it to your Mongo database
 */

//Iterate through array of entries in "users" under test_DB
 for (var i = 0; i < test_DB.accounts.length; i++)
 {
   //Store document at entries[i] as a Listing schema for MongoDB.
   var entry = Account(test_DB.accounts.entries[i]);

   //Save "entry" in database
   entry.save(function(err)
    {
      if (err) throw err;
    });
 };

/*
  Once you've written + run the script, check out your MongoLab database to ensure that
  it saved everything correctly.
 */
