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
  account_id: {type: String, required: true},
  isAdmin: {type: Boolean, required: true},
  todo_list: [
    todo_item: {type: String, required: true}]
});

/* create a 'pre' function that adds the updated_at (and created_at if not already there) property */
// account.pre('save', function(next)
// {
//   /* your code here */
//   var now = new Date();
//   this.updated_at = now;
//   if (!this.created_at)
//   {
//     this.created_at = now;
//   }
//   next();
// });

/* Use your schema to instantiate a Mongoose model */
var Account = mongoose.model('Account', account);

/* Export the model to make it avaiable to other parts of your Node application */
module.exports = Account;
