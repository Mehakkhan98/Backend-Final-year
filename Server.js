const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const todoRoutes = express.Router();
const PORT = 4000;
require('./Modal/Student_Modal');  
require('./Modal/Admin_MOdal');
require('./Modal/Teacher_Modal');
 const  Todo  =  mongoose.model('Teacher'); /// for Teacher registration
 const Students=mongoose.model('Student');    //// for student Registration
 const Login_Teacher=mongoose.model('Teacher_Login');   /// for teacher login
 const Login_Student=mongoose.model('Student_Login');   /// for student login
 var Admin=mongoose.model('Admin_Side')
 var Login_Admin=mongoose.model('Admin_Login')
app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://127.0.0.1:27017/Online_Tutor_Finding_System', { useNewUrlParser: true });
const connection = mongoose.connection;

connection.once('open', function() {
    console.log("MongoDB database connection established successfully");
})


 ///////////////////////////////////admin side Api/////////////////////////////////////////////////////
 todoRoutes.route('/LoginStudent_By_UserName').post(function(req, res) {
   
    
    User_Name=req.body.User_Name;
    console.log("Student NAME",User_Name)
    Login_Student.find({User_Name:User_Name},function(err,user){

        console.log('user',user);
        if(err)                                                    ///To Search Student By Name
        {
            return res.status(400).send('adding new Student failed');
        }
       else if(!user)
        {
          return res.status(400).send('Invalid User Name or Password!');
        }
        else{
            res.json(user)
        }
    });
});
todoRoutes.route('/LoginTeacher_By_UserName').post(function(req, res) {
   
    
    User_Name=req.body.User_Name;
    console.log("Student NAME",User_Name)
    Login_Teacher.find({User_Name:User_Name},function(err,user){

        console.log('user',user);
        if(err)                                                    ///To Search Student By Name
        {
            return res.status(400).send('adding new Student failed');
        }
       else if(!user)
        {
          return res.status(400).send('Invalid User Name or Password!');
        }
        else{
            res.json(user)
        }
    });
});

 todoRoutes.route('/counttotalstudent').get(function(req,res){
    
     Students.count( {}, function(err, result){
 
         if(err){
             res.send(err)
         }
         else{
             res.json(result)
         }
 
    })
 
 
 })
 todoRoutes.route('/countloginstudent').get(function(req,res){
  
     Login_Student.count( {}, function(err, result){
 
         if(err){
             res.send(err)
         }
         else{
             res.json(result)
         }
 
    })
 
 
 })
 todoRoutes.route('/counttotalteachers').get(function(req,res){
   
     Todo.count( {}, function(err, result){
 
         if(err){
             res.send(err)
         }
         else{
             res.json(result)
         }
 
    })
 
 
 })
 todoRoutes.route('/countloginteacher').get(function(req,res){
   
     Login_Teacher.count( {}, function(err, result){
 
         if(err){
             res.send(err)
         }
         else{
             res.json(result)
         }
 
    })
 
 
 })
 todoRoutes.route('/updateadminemail/').post(function(req, res) {
    User_Name=req.body.User_Name;
    Password=req.body.Password;
   
    Admin.findOne({User_Name:User_Name,Password:Password},function(err,user){
        console.log('user',user);
        if(err)                                                       ////to update student password
        {
            return res.status(400).send('Student Updates fail!');
        }
        if(!user)
        {
          return res.status(400).send('Invalid Student Name');
        }
       if(user)
       {
            
           user.Email = req.body.Email;
            user.save().then(Teacher => {
                     res.json('Student updated!');
                 })
                 .catch(err => {
                     res.status(400).send("Student Update not possible");
                 });
       }
    })
   
});
todoRoutes.route('/updateadminusername/').post(function(req, res) {
    Email=req.body.Email;
    Password=req.body.Password;
    
    Admin.findOne({Email:Email,Password:Password},function(err,user){
        console.log('user',user);
        if(err)                                                       ////to update student password
        {
            return res.status(400).send('Student Updates fail!');
        }
        if(!user)
        {
          return res.status(400).send('Invalid Student Name');
        }
       if(user)
       {
            
           user.User_Name = req.body.User_Name;
            user.save().then(Teacher => {
                     res.json('Student updated!');
                 })
                 .catch(err => {
                     res.status(400).send("Student Update not possible");
                 });
       }
    })
   
});
todoRoutes.route('/updateadminname/').post(function(req, res) {
    Email=req.body.Email;
    Password=req.body.Password;
    
    Admin.findOne({Email:Email,Password:Password},function(err,user){
        console.log('user',user);
        if(err)                                                       ////to update student password
        {
            return res.status(400).send('Student Updates fail!');
        }
        if(!user)
        {
          return res.status(400).send('Invalid Student Name');
        }
       if(user)
       {
            
           user.Name = req.body.Name;
            user.save().then(Teacher => {
                     res.json('Student updated!');
                 })
                 .catch(err => {
                     res.status(400).send("Student Update not possible");
                 });
       }
    })
   
});
 todoRoutes.route('/updateadminpassword/').post(function(req, res) {
    User_Name=req.body.Email;
    Password=req.body.Password;
   
    Admin.findOne({Email:User_Name},function(err,user){
        console.log('user',user);
        if(err)                                                       ////to update student password
        {
            return res.status(400).send('Student Updates fail!');
        }
        if(!user)
        {
          return res.status(400).send('Invalid Student Name');
        }
       if(user)
       {
            
           user.Password = req.body.Password;
            user.save().then(Teacher => {
                     res.json('Student updated!');
                 })
                 .catch(err => {
                     res.status(400).send("Student Update not possible");
                 });
       }
    })
   
});


 ////////////////////////////////////////////////////Register login Admin/////////////////////////////////////////////////
 todoRoutes.route('/Register_New_Admin').post(function(req, res) {
     console.log("Hello i am admin")
    let Admin_Side= new Admin(req.body);                                      /////to register new admin
    Admin_Side.save()
        .then(Admin_Side => {
            res.status(200).json({'Admin': 'admin added successfully'});
        })
        .catch(err => {
            res.status(400).send('adding new admin failed');
        });
});


