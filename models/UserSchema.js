<<<<<<< HEAD
mongoose = require('mongoose')
=======

const mongoose =require('mongoose');
>>>>>>> master
const Schema = mongoose.Schema;

// user and admin account.
const accountSchema = new Schema({
    first_name : {
        type : String,
        required: true
    },

    last_name : {
        type : String,
        required: true
    },

<<<<<<< HEAD

    account_id : {
        type : String,
        required: true
    },

    //TODO add hash

=======
    
    // account_id : {
    //     type : String,
    //     required: true
    // },
   
    //TODO add hash    
        
>>>>>>> master
    hash :{
        type : String,
        required: true
    },

    todo:{
            type:String,
            required: false
    } ,

    email : {
        type : String,
        required: true
    },

    is_admin : {
        type : Boolean,
        required: true
    },

    pending_payment :{
        type : Boolean,
        required :true
    }

});

const Account = mongoose.model('accounts',accountSchema);

module.exports = Account;
