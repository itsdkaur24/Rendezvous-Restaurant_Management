const express = require('express');
const connection = require('../connection');
const router = express.Router();
 
const nodemailer = require("nodemailer");
require('dotenv').config(); 
 
router.post('/signup', async(req,res,next) =>{
    let user = req.body; 
    var response = {};
    query ="select email, password, role from user where email=?"
    connection.query(query,[user.email],(err,results)=>{
        if(!err){
            if(results.length <=0){
                var custId="CU"+user.num;
                query = "insert into user(id, name, email, password, image, role) values(?,?,?,?, 'profile.png', 'user')";
                connection.query(query,[custId, user.name, user.email,user.password],(err,results)=>{
                  if(!err){
                    response.status = 201;
                    response.msg = "Successfully Registered. You can login now."
                    return res.status(response.status).send(response);
                  }
                  else{
                    response.status = 500; 
                    return res.status(response.status).send(err);
                  }
                })
            }   
            else{
                response.status = 400;
                response.msg = "Email Already Exist."
                return res.status(response.status).send(response);
            }
        }
        else{
            response.status = 500;
            return res.status(response.status).send(err);
        }
    })
   
})

router.post('/login', async(req,res,next)=>{
  const user = req.body;
  var response = {};
  query = "select email,name, password, role from user where email=?";
  connection.query(query,[user.email],(err,results)=>{
    if(!err){
        if(results.length <=0 || results[0].password != user.password){
          response.status = 401;
          response.msg = "Incorrect Username or Password. Make sure you have registered first"
          res.status(response.status).send(response);
        }
        else if(results[0].password == user.password){
          response.status = 201;
          response.msg = {
            "value": "Login Success!",
            "role": results[0].role
          }
          req.session.user = { email: results[0].email, role: results[0].role , name: results[0].name }
          //console.log(req.session.user)
          res.status(response.status).send(response);
        }
        else{
          res.status(400).json({message: "Something went wrong. Please try again later"});
        }
    }
    else{
        res.status(500).json(err);  
    } 

  })
})

router.post('/feedback',async(req,res,next)=>{
  const user =req.body;
  var response={};
  query="insert into feedback(name,email,rating, message) values(?,?,?,?)";
  connection.query(query,[user.name, user.email,user.rating, user.message],(err,results)=>{
    if(!err){
      response.status = 201;
      response.msg = "Feedback Submitted Successfully"
      return res.status(response.status).send(response);
    }
    else{
      response.status = 500;
      return res.status(response.status).send(err);
    }
  })
})

// router.post('/contactus',async(req,res,next)=>{
//   const user =req.body;
//   var response={};
//   query="insert into contact(name,email,phone, message) values(?,?,?,?)";
//   connection.query(query,[user.name, user.email,user.phone, user.message],(err,results)=>{
//     if(!err){
//       response.status = 201;
//       response.msg = "Message Sent Successfully";
//       return res.status(response.status).send(response);
//     }
//     else{
//       response.status = 500;
//       return res.status(response.status).send(err);
//     }
//   }) 
// })

router.post('/reservation',async(req,res,next)=>{
  const user =req.body;
  var response={};
  var tableId="RES"+user.num;
  query="insert into reserve( id,name,email,phone,date,time,guests,cancel) values(?,?,?,?,?,?,?,?)";
  connection.query(query,[tableId,user.name, user.email,user.phone, user.date, user.time ,user.guests,'no'],(err,results)=>{
    if(!err){
      response.status = 201;
      response.msg = "Reservation Succesfull";
      return res.status(response.status).send(response);
    }
    else{
      response.status = 500;
      return res.status(response.status).send(err);
    }
  })
})


 