todoRoutes.route('/Login_Admin').post(function(req, res) {

     
    var User_Name=req.body.Email;
    var Password=req.body.Password;
    console.log("Client:",User_Name,Password); 
    Admin.findOne({Email:User_Name,Password:Password},function(err,user){
        console.log('user',user);
        if(err)
        {
            return res.status(400).send('adding new Student failed');
        }
        if(!user)                                                           ///For login Teacher
        {
       return res.status(400).send('Invalid User Name or Password!');
        }
       if(user)
       {
         let admin = new Login_Admin(req.body);
        admin.save()
            .then(admin => {
                res.status(200).json({'Teacher': 'Teacher login Successfully'});
            })
            .catch(err => {
                res.status(400).send('Teacher login fail');
            });
         
       }
    })
});
todoRoutes.route('/getadmin').post(function(req, res) {
    console.log("Hello World from Search by admin!")
    
    email=req.body.Email;
    Pass=req.body.Password
    Admin.find({Email:email ,Password:Pass},function(err,user){

       console.log("login admin",user)
        if(err)                                                    ///To Search admin By email
        {
            return res.status(400).send('adding new Student failed');
        }
       else if(!user)
        {
          return res.status(400).send('Invalid User Name or Password!');
        }
        else{
            res.json(user)
        }
    });
});


 /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
todoRoutes.route('/').get(function(req, res) {
    Todo.find(function(err, online_tutor_db) {
        if (err) {
            console.log("Hello world",err);                         ///// to get all the registered Teacher
        } else {
            res.json(online_tutor_db);
            
        }
    });
});

todoRoutes.route('/get_Login_Teacher').get(function(req, res) {
    Login_Teacher.find(function(err, online_tutor_db) {
        if (err) {
            console.log("Hello world",err);                         ///// to get all the login Teacher
        } else {
            res.json(online_tutor_db);
            
        }
    });
});



todoRoutes.route('/sdata').get(function(req, res) {
    console.log("its working!");
    Students.find(function(err, online_tutor_db) {
        if (err) {
            console.log(err);                         ///// to get all the registered students
        } else {
            res.json(online_tutor_db);
            
        }
    });
});
todoRoutes.route('/getall_Login-Student').get(function(req, res) {
    console.log("its working!");
    Login_Student.find(function(err, online_tutor_db) {
        if (err) {
            console.log(err);                         ///// to get all the registered students
        } else {
            res.json(online_tutor_db);
            
        }
    });
});

todoRoutes.route('/:id').get(function(req, res) {
    let id = req.params.id;
    Todo.findById(id, function(err, Teacher) {          ////// to get Specific  Register Teachers 
        res.json(Teacher);
        
        
    });
});



    

todoRoutes.route('/Specificstudents/:id').get(function(req, res) {
    console.log("Hello World!")
    let id = req.params.id;
   
    Students.findById(id ,function(err, Teacher) {          ////// to get Specific  Register Student
        res.json(Teacher);
        if(!Teacher)                                                   
        {
            return res.status(400).send('No result Found!');
        }
        if(err)                                                  
        {
            return res.status(400).send('Some thing wents wrong');
        }
    });
});



    




todoRoutes.route('/S_By_Name').post(function(req, res) {
    console.log("Hello World from Search by Name!")
    
    User_Name=req.body.Student_Name;
    console.log("Student NAME",User_Name)
    Students.find({Student_Name:User_Name},function(err,user){

        console.log('user',user);
        if(err)                                                    ///To Search Student By Name
        {
            return res.status(400).send('adding new Student failed');
        }
       else if(!user)
        {
          return res.status(400).send('Invalid User Name or Password!');
        }
        else{
            res.json(user)
        }
    });
});

todoRoutes.route('/Teacher_By_User_Name').post(function(req, res) {
    console.log("Hello World from Search by  user Name!")
    
    User_Name=req.body.User_Name;
    console.log("Student NAME",User_Name)
    Todo.find({User_Name:User_Name},function(err,user){

        console.log('user',user);
        if(err)                                                    ///To Search Student By Name
        {
            return res.status(400).send('adding new Student failed');
        }
       else if(!user)
        {
          return res.status(400).send('Invalid User Name or Password!');
        }
        else{
            res.json(user)
        }
    });
});
todoRoutes.route('/Student_By_User_Name').post(function(req, res) {
    console.log("Hello World from Search by  user Name!")
    
    User_Name=req.body.User_Name;
    console.log("Student NAME",User_Name)
    Students.find({User_Name:User_Name},function(err,user){

        console.log('user by username',user);
        if(err)                                                    ///To Search Student By Name
        {
            return res.status(400).send('adding new Student failed');
        }
       else if(!user)
        {
          return res.status(400).send('Invalid User Name or Password!');
        }
        else{
            res.json(user)
        }
    });
});
todoRoutes.route('/S_By_UserName').post(function(req, res) {
    console.log("Hello World from Search by Name!")
    
    User_Name=req.body.User_Name;
    console.log("Student NAME",User_Name)
    Students.find({User_Name:User_Name},function(err,user){

        console.log('user',user);
        if(err)                                                    ///To Search Student By Name
        {
            return res.status(400).send('adding new Student failed');
        }
       else if(!user)
        {
          return res.status(400).send('Invalid User Name or Password!');
        }
        else{
            res.json(user)
        }
    });
});

todoRoutes.route('/S_By_Fee').post(function(req, res) {
    console.log("Hello World from Search by Name!")
    
    User_Name=req.body.Student_Fee_Range;
    console.log("Student NAME",User_Name)
    Students.find({Student_Fee_Range:User_Name},function(err,user){

        console.log('user',user);
        if(err)                                                    ///To Search Student By Name
        {
            return res.status(400).send('adding new Student failed');
        }
       else if(!user)
        {
          return res.status(400).send('Invalid User Name or Password!');
        }
        else{
            res.json(user)
        }
    });
});

todoRoutes.route('/S_By_Subject').post(function(req, res) {
    console.log("Hello World from Search by Name!")
    
    User_Name=req.body.Student_Class;
    console.log("Student NAME",User_Name)
    Students.find({Student_Class:User_Name},function(err,user){

        console.log('user',user);
        if(err)                                                    ///To Search Student By Name
        {
            return res.status(400).send('adding new Student failed');
        }
       else if(!user)
        {
          return res.status(400).send('Invalid User Name or Password!');
        }
        else{
            res.json(user)
        }
    });
});



