
const mongoose =require('mongoose');
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

    
    // account_id : {
    //     type : String,
    //     required: true
    // },
   
    //TODO add hash    
        
    hash :{
        type : String,
        required: true
    },

    todo:{
            type:String,
            required: false
    } ,

    site_data: {
      type: String,
      required:false
    },

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
    },

    reset_password_token:{
        type: String
    },

    reset_date:{
        type :Date
    }

});

const Account = mongoose.model('accounts',accountSchema);

module.exports = Account;