router.post('/Pay',async(req,res,next)=>{
  const user =req.body;
  var response={};
  var orderId="ORD"+user.num;
  query="insert into catering(id,name,email,date,time,guests,food,event,itemPrice,tax,totalprice,image,cancel) values (?,?,?,?,?,?,?,?,?,?,?,?,?)" ;
  connection.query(query,[ orderId, user.name, user.email, user.date, user.time ,user.guests, user.food, user.event, user.item,user.tax,user.total,user.image,"no"],(err,results)=>{
    if(!err){
      response.status = 201;
      response.msg = "Booking Succesfull";
      return res.status(response.status).send(response);
      // req.session.user = { email: results[0].email, role: results[0].role , name: results[0].name }
      // //console.log(req.session.user)
      // res.status(response.status).send(response);
    }
    else{
      response.status = 500;
      return res.status(response.status).send(err);
      
    }
     
  })
})

 



  var transporter = nodemailer.createTransport({
    //service: "zohomail",
    host: 'smtp.gmail.com',
    secure: true,
    port: 465,
    auth:{
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    }
})

router.post('/forgotpassword',async(req,res,next)=>{
  const user = req.body;
  var response={};
  query = "select email,password from user where email=?"; 
  connection.query(query,[user.email],(err,results)=>{
    if(!err){ 
      if(results.length <=0)
      {
        response.status = 404;
        response.msg = "Email does not exist!";
        return res.status(response.status).send(response);
      }
      else{
        var mailOptions ={
          from: process.env.EMAIL,
          to: results[0].email,
          subject:'Password by Rendezvous',
          html: '<p><b>Your Login details for Rendezvous Restaurant</b><br><b>Email: </b>'+results[0].email+'<br><b>Password: </b>'+results[0].password+'<br><a href="http://localhost:8081">Click here to login</a></p>'
        };
        transporter.sendMail(mailOptions,function(error,info){
          if(error){
            console.log(error);
          }
          else{
            console.log('Email sent');
          }
      });
      response.status = 200;
        response.msg = "Email sent";
        return res.status(response.status).send(response);
     }
   }
   else{
        response.status = 500;
        return res.status(response.status).send(err);
  }
 })  
})







//
// response.status = 500;
// return res.status(response.status).send(err);//

router.post('/profile-update',async(req,res,next)=>{
  const user =req.body;
  var response={};
  query="update user set name=?, phone= ?, address=? where email=?";
  connection.query(query,[ user.name, user.phone, user.address,user.email],(err,results)=>{
    if(!err){
      response.status = 201;
      response.msg = "Updated Successfully"
      return res.status(response.status).send(response);
    }
    else{
      response.status = 500;
      return res.status(response.status).send(err);
    }
  })
})


router.get('/profile',async(req,res,next)=>{
  var response={};
  //console.log("profile "+req.session.user.email);
  query="select image, name,email,phone,address from user where email=?";
  connection.query(query,[req.session.user.email],(err,results)=>{
    if(!err){
      response.status = 200;
      response.msg = results[0];
      //  console.log(results[0].name);

      return res.status(response.status).send(response);
    }
    else{
      response.status = 500;
      return res.status(response.status).send(err);
    } 
  })
})




router.post('/cancel', async(req, res,next) => {
  var response={};
  var order = req.body.orderId;
  console.log(order);
   query = "update catering set cancel='yes' where id=?";
  connection.query(query, [order], (err, results) => {
    // if (err) {
    //   console.log(err); 
    //   res.status(500).send('Error cancelling order');
    // } else {
    //   res.send('Order cancelled successfully');
    // }
    if(!err){
      response.status = 201;
      response.msg = "Cancelled Successfully"
      return res.status(response.status).send(response);
    }
    else{
      response.status = 500;
      return res.status(response.status).send(err);
    }
  });
});

router.post('/canceltable', async(req, res,next) => {
  var response={};
  var table = req.body.tableId;
  console.log(table);
   query = "update reserve set cancel='yes' where id=?";
  connection.query(query, [table], (err, results) => {
    // if (err) {
    //   console.log(err); 
    //   res.status(500).send('Error cancelling order');
    // } else {
    //   res.send('Order cancelled successfully');
    // }
    if(!err){
      response.status = 201;
      response.msg = "Cancelled Successfully"
      return res.status(response.status).send(response);
    }
    else{
      response.status = 500;
      return res.status(response.status).send(err);
    }
  });
});