todoRoutes.route('/single_Teacher').post(function(req, res) {
    User_Name=req.body.User_Name;
    Teacher_Password=req.body.Teacher_Password;
    console.log( "data",User_Name)
    console.log("password",Teacher_Password);
    Todo.find({User_Name:User_Name,Teacher_Password:Teacher_Password},function(err,user){
        console.log('user',user);
        if(err)                                                    ///To update Teacher paswsword
        {
            return res.status(400).send('adding new Student failed');
        }
        if(!user)
        {
          return res.status(400).send('Invalid User Name or Password!');
        }
       if(user)
       {
            
          res.json(user);
       }
    })
   
});




todoRoutes.route('/single_Student').post(function(req, res) {
    User_Name=req.body.User_Name;
    Teacher_Password=req.body.Student_Password;
    console.log( "data",User_Name)
    console.log("password",Teacher_Password);
    Students.find({User_Name:User_Name,Student_Password:Teacher_Password},function(err,user){
        console.log('user',user);
        if(err)                                                    ///To get Specific Student
        {
            return res.status(400).send('adding new Student failed');
        }
        if(!user)
        {
          return res.status(400).send('Invalid User Name or Password!');
        }
       if(user)
       {
            
          res.json(user);
       }
    })
   
});





////////////////////////////////////////////////////To Update Teacher Profile/////////////////////////////////////////////////////////////////////




todoRoutes.route('/updateTEmail').post(function(req, res) {
    Teacher_Name=req.body.User_Name;
    Teacher_Password=req.body.Teacher_Password;
    console.log( "Student log",Teacher_Name)
    Todo.findOne({User_Name:Teacher_Name,Teacher_Password:Teacher_Password}, function(err, Student) {
        if (!Student)
            res.status(404).send("Data  not found");
        else                                                                  // to update profile picture!
       
        Student.Teacher_Email=req.body.Teacher_Email;
       

        Student.save().then(Student => {
                res.json('Todo updated!');
            })
            .catch(err => {
                res.status(400).send("Update not possible");
            });
    });
});
todoRoutes.route('/T_By_Subject').post(function(req, res) {
    console.log("Hello World from Search by Name!")
    
    User_Name=req.body.Teacher_Qualification;
    console.log("Student NAME",User_Name)
    Todo.find({Teacher_Qualification:User_Name},function(err,user){

        console.log('user',user);
        if(err)                                                    ///To Search Student By Name
        {
            return res.status(400).send('adding new Student failed');
        }
       else if(!user)
        {
          return res.status(400).send('Invalid User Name or Password!');
        }
        else{
            res.json(user)
        }
    });
});
todoRoutes.route('/T_By_Name').post(function(req, res) {
    console.log("Hello World from Search by Name!")
    
    User_Name=req.body.Teacher_Name;
    console.log("Student NAME",User_Name)
    Todo.find({Teacher_Name:User_Name},function(err,user){

        console.log('user',user);
        if(err)                                                    ///To Search Student By Name
        {
            return res.status(400).send('adding new Student failed');
        }
       else if(!user)
        {
          return res.status(400).send('Invalid User Name or Password!');
        }
        else{
            res.json(user)
        }
    });
});

todoRoutes.route('/T_By_Fee').post(function(req, res) {
    console.log("Hello World from Search by Name!")
    
    User_Name=req.body.Teacher_Fee_Range;
    console.log("Student NAME",User_Name)
    Todo.find({Teacher_Fee_Range:User_Name},function(err,user){

        console.log('user',user);
        if(err)                                                    ///To Search Student By Name
        {
            return res.status(400).send('adding new Student failed');
        }
       else if(!user)
        {
          return res.status(400).send('Invalid User Name or Password!');
        }
        else{
            res.json(user)
        }
    });
});
todoRoutes.route('/T_By_City').post(function(req, res) {
    console.log("Hello World from Search by Name!")
    
    City=req.body.Teacher_City;
    console.log("Student NAME",User_Name)
    Todo.find({Teacher_City:City},function(err,user){

        console.log('user',user);
        if(err)                                                    ///To Search Student By Name
        {
            return res.status(400).send('adding new Student failed');
        }
       else if(!user)
        {
          return res.status(400).send('Invalid User Name or Password!');
        }
        else{
            res.json(user)
        }
    });
});

todoRoutes.route('/T_By_Gender').post(function(req, res) {
    console.log("Hello World from Search by Name!")
    Gender=req.body.Teacher_Gender;
    Todo.find({Teacher_Gender:Gender},function(err,user){

        console.log('user',user);
        if(err)                                                    ///To Search Student By Name
        {
            return res.status(400).send('adding new Student failed');
        }
       else if(!user)
        {
          return res.status(400).send('Invalid User Name or Password!');
        }
        else{
            res.json(user)
        }
    });
});
todoRoutes.route('/S_By_Gender').post(function(req, res) {
    console.log("Hello World from Search by Name!")
    Gender=req.body.Student_Gender;
    Students.find({Student_Gender:Gender},function(err,user){

        console.log('user',user);
        if(err)                                                    ///To Search Student By Name
        {
            return res.status(400).send('adding new Student failed');
        }
       else if(!user)
        {
          return res.status(400).send('Invalid User Name or Password!');
        }
        else{
            res.json(user)
        }
    });
});
todoRoutes.route('/S_By_City').post(function(req, res) {
    console.log("Hello World from Search by Name!")
    
    City=req.body.Student_City;
    Students.find({Student_City:City},function(err,user){

        console.log('user',user);
        if(err)                                                    ///To Search Student By Name
        {
            return res.status(400).send('adding new Student failed');
        }
       else if(!user)
        {
          return res.status(400).send('Invalid User Name or Password!');
        }
        else{
            res.json(user)
        }
    });
});
todoRoutes.route('/updateTGender').post(function(req, res) {
    Teacher_Name=req.body.User_Name;
    Teacher_Password=req.body.Teacher_Password;
    console.log( "Student log",Teacher_Name)
    Todo.findOne({User_Name:Teacher_Name,Teacher_Password:Teacher_Password}, function(err, Student) {
        if (!Student)
            res.status(404).send("Data  not found");
        else                                                                  // to update profile picture!
       
        Student.Teacher_Gender=req.body.Teacher_Gender;
       

        Student.save().then(Student => {
                res.json('Todo updated!');
            })
            .catch(err => {
                res.status(400).send("Update not possible");
            });
    });
});

