const mongoose = require('mongoose');
const Schema = mongoose.Schema;
///////////////////////////////////////////////////////////////////////////////////////////////////////

let Admin_Side=new Schema({
    Name:{
        type: String,
        default: 'Not Define'
    },
    User_Name:{
        type: String,
        default: 'Not Define'
    },
    Email:{
        type: String,
        default: 'Not Define'
    },
    Password:{
        type: String,
       default: 'Not Define'
    }
   
 
},{collection:'Admin_Side'});
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
let Admin_Login=new Schema({
Email:{
    type: String,
    default: 'Not Define'
},
Password:{
    type: String,
   default: 'Not Define'
},
},{collection:'Admin_Login'});

var Admin=mongoose.model('Admin_Side',Admin_Side)
var Login_Admin=mongoose.model('Admin_Login',Admin_Login)
module.exports = (Admin,Login_Admin);
