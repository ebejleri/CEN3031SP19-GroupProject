require('mongoose')
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

    
    account_id : {
        type : String,
        required: true
    },

    user_name :{
        type : String,
        required : true;
    },

    password :{
        type : String,
        required : true;
    

    email : {
        type : String,
        required: true
    },

    number: {
        type : String,
        required: true
    },

    isAdmin : {
        type : Boolean,
        required: true
    }

});

const Account = mongoose.model('account',accountSchema);

module.exports = Account;