todoRoutes.route('/updateTPassword').post(function(req, res) {
    User_Name=req.body.User_Name;
    Teacher_Password=req.body.Teacher_Password;
    console.log( "data",User_Name)
    console.log("password",Teacher_Password);
    Todo.findOne({User_Name:User_Name},function(err,user){
        console.log('user',user);
        if(err)                                                    ///To update Teacher paswsword
        {
            return res.status(400).send('adding new Student failed');
        }
        if(!user)
        {
          return res.status(400).send('Invalid User Name or Password!');
        }
       if(user)
       {
            
           user.Teacher_Password = req.body.Teacher_Password;
    console.log("password",Teacher_Password);
            user.save().then(Teacher => {
                     res.json('Todo updated!');
                 })
                 .catch(err => {
                     res.status(400).send("Update not possible");
                 });
       }
    })
   
});





todoRoutes.route('/updateTprofilePicture').post(function(req, res) {
    Teacher_Name=req.body.User_Name;
    Teacher_Password=req.body.Teacher_Password;
    console.log( "Student log",Teacher_Name)
    Todo.findOne({User_Name:Teacher_Name,Teacher_Password:Teacher_Password}, function(err, Student) {
        if (!Student)
            res.status(404).send("Data  not found");
        else                                                                  // to update profile picture!
       
        Student.Teacher_Picture=req.body.Teacher_Picture;
       

        Student.save().then(Student => {
                res.json('Todo updated!');
            })
            .catch(err => {
                res.status(400).send("Update not possible");
            });
    });
});


todoRoutes.route('/updateTPhone').post(function(req, res) {
    Teacher_Name=req.body.User_Name;
    Teacher_Password=req.body.Teacher_Password;
    console.log( "Student log",Teacher_Name)
    Todo.findOne({User_Name:Teacher_Name,Teacher_Password:Teacher_Password}, function(err, Student) {
        if (!Student)
            res.status(404).send("Data  not found");
        else                                                                  // to update profile picture!
       
        Student.Teacher_Phone=req.body.Teacher_Phone;
       

        Student.save().then(Student => {
                res.json('Todo updated!');
            })
            .catch(err => {
                res.status(400).send("Update not possible");
            });
    });
});


todoRoutes.route('/updateTInfo').post(function(req, res) {
    Teacher_Name=req.body.User_Name;
    Teacher_Password=req.body.Teacher_Password;
    console.log( "Student log",Teacher_Name)
    Todo.findOne({User_Name:Teacher_Name,Teacher_Password:Teacher_Password}, function(err, Student) {
        if (!Student)
            res.status(404).send("Data  not found");
        else                                                                  // to update profile picture!
       
        Student.Teacher_Info=req.body.Teacher_Info;
       

        Student.save().then(Student => {
                res.json('Todo updated!');
            })
            .catch(err => {
                res.status(400).send("Update not possible");
            });
    });
});


todoRoutes.route('/updateTQualification').post(function(req, res) {
    Teacher_Name=req.body.User_Name;
    Teacher_Password=req.body.Teacher_Password;
    console.log( "Student log",Teacher_Name)
    Todo.findOne({User_Name:Teacher_Name,Teacher_Password:Teacher_Password}, function(err, Student) {
        if (!Student)
            res.status(404).send("Data  not found");
        else                                                                  // to update profile picture!
       
        Student.Teacher_Qualification=req.body.Teacher_Qualification;
       

        Student.save().then(Student => {
                res.json('Todo updated!');
            })
            .catch(err => {
                res.status(400).send("Update not possible");
            });
    });
});


todoRoutes.route('/updateTExperience').post(function(req, res) {
    Teacher_Name=req.body.User_Name;
    Teacher_Password=req.body.Teacher_Password;
    console.log( "Student log",Teacher_Name)
    Todo.findOne({User_Name:Teacher_Name,Teacher_Password:Teacher_Password}, function(err, Student) {
        if (!Student)
            res.status(404).send("Data  not found");
        else                                                                  // to update profile picture!
       
        Student.Teacher_Experience=req.body.Teacher_Experience;
       

        Student.save().then(Student => {
                res.json('Todo updated!');
            })
            .catch(err => {
                res.status(400).send("Update not possible");
            });
    });
});


todoRoutes.route('/updateTFee_Range').post(function(req, res) {
    Teacher_Name=req.body.User_Name;
    Teacher_Password=req.body.Teacher_Password;
    console.log( "Student log",Teacher_Name)
    Todo.findOne({User_Name:Teacher_Name,Teacher_Password:Teacher_Password}, function(err, Student) {
        if (!Student)
            res.status(404).send("Data  not found");
        else                                                                  // to update profile picture!
       
        Student.Teacher_Fee_Range=req.body.Teacher_Fee_Range;
       

        Student.save().then(Student => {
                res.json('Todo updated!');
            })
            .catch(err => {
                res.status(400).send("Update not possible");
            });
    });
});

todoRoutes.route('/update/').post(function(req, res) {
    User_Name=req.body.User_Name;
    Teacher_Password=req.body.Teacher_Password;
    console.log( "data",User_Name)
    console.log("password",Teacher_Password);
    Todo.findOne({User_Name:User_Name},function(err,user){
        console.log('user',user);
        if(err)                                                       ////to update student password
        {
            return res.status(400).send('Student Updates fail!');
        }
        if(!user)
        {
          return res.status(400).send('Invalid Student Name');
        }
       if(user)
       {
            
           user.Teacher_Password = req.body.Teacher_Password;
    console.log("password",Teacher_Password);
            user.save().then(Teacher => {
                     res.json('Student updated!');
                 })
                 .catch(err => {
                     res.status(400).send("Student Update not possible");
                 });
       }
    })
   
});




todoRoutes.route('/updateTName').post(function(req, res) {
    Teacher_Name=req.body.User_Name;
    Teacher_Password=req.body.Teacher_Password;
    console.log( "Student log",Teacher_Name)
    Todo.findOne({User_Name:Teacher_Name,Teacher_Password:Teacher_Password}, function(err, Student) {
        if (!Student)
            res.status(404).send("Data  not found");
        else                                                                  // to update profile picture!
       
        Student.Teacher_Name=req.body.Teacher_Name;
       

        Student.save().then(Student => {
                res.json('Todo updated!');
            })
            .catch(err => {
                res.status(400).send("Update not possible");
            });
    });
});