router.get('/invoice',async(req,res,next)=>{
  // var response={};
  var order=req.query.orderId;
  console.log(order);
  // console.log("***"+typeof(order));
  //console.log("profile "+req.session.user.email);
  query="select * from catering where id=?";
  connection.query(query,[order],(err,results1)=>{
    
    if(!err){
      console.log(results1[0]);
      query="select * from user where email=? ";
      connection.query(query,[req.session.user.email],(err,results2)=>{
      if(!err){
        console.log(results2[0]);
        res.render('invoice.html',{invoice:results1[0],customer:results2[0]});

      }
      else{
        console.log(err);
        window.alert("Error");
      }
      })
      
    }
    else{
      console.log(err);
      window.alert("Error");
      // response.status = 500;
      //   return res.status(response.status).send(err);
    } 
    
  
  })
})

router.get('/dashboard',async(req,res,next)=>{
  //console.log("profile "+req.session.user.email);
  query="SELECT 'user' AS TableName, COUNT(*) AS Count FROM user WHERE role = 'user' UNION ALL SELECT 'catering' AS TableName, COUNT(*) AS Count FROM catering  WHERE cancel = 'no'  UNION ALL SELECT 'feedback' AS TableName, COUNT(*) AS Count FROM feedback  UNION ALL SELECT 'reserve' AS TableName, COUNT(*) AS Count FROM reserve WHERE cancel = 'no'";
  connection.query(query,(err,results)=>{
    if(!err){
      console.log({dashboard:results});
      res.render('dashboard.html',{dashboard:results});
    }
    else{
      console.log(err);
      window.alert("Error");
    }
  })
})





router.get('/get', async(req,res,next)=>{
  var query ="select id,name,email from user where role='user'";
  connection.query(query,(err,results)=>{
    if(!err){
      return res.status(201).json(results);
    }
    else{
      return res.status(500).json(err);
    }
  })
})



router.post('/change_password',async(req,res)=>{
  const user = req.body;
  var response = {};
  query="select password  from user where email=?";
  connection.query(query,[req.session.user.email],(err,results)=>{
    if(!err){
      if(results[0].password != user.opass){
        response.status = 401;
        response.msg = "Incorrect Old Password"
        res.status(response.status).send(response);
      }
      else{
        query = "update user set password =? where email = ?";
        connection.query(query,[ user.npass,req.session.user.email],(err,results)=>{
          if(!err){
            response.status=201;
            response.msg="Password Updated";
            return res.status(response.status).send(response);
            }    
         else{
            response.status=500; 
            return res.status(response.status).send(err);
          }  
        })
      }
    }
})
})
 



// router.get('/profile',async(req,res,next)=>{
//   var response={};
//   //console.log("profile "+req.session.user.email);
//   query="select image, name,email,phone,address from user where email=?";
//   connection.query(query,[req.session.user.email],(err,results)=>{
//     if(!err){
//       response.status = 200;
//       response.msg = results[0];
//       //  console.log(results[0].name);

//       return res.status(response.status).send(response);
//     }
//     else{
//       response.status = 500;
//       return res.status(response.status).send(err);
//     }  
//   }) 
// }) 

