const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/////////////////////////////////////////////////////////////////////////////////////////////////////////////
let Student= new Schema({
    Student_Name: {
        type: String,
         default: 'Not Define'
    },       
    User_Name:{
        type:String,
        default:'Not Define'
      }   , 
    Student_Phone: {
        type: String,
         default: 'Not Define'
    },
    Student_Picture:{
        type: String,
        default: 'Not Define'
    },
    Student_Email: {
        type: String,
        default: 'Not Define'
    },
    Student_Password: {
        type: String,
       default: 'Not Define'
       
    }   ,
    Student_Info: {
        type: String,
        default: 'Not Define'
       
    }   ,
    Student_Fee_Range: {
        type: String,
        default: 'Not Define'
       
    }   ,
    Student_Gender: {
        type: String,
        default: 'Not Define'
       
    }   ,
    Student_Nature:{
        type: String,
        default: 'Not Define'
    },
    Tuttion_Start_Time:{
        type: String,
        default: 'Not Define'
    },
    Tuttion_End_Time:{
        type: String,
        default: 'Not Define'
    },
    Student_Subjects:{
        type: String,
        default: 'Not Define'
       
    },
    Student_City:{
        type: String,
        default: 'Not Define'
    },
    Student_Class:{
        type:String,
       default: 'Not Define',
      
    },
    Student_Adress:{
        type:String,
        default: 'Not Define'
    },
    Student_Notifications:{
        type:[]
     },
    Student_Lastgrades:{
        type:String,
       default: 'Not Define'
    }, 
    
    } ,{collection: 'Student'}  );
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    let Student_Login=new Schema({
        User_Name:{
            type: String,
            default: 'Not Define'
        },
        Password:{
            type: String,
           default: 'Not Define'
        }
    },{collection:'Student_Login'});

    
     var Students=mongoose.model('Student',Student);
     var Login_Student=mongoose.model('Student_Login',Student_Login);
   
module.exports = (Students,Login_Student);