todoRoutes.route('/updateTaddress').post(function(req, res) {
    Teacher_Name=req.body.User_Name;
    Teacher_Password=req.body.Teacher_Password;
    console.log( "Student log",Teacher_Name)
    Todo.findOne({User_Name:Teacher_Name,Teacher_Password:Teacher_Password}, function(err, Student) {
        if (!Student)
            res.status(404).send("Data  not found");
        else                                                                  // to update profile picture!
       
        Student.Teacher_Adress=req.body.Teacher_Adress;
       

        Student.save().then(Student => {
                res.json('Todo updated!');
            })
            .catch(err => {
                res.status(400).send("Update not possible");
            });
    });
});


todoRoutes.route('/updateTUser').post(function(req, res) {
    Teacher_Name=req.body.Teacher_Email;
    Teacher_Password=req.body.Teacher_Password;
    console.log( "Student log",Teacher_Name)
    Todo.findOne({Teacher_Email:Teacher_Name,Teacher_Password:Teacher_Password}, function(err, Student) {
        if (!Student)
            res.status(404).send("Data  not found");
        else                                                                  // to update profile picture!
       
        Student.User_Name=req.body.User_Name;
       

        Student.save().then(Student => {
                res.json('Todo updated!');
            })
            .catch(err => {
                res.status(400).send("Update not possible");
            });
    });
});








////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


//////////////////////////////////////////////////////////Update Student Profile ///////////////////////////////////////////////////////////////

todoRoutes.route('/updateSEmail').post(function(req, res) {
    Teacher_Name=req.body.User_Name;
    Teacher_Password=req.body.Student_Password;
    console.log( "Student log",Teacher_Name)
    Students.findOne({User_Name:Teacher_Name,Student_Password:Teacher_Password}, function(err, Student) {
        if (!Student)
            res.status(404).send("Data  not found");
        else                                                                  // to update profile picture!
       
        Student.Student_Email=req.body.Student_Email;
       

        Student.save().then(Student => {
                res.json('Todo updated!');
            })
            .catch(err => {
                res.status(400).send("Update not possible");
            });
    });
});



todoRoutes.route('/Studentupdate/').post(function(req, res) {
    User_Name=req.body.User_Name;
    Teacher_Password=req.body.Student_Password;
    console.log( "data",User_Name)
    console.log("password",Teacher_Password);
    Students.findOne({User_Name:User_Name},function(err,user){
        console.log('user',user);
        if(err)                                                       ////to update student password
        {
            return res.status(400).send('Student Updates fail!');
        }
        if(!user)
        {
          return res.status(400).send('Invalid Student Name');
        }
       if(user)
       {
            
           user.Student_Password = req.body.Student_Password;
    console.log("password",Teacher_Password);
            user.save().then(Teacher => {
                     res.json('Student updated!');
                 })
                 .catch(err => {
                     res.status(400).send("Student Update not possible");
                 });
       }
    })
   
});






todoRoutes.route('/updateSprofilePicture').post(function(req, res) {
    Student_Name=req.body.User_Name;
    Student_Password=req.body.Student_Password;
    console.log( "Student log",Student_Name)
    Students.findOne({User_Name:Student_Name,Student_Password:Student_Password}, function(err, Student) {
        if (!Student)
            res.status(404).send("Data  not found");
        else                                                                  // to update profile picture!
       
        Student.Student_Picture=req.body.Student_Picture;
       

        Student.save().then(Student => {
                res.json('Todo updated!');
            })
            .catch(err => {
                res.status(400).send("Update not possible");
            });
    });
});


todoRoutes.route('/updateSPhone').post(function(req, res) {
    Teacher_Name=req.body.User_Name;
    Teacher_Password=req.body.Student_Password;
    console.log( "Student log",Teacher_Name)
    Students.findOne({User_Name:Teacher_Name,Student_Password:Teacher_Password}, function(err, Student) {
        if (!Student)
            res.status(404).send("Data  not found");
        else                                                                  // to update profile picture!
       
        Student.Student_Phone=req.body.Student_Phone;
       

        Student.save().then(Student => {
                res.json('Todo updated!');
            })
            .catch(err => {
                res.status(400).send("Update not possible");
            });
    });
});
todoRoutes.route('/updateStudentSubjects').post(function(req, res) {
    Teacher_Name=req.body.User_Name;
    Teacher_Password=req.body.Student_Password;
    console.log( "Student log",Teacher_Name)
    Students.findOne({User_Name:Teacher_Name,Student_Password:Teacher_Password}, function(err, Student) {
        if (!Student)
            res.status(404).send("Data  not found");
        else                                                                  // to update profile picture!
       
        Student.Student_Subjects=req.body.Student_Subjects;
       

        Student.save().then(Student => {
                res.json('Todo updated!');
            })
            .catch(err => {
                res.status(400).send("Update not possible");
            });
    });
});
todoRoutes.route('/updateStudentCity').post(function(req, res) {
    Teacher_Name=req.body.User_Name;
    Teacher_Password=req.body.Student_Password;
    console.log( "i reached in city picker",Teacher_Name)
    Students.findOne({User_Name:Teacher_Name,Student_Password:Teacher_Password}, function(err, Student) {
        if (!Student)
            res.status(404).send("Data  not found");
        else                                                                  // to update profile picture!
       
        Student.Student_City=req.body.Student_City;
       

        Student.save().then(Student => {
                res.json('Todo updated!');
            })
            .catch(err => {
                res.status(400).send("Update not possible");
            });
    });
});
todoRoutes.route('/updateTeacherCity').post(function(req, res) {
    Teacher_Name=req.body.User_Name;
    Teacher_Password=req.body.Teacher_Password;
    console.log( "Student log",Teacher_Name)
    Todo.findOne({User_Name:Teacher_Name,Teacher_Password:Teacher_Password}, function(err, Student) {
        if (!Student)
            res.status(404).send("Data  not found");
        else                                                                  // to update profile picture!
       
        Student.Teacher_City=req.body.Teacher_City;
       

        Student.save().then(Student => {
                res.json('Todo updated!');
            })
            .catch(err => {
                res.status(400).send("Update not possible");
            });
    });
});

