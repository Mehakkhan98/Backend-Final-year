const mongoose = require('mongoose');
const Schema = mongoose.Schema;
///////////////////////////////////////////////////////////////////////////////////////////////////////
let Teacher= new Schema({
    Teacher_Name: {
        type: String,
        default: 'Not Define'
    },   
    User_Name:{
      type:String,
     default:'Not Define'
    }   , 
    Teacher_Gender: {
        type: String,
        default: 'Not Define'
       
    }   ,
    Teacher_Comment: {
         type: [],
        
    },
    Teacher_Phone: {
        type: String,
       default: 'Not Define'
    },
    Teacher_FriendList: {
        type: [],
       default:[]
    },
    Teacher_Fee_Range: {
        type: String,
        default: 'Not Define'
       
    }   ,
    Teacher_Picture:{
        type: String,
       default: 'Not Define'
    },
    Teacher_Email: {
        type: String,
       default: 'Not Define'
    },
    Teacher_Info: {
        type: String,
       default: 'Not Define'
    },
    Teacher_Notifications:{
       type:JSON
    },
    Teacher_City:{
        type: String,
        default: 'Not Define'
     },
     Teacher_Start_Time:{
        type: String,
        default: 'Not Define'
     },
     Desired_Student:{
        type: String,
        default: 'Not Define'
     },
     Teacher_End_Time:{
        type: String,
        default: 'Not Define'
     },
     Desired_Class:{
        type: String,
        default: 'Not Define'
     },
     Teacher_Likes:{
        type: Number,
        default: 0
     },
     Lat:{
        type: String,
        default: 'Not Define'
    },
    Lang:{
        type: String,
        default: 'Not Define'
    },
     Desired_Subjects:{
        type: String,
        default: 'Not Define'
     },
    Teacher_Password: {
        type: String,
      default: 'Not Define'
    }   ,
    Teacher_Qualification:{
        type:String,
        default: 'Not Define'
    },
    Teacher_Adress:{
        type:String,
       default: 'Not Define'
    },
    Teacher_Experience:{
        type:String,
        default: 'Not Define'
    },
   
    } ,
     {collection: 'teachers'} );
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
     let Teacher_Login= new Schema({
        User_Name: {
            type: String,
           default: 'Not Define'
        },       
        Password: {
            type: String,
            default: 'Not Define'
        },
       
    } ,{collection: 'Teacher_Login'});

    var Todo= mongoose.model('Teacher', Teacher);
    var Login_Teacher=mongoose.model('Teacher_Login',Teacher_Login);
    module.exports = (Login_Teacher,Todo);