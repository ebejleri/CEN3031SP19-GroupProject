/* Import mongoose and define any variables needed to create the schema */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/* Create your schema */
var account = new Schema
({
  username: {type: String, required: true},
  password: {type: String, required: true},
  first_name: {type: String, required: true},
  last_name: {type: String},
  phone_number: {type: String},
  email: {type: String},
  account_id": {type: String, required: true},
  isAdmin: {type: Boolean, required: true},
  todo_id: {type: String},
  calendar_id: {type: String}
});

var client_event = new Schema
({
  name: {type: String, required: true},
  event_type: {password: String, required: true},
  event_id: {type: String, required: true},
  date: {type: Date},
  budget: {type: Float}
});

var vendor = new Schema
({
  name: {type: String, required: true},
  vendor_type: {password: String, required: true},
  vendor_id: {type: String, required: true},
  address: {type: String},
  budget: {type: Float},
  description: {type: String}
});

var todoList = new Schema
({
  name: {type: String, required: true},
  event_type: {password: String, required: true},
  event_id: {type: String, required: true},
  date: {type: Date},
  budget: {type: Float}
});

/* create a 'pre' function that adds the updated_at (and created_at if not already there) property */
schema.pre('save', function(next)
{
  /* your code here */
  var now = new Date();
  this.updated_at = now;
  if (!this.created_at)
  {
    this.created_at = now;
  }
  next();
});

/* Use your schema to instantiate a Mongoose model */
var Listing = mongoose.model('Listing', listingSchema);

/* Export the model to make it avaiable to other parts of your Node application */
module.exports = Listing;