todoRoutes.route('/update_s_Tuttionstarttime').post(function(req, res) {
    Teacher_Name=req.body.User_Name;
    Teacher_Password=req.body.Student_Password;
    console.log( "Student log",Teacher_Name)
    Students.findOne({User_Name:Teacher_Name,Student_Password:Teacher_Password}, function(err, Student) {
        if (!Student)
            res.status(404).send("Data  not found");
        else                                                                  // to update profile picture!
       
        Student.Tuttion_Start_Time=req.body.Tuttion_Start_Time;
       

        Student.save().then(Student => {
                res.json('Todo updated!');
            })
            .catch(err => {
                res.status(400).send("Update not possible");
            });
    });
});

todoRoutes.route('/update_T_TuttionEndingtime').post(function(req, res) {
    Teacher_Name=req.body.User_Name;
    Teacher_Password=req.body.Teacher_Password;
    console.log( "Student log",Teacher_Name)
    Todo.findOne({User_Name:Teacher_Name,Teacher_Password:Teacher_Password}, function(err, Student) {
        if (!Student)
            res.status(404).send("Data  not found");
        else                                                                  // to update profile picture!
       
        Student.Teacher_End_Time=req.body.Teacher_End_Time;
       

        Student.save().then(Student => {
                res.json('Todo updated!');
            })
            .catch(err => {
                res.status(400).send("Update not possible");
            });
    });
});




todoRoutes.route('/update_T_TuttionStartingtime').post(function(req, res) {
    Teacher_Name=req.body.User_Name;
    Teacher_Password=req.body.Teacher_Password;
    console.log( "Student log",Teacher_Name)
    Todo.findOne({User_Name:Teacher_Name,Teacher_Password:Teacher_Password}, function(err, Student) {
        if (!Student)
            res.status(404).send("Data  not found");
        else                                                                  // to update profile picture!
       
        Student.Teacher_Start_Time=req.body.Teacher_Start_Time;
       

        Student.save().then(Student => {
                res.json('Todo updated!');
            })
            .catch(err => {
                res.status(400).send("Update not possible");
            });
    });
});


todoRoutes.route('/update_T_DesiredStudent').post(function(req, res) {
    Teacher_Name=req.body.User_Name;
    Teacher_Password=req.body.Teacher_Password;
    console.log( "Student log",Teacher_Name)
    Todo.findOne({User_Name:Teacher_Name,Teacher_Password:Teacher_Password}, function(err, Student) {
        if (!Student)
            res.status(404).send("Data  not found");
        else                                                                  // to update profile picture!
       
        Student.Desired_Student=req.body.Desired_Student;
       

        Student.save().then(Student => {
                res.json('Todo updated!');
            })
            .catch(err => {
                res.status(400).send("Update not possible");
            });
    });
});
todoRoutes.route('/update_T_DesiredClass').post(function(req, res) {
    Teacher_Name=req.body.User_Name;
    Teacher_Password=req.body.Teacher_Password;
    console.log( "Student log",Teacher_Name)
    Todo.findOne({User_Name:Teacher_Name,Teacher_Password:Teacher_Password}, function(err, Student) {
        if (!Student)
            res.status(404).send("Data  not found");
        else                                                                  // to update profile picture!
       
        Student.Desired_Class=req.body.Desired_Class;
       

        Student.save().then(Student => {
                res.json('Todo updated!');
            })
            .catch(err => {
                res.status(400).send("Update not possible");
            });
    });
});

todoRoutes.route('/update_T_DesiredSubjects').post(function(req, res) {
    Teacher_Name=req.body.User_Name;
    Teacher_Password=req.body.Teacher_Password;
    console.log( "Student log",Teacher_Name)
    Todo.findOne({User_Name:Teacher_Name,Teacher_Password:Teacher_Password}, function(err, Student) {
        if (!Student)
            res.status(404).send("Data  not found");
        else                                                                  // to update profile picture!
       
        Student.Desired_Subjects=req.body.Desired_Subjects;
       

        Student.save().then(Student => {
                res.json('Todo updated!');
            })
            .catch(err => {
                res.status(400).send("Update not possible");
            });
    });
});

todoRoutes.route('/update_s_Nature').post(function(req, res) {
    Teacher_Name=req.body.User_Name;
    Teacher_Password=req.body.Student_Password;
    console.log( "Student log",Teacher_Name)
    Students.findOne({User_Name:Teacher_Name,Student_Password:Teacher_Password}, function(err, Student) {
        if (!Student)
            res.status(404).send("Data  not found");
        else                                                                  // to update profile picture!
       
        Student.Student_Nature=req.body.Student_Nature;
       

        Student.save().then(Student => {
                res.json('Todo updated!');
            })
            .catch(err => {
                res.status(400).send("Update not possible");
            });
    });
});
todoRoutes.route('/update_s_Tuttionsendtime').post(function(req, res) {
    Teacher_Name=req.body.User_Name;
    Teacher_Password=req.body.Student_Password;
    console.log( "Student log",Teacher_Name)
    Students.findOne({User_Name:Teacher_Name,Student_Password:Teacher_Password}, function(err, Student) {
        if (!Student)
            res.status(404).send("Data  not found");
        else                                                                  // to update profile picture!
       
        Student.Tuttion_End_Time=req.body.Tuttion_End_Time;
       

        Student.save().then(Student => {
                res.json('Todo updated!');
            })
            .catch(err => {
                res.status(400).send("Update not possible");
            });
    });
});


todoRoutes.route('/updateSInfo').post(function(req, res) {
    Teacher_Name=req.body.User_Name;
    Teacher_Password=req.body.Student_Password;
    console.log( "Student log",Teacher_Name)
    Students.findOne({User_Name:Teacher_Name,Student_Password:Teacher_Password}, function(err, Student) {
        if (!Student)
            res.status(404).send("Data  not found");
        else                                                                  // to update profile picture!
       
        Student.Student_Info=req.body.Student_Info;
       

        Student.save().then(Student => {
                res.json('Todo updated!');
            })
            .catch(err => {
                res.status(400).send("Update not possible");
            });
    });
});


todoRoutes.route('/updateSGrade').post(function(req, res) {
    Teacher_Name=req.body.User_Name;
    Teacher_Password=req.body.Student_Password;
    console.log( "Student log",Teacher_Name)
    Students.findOne({User_Name:Teacher_Name,Student_Password:Teacher_Password}, function(err, Student) {
        if (!Student)
            res.status(404).send("Data  not found");
        else                                                                  // to update profile picture!
       
        Student.Student_Lastgrades=req.body.Student_Lastgrades;
       

        Student.save().then(Student => {
                res.json('Todo updated!');
            })
            .catch(err => {
                res.status(400).send("Update not possible");
            });
    });
});