router.get('/userReservation',async(req,res,next)=>{
  query="select * from reserve where email=?";
  connection.query(query,[req.session.user.email],(err,results)=>{
  if(!err){
    console.log(results);
    // res.render('userReservation.html',{userReservation:results});
    results.forEach(i => {
      console.log(new Date(i.date) > new Date().setDate(new Date().getDate() + 2));
      if(new Date(i.date) < new Date() ){
        i.status="completed";
      }
      else{
        i.status="ongoing";
        var dif= Math.abs(new Date(i.date)-new Date());
        var d = dif/(1000 * 3600 * 24)
        console.log(d); 
        i.days=d; 
      } 
      if(i.cancel=="yes"){
        i.status="cancelled";
      }
      // if (new Date(i.date) > new Date().setDate(new Date().getDate() + 2)) {
      //   i.status = "yes cancel";
      // } 
      
    });
    console.log(results);
    res.render('userReservation.html',{userReservation:results});
  }
  else{
    console.log(err);
    window.alert("Error");
  }

})
})


 
router.get('/orders',async(req,res,next)=>{
    query="select * from catering where email=?";
    connection.query(query,[req.session.user.email],(err,results)=>{
    if(!err){
      console.log(results);
      results.forEach(i => {
        console.log(new Date(i.date) > new Date().setDate(new Date().getDate() + 2));
        if(new Date(i.date) < new Date() ){
          i.status="completed";
        }
        else{
          i.status="ongoing";
          var dif= Math.abs(new Date(i.date)-new Date());
          var d = dif/(1000 * 3600 * 24)
          console.log(d); 
          i.days=d;
        } 
        if(i.cancel=="yes"){
          i.status="cancelled";
        }
        // if (new Date(i.date) > new Date().setDate(new Date().getDate() + 2)) {
        //   i.status = "yes cancel";
        // } 
        
      });
      console.log(results);
      res.render('orders.html',{orders:results});
    }
    else{ 
      console.log(err);
      window.alert("Error");
    }
 
  })
})






// router.get('/orders1',async(req,res,next)=>{
//   query="select * from catering where email=? and event=?";
//   connection.query(query,[req.session.user.email,"Birthday Party"],(err,results)=>{
//   if(!err){
//     console.log(results);
//     res.render('orders.html',{orders:results});
//   }
//   else{ 
//     console.log(err);
//     window.alert("Error");
//   }

// })
// })







router.post('/sendemail',async(req,res,next)=>{
  const user = req.body;
  var response={};
  console.log(user);
  var mailOptions ={
    from:process.env.EMAIL,
    to: process.env.EMAIL,
    subject:'Message by  Rendezvous Customer',
    html: '<p><b>You have recieved a message from </b><br><b>Name: </b>'+user.name+'<br><b>Email: </b>'+user.email+'<br><b>Message: </b>'+user.message+'<br> Reply them back</p>'
  };
  transporter.sendMail(mailOptions,function(error,info){
    if(error){
      console.log(error);
      response.msg="ERROR"
    }
    else{
      // window.alert('Message sent');
      // window.location.reload();
      response.status=201;
      response.msg="Email Sent";
      return res.status(response.status).send(response);
    }
});
})

// router.post('/forgotpassword',async(req,res,next)=>{
//   const user = req.body;
//   var response={};
//   query = "select email,password from user where email=?"; 
//   connection.query(query,[user.email],(err,results)=>{
//     if(!err){ 
//       if(results.length <=0)
//       {
//         response.status = 404;
//         response.msg = "Email does not exist!";
//         return res.status(response.status).send(response);
//       }
//       else{
//         var mailOptions ={
//           from: process.env.EMAIL,
//           to: results[0].email,
//           subject:'Password by Rendezvous',
//           html: '<p><b>Your Login details for Rendezvous Restaurant</b><br><b>Email: </b>'+results[0].email+'<br><b>Password: </b>'+results[0].password+'<br><a href="http://localhost:8081">Click here to login</a></p>'
//         };
//         transporter.sendMail(mailOptions,function(error,info){
//           if(error){
//             console.log(error);
//           }
//           else{
//             console.log('Email sent');
//           }
//       });
//       response.status = 200;
//         response.msg = "Email sent";
//         return res.status(response.status).send(response);
//      }
//    }
//    else{
//         response.status = 500;
//         return res.status(response.status).send(err);
//   }
//  })  
// })






module.exports = router;


