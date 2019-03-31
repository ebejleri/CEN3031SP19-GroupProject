//This file holds any configuration variables we may need
//'config.js' is usually ignored by git to protect sensitive information, such as your database's username and password


module.exports = {
  db: {
    uri: 'mongodb://test:testtest1@ds221416.mlab.com:21416/cen3031sp19-groupproject'
  }
};

/* Now go to the JSONtoMongo.js file and include this file as a variable named 'config' with a require() */