todoRoutes.route('/updateSGender').post(function(req, res) {
    Teacher_Name=req.body.User_Name;
    Teacher_Password=req.body.Student_Password;
    console.log( "Student log",Teacher_Name)
    Students.findOne({User_Name:Teacher_Name,Student_Password:Teacher_Password}, function(err, Student) {
        if (!Student)
            res.status(404).send("Data  not found");
        else                                                                  // to update profile picture!
       {
        Student.Student_Gender=req.body.Student_Gender;
       

        Student.save().then(Student => {
                res.json('Todo updated!');
            })
            .catch(err => {
                res.status(400).send("Update not possible");
            });
        }
    });
});


todoRoutes.route('/updateSClass').post(function(req, res) {
    Teacher_Name=req.body.User_Name;
    Teacher_Password=req.body.Student_Password;
    console.log( "Student log",Teacher_Name)
    Students.findOne({User_Name:Teacher_Name,Student_Password:Teacher_Password}, function(err, Student) {
        if (!Student)
            res.status(404).send("Data  not found");
        else                                                                  // to update profile picture!
       
        Student.Student_Class=req.body.Student_Class;
       

        Student.save().then(Student => {
                res.json('Todo updated!');
            })
            .catch(err => {
                res.status(400).send("Update not possible");
            });
    });
});


todoRoutes.route('/updateSFee_Range').post(function(req, res) {
    Teacher_Name=req.body.User_Name;
    Teacher_Password=req.body.Student_Password;
    console.log( "Student log",Teacher_Name)
    Students.findOne({User_Name:Teacher_Name,Student_Password:Teacher_Password}, function(err, Student) {
        if (!Student)
            res.status(404).send("Data  not found");
        else                                                                  // to update profile picture!
       
        Student.Student_Fee_Range=req.body.Student_Fee_Range;
       

        Student.save().then(Student => {
                res.json('Todo updated!');
            })
            .catch(err => {
                res.status(400).send("Update not possible");
            });
    });
});



todoRoutes.route('/updateSName').post(function(req, res) {
    Teacher_Name=req.body.User_Name;
    Teacher_Password=req.body.Student_Password;
    console.log( "Student log",Teacher_Name)
    Students.findOne({User_Name:Teacher_Name,Student_Password:Teacher_Password}, function(err, Student) {
        if (!Student)
            res.status(404).send("Data  not found");
        else                                                                  // to update profile picture!
       
        Student.Student_Name=req.body.Student_Name;
       

        Student.save().then(Student => {
                res.json('Todo updated!');
            })
            .catch(err => {
                res.status(400).send("Update not possible");
            });
    });
});

todoRoutes.route('/updateSUserName').post(function(req, res) {
    Student_Name=req.body.Student_Name;
    Student_Password=req.body.Student_Password;
   console.log("Change user Name")
    Students.findOne({Student_Name:Student_Name,Student_Password:Student_Password}, function(err, Student) {
        if (!Student)
            res.status(404).send("Data  not found");
        else                                                                  // to update profile picture!
       
        Student.User_Name=req.body.User_Name;
       

        Student.save().then(Student => {
                res.json('Todo updated!');
            })
            .catch(err => {
                res.status(400).send("Update not possible");
            });
    });
});


todoRoutes.route('/updateSUser').post(function(req, res) {
    Teacher_Name=req.body.Student_Email;
    Teacher_Password=req.body.Student_Password;
    console.log( "Student log",Teacher_Name)
    Students.findOne({Student_Email:Teacher_Name,Student_Password:Teacher_Password}, function(err, Student) {
        if (!Student)
            res.status(404).send("Data  not found");
        else                                                                  // to update profile picture!
       
        Student.User_Name=req.body.User_Name;
       

        Student.save().then(Student => {
                res.json('Todo updated!');
            })
            .catch(err => {
                res.status(400).send("Update not possible");
            });
    });
});


todoRoutes.route('/updateSaddress').post(function(req, res) {
    Teacher_Name=req.body.User_Name;
    Teacher_Password=req.body.Student_Password;
    console.log( "Student log",Teacher_Name)
    Students.findOne({User_Name:Teacher_Name,Student_Password:Teacher_Password}, function(err, Student) {
        if (!Student)
            res.status(404).send("Data  not found");
        else                                                                  // to update profile picture!
       
        Student.Student_Adress=req.body.Student_Adress;
       

        Student.save().then(Student => {
                res.json('Todo updated!');
            })
            .catch(err => {
                res.status(400).send("Update not possible");
            });
    });
});













//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

todoRoutes.route('/TeacherNotifications').post(function(req, res) {
    Teacher_Name=req.body.User_Name;
    Teacher_Password=req.body.Teacher_Password;
    console.log( "Student log",Teacher_Name)
    Todo.findOne({User_Name:Teacher_Name,Teacher_Password:Teacher_Password}, function(err, Student) {
        if (!Student)
            res.status(404).send("Data  not found");
        else                                                                  // to update profile picture!
       
        Student.Teacher_Notifications=req.body.Teacher_Notifications;
       

        Student.save().then(Student => {
                res.json('Todo updated!');
            })
            .catch(err => {
                res.status(400).send("Update not possible");
            });
    });
});





todoRoutes.route('/add').post(function(req, res) {
    let Teacher = new Todo(req.body);                                      /////to register new teacher
    Teacher.save()
        .then(Teacher => {
            res.status(200).json({'Teacher': 'Teacher added successfully'});
        })
        .catch(err => {
            res.status(400).send('adding new teacher failed');
        });
});


todoRoutes.route('/T_By_UserName').post(function(req, res) {
    console.log("Hello World from Search by Name!")
    
    User_Name=req.body.User_Name;
    console.log("Student NAME",User_Name)
    Todo.find({User_Name:User_Name},function(err,user){

        console.log('user',user);
        if(err)                                                    ///To Search Student By Name
        {
            return res.status(400).send('adding new Student failed');
        }
       else if(!user)
        {
          return res.status(400).send('Invalid User Name or Password!');
        }
        else{
            res.json(user)
        }
    });
});


todoRoutes.route('/Students').post(function(req, res) {
    let Student = new Students(req.body);
    console.log('Student Register!')
    Student.save()
        .then(Student => {                                                    /////   to  register new Student
            res.status(200).json({'Student': 'Student added successfully'});
        })
        .catch(err => {
            res.status(400).send('adding new Student failed');
        });
});


todoRoutes.route('/LogoutStudent').post(function(req, res) {

     console.log("Reached in LOgout!")
    var User_Name=req.body.User_Name;
    var Password=req.body.Password;
    console.log("Client:",User_Name,Password); 
    Login_Student.findOne({User_Name:User_Name,Password:Password},function(err,user){
        console.log('user',user);
        if(err)
        {
            return res.status(400).send('adding new Student failed');
        }
        if(!user)                                                           ///For login Teacher
        {
       return res.status(400).send('Invalid User Name or Password!');
        }
       if(user)
       {
        Login_Student.deleteMany(user, function(err, obj) {
            if (err) throw err;
            else{
                console.log("1 document deleted");
                return res.status(200).send('Deleted Successfully!');
            }
           
            
          });
         
       }
    })
});


todoRoutes.route('/DeleteStudentAccount').post(function(req, res) {

    console.log("Reached in Delete account!")
   var User_Name=req.body.User_Name;
   var Password=req.body.Student_Password;
   console.log("Client:",User_Name,"Password",Password); 
   Students.findOne({User_Name:User_Name,Student_Password:Password},function(err,user){
       console.log('user',user);
       if(err)
       {
           return res.status(400).send('adding new Student failed');
       }
       if(!user)                                                           ///For login Teacher
       {
      return res.status(400).send('Invalid User Name or Password!');
       }
      if(user)
      {
        Students.deleteMany(user, function(err, obj) {
            if (err) throw err;
            else{
                console.log("1 document deleted");
                return res.status(200).send('Account Deleted Successfully!');
            }
           
            
          });
       
      }
         
      
   })
});


todoRoutes.route('/DeleteTeacherAccount').post(function(req, res) {

    console.log("Reached in LOgout!")
   var User_Name=req.body.User_Name;
   var Password=req.body.Teacher_Password;
   console.log("Client:",User_Name,Password); 
   Todo.findOne({User_Name:User_Name,Teacher_Password:Password},function(err,user){
       console.log('user',user);
       if(err)
       {
           return res.status(400).send('adding new Student failed');
       }
       if(!user)                                                           ///For login Teacher
       {
      return res.status(400).send('Invalid User Name or Password!');
       }
      if(user)
      {
        Todo.deleteMany(user, function(err, obj) {
           if (err) throw err;
           else{
               console.log("1 document deleted");
               return res.status(200).send('Account Deleted Successfully!');
           }
          
           
         });
        }
        
        
   })
});





todoRoutes.route('/LogoutTeacher').post(function(req, res) {

    console.log("Reached in LOgout!")
   var User_Name=req.body.User_Name;
   var Password=req.body.Password;
   console.log("Client:",User_Name,Password); 
   Login_Teacher.findOne({User_Name:User_Name,Password:Password},function(err,user){
       console.log('user',user);
       if(err)
       {
           return res.status(400).send('adding new Student failed');
       }
       if(!user)                                                           ///For login Teacher
       {
      return res.status(400).send('Invalid User Name or Password!');
       }
      if(user)
      {
        Login_Teacher.deleteMany(user, function(err, obj) {
           if (err) throw err;
           else{
               console.log("1 document deleted");
               return res.status(200).send('Deleted Successfully!');
           }
          
           
         });
        
      }
   })
});






todoRoutes.route('/Login_Teacher').post(function(req, res) {

     
    var User_Name=req.body.User_Name;
    var Password=req.body.Password;
    console.log("Client:",User_Name,Password); 
    Todo.findOne({User_Name:User_Name,Teacher_Password:Password},function(err,user){
        console.log('user',user);
        if(err)
        {
            return res.status(400).send('adding new Student failed');
        }
        if(!user)                                                           ///For login Teacher
        {
       return res.status(400).send('Invalid User Name or Password!');
        }
       if(user)
       {
         let Student = new Login_Teacher(req.body);
        Student.save()
            .then(Student => {
                res.status(200).json({'Teacher': 'Teacher login Successfully'});
            })
            .catch(err => {
                res.status(400).send('Teacher login fail');
            });
         
       }
    })
});


todoRoutes.route('/LoginStudent_Data').post(function(req, res) {

     
    var User_Name=req.body.User_Name;
    var Password=req.body.Student_Password;
    console.log("Client:",User_Name,Password); 
    Students.findOne({User_Name:User_Name,Student_Password:Password},function(err,user){
        console.log('user',user);
        if(err)
        {
            return res.status(400).send('adding new Student failed');
        }
        if(!user)                                                           ///To update Picture of Student account
        {
       return res.status(400).send('Invalid User Name or Password!');
        }
       if(user)
       {
         res.json(user);
       }
    })
});


todoRoutes.route('/LoginTeacher_Data').post(function(req, res) {

     console.log("Doing Correctly!")
    var User_Name=req.body.User_Name;
    var Password=req.body.Teacher_Password;
    console.log("Client:",User_Name,Password); 
    Todo.findOne({User_Name:User_Name,Teacher_Password:Password},function(err,user){
        console.log('user',user);
        if(err)
        {
            return res.status(400).send('adding new Student failed');
        }
        if(!user)                                                           ///To update Picture of Student account
        {
       return res.status(400).send('Invalid User Name or Password!');
        }
       if(user)
       {
         res.json(user);
       }
    })
});

todoRoutes.route('/Login_Student').post(function(req, res) {

    var User_Name=req.body.User_Name;
    var Password=req.body.Password;
    console.log("Client:",User_Name,Password); 
    Students.findOne({User_Name:User_Name,Student_Password:Password},function(err,user){
        console.log('user',user);
        if(err)
        {
            return res.status(400).send('adding new Student failed');
        }
        if(!user)                                                      /////For login Student
        {
       return res.status(400).send('Invalid User Name or Password!');
        }
       if(user)
   {
    let Student = new Login_Student(req.body);
    Student.save()
        .then(Student => {
            res.status(200).json({'Student': 'Student Login Successfully'});
        })
        .catch(err => {
            res.status(400).send('Student Login Fail');
        });
    } 
})
});











app.use('/online_tutor_db', todoRoutes);

app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});