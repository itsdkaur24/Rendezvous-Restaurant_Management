const express = require('express');
const connection = require('../connection');
const router = express.Router();
require('dotenv').config();
 
 
router.get('/customers',async(req,res,next)=>{
  //console.log("profile "+req.session.user.email);
    query="select * from user where role='user'";
    
    connection.query(query,(err,results)=>{
    if(!err){
      console.log(results);
      res.render('customers.html',{customers:results});
    }
    else{
      console.log(err);
      window.alert("Error");
    }
 
  })
})



router.get('/catering_dash',async(req,res,next)=>{
    //console.log("profile "+req.session.user.email);
      query="select * from catering ";
      connection.query(query,(err,results)=>{
      if(!err){
        console.log(results);
        results.forEach(i => {
          console.log(new Date(i.date) > new Date().setDate(new Date().getDate() + 2));
          if(new Date(i.date) < new Date() ){
            i.status="completed";
          }
          else{
            i.status="ongoing";
            // var dif= Math.abs(new Date(i.date)-new Date());
            // var d = dif/(1000 * 3600 * 24)
            // console.log(d);
            // i.days=d;
          } 
          if(i.cancel=="yes"){
            i.status="cancelled";
          }
          // if (new Date(i.date) > new Date().setDate(new Date().getDate() + 2)) {
          //   i.status = "yes cancel";
          // } 
          
        });
        res.render('catering_dash.html',{catering_dash:results});
      }
      else{
        console.log(err);
        window.alert("Error"); 
      }
  
    })  
  })

  router.get('/tablereserve',async(req,res,next)=>{
    //console.log("profile "+req.session.user.email);
      query="select * from reserve ";
      connection.query(query,(err,results)=>{
      if(!err){
        console.log(results);
        res.render('tablereserve.html',{tablereserve:results});
      }
      else{ 
        console.log(err);
        window.alert("Error");
      }
  
    }) 
  })

//   router.get('/OrderReport',async(req,res,next)=>{
//     req.session.user = "";
//     res.redirect('/OrderReport');
// })

// app.get('/OrderReport',async(req,res,next)=>{
//   if(req.session.user != undefined){ 
//       res.redirect('/user/OrderReport');
//   }
//   else{
//       res.redirect('/login');
//   }
// })

  router.get('/feedback_dash',async(req,res,next)=>{
    //console.log("profile "+req.session.user.email);
      query="select * from feedback ";
      connection.query(query,(err,results)=>{
      if(!err){
        console.log(results);
        res.render('feedback_dash.html',{feedback_dash:results});
      }
      else{
        console.log(err);
        window.alert("Error");
      }
    
    })
  })

 
  


 

  router.get('/OrderReport',async(req,res,next)=>{
    //console.log("profile "+req.session.user.email);
      query="select * from catering where cancel='no'";
      connection.query(query,(err,results1)=>{
      if(!err){
        console.log(results1);
        query="SELECT 'TotalOrders' AS TableName, COUNT(*) AS Count FROM catering WHERE cancel = 'no' UNION ALL SELECT 'CancelledOrders' AS TableName, COUNT(*) AS Count FROM catering  WHERE cancel = 'yes' ";
        connection.query(query,(err,results2)=>{
        if(!err){
          console.log(results2);
          query="SELECT SUM(totalprice ) AS totalprice FROM catering where cancel='no'";
          connection.query(query,(err,results3)=>{
          if(!err){
            console.log(results3);
            res.render('OrderReport.html',{OrderReport:results1,details:results2,revenue:results3});
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
        }
    
      })  
      }
      else{
        console.log(err);
        window.alert("Error");
      }
  
    })
  })


  router.get('/TableReport',async(req,res,next)=>{
    //console.log("profile "+req.session.user.email);
      query="select * from reserve ";
      connection.query(query,(err,results1)=>{
      if(!err){
        console.log(results1);
        query="SELECT 'Total' AS TableName, COUNT(*) AS Count FROM reserve where cancel='no' UNION ALL SELECT 'CancelledReservatiions' AS TableName, COUNT(*) AS Count FROM reserve  WHERE cancel = 'yes'";
        connection.query(query,(err,results2)=>{
        if(!err){
          console.log(results2);
          res.render('TableReport.html',{TableReport:results1,details:results2});
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
      }
  
    })
  })

  router.get('/CustReport',async(req,res,next)=>{
    //console.log("profile "+req.session.user.email);
      query="select * from user where role='user' ";
      connection.query(query,(err,results1)=>{
      if(!err){
        console.log(results1);
        query="SELECT 'Total' AS TableName, COUNT(*) AS Count FROM user where role='user'";
        connection.query(query,(err,results2)=>{
        if(!err){
          console.log(results2);
          res.render('CustReport.html',{CustReport:results1,details:results2});
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
      }
  
    })
  })

  router.get('/FeedReport',async(req,res,next)=>{
    //console.log("profile "+req.session.user.email);
      query="select * from feedback ";
      connection.query(query,(err,results1)=>{
      if(!err){
        console.log(results1);
        query="SELECT 'Total' AS TableName, COUNT(*) AS Count FROM feedback ";
        connection.query(query,(err,results2)=>{
        if(!err){
          console.log(results2);
          res.render('FeedReport.html',{FeedReport:results1,details:results2});
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
      }
  
    })
  })





router.get('/logout', async(req, res,next)=> {
    req.session.user = "";
    res.redirect('/login');
})


router.get('/feedback_dash',async(req,res,next)=>{
  //console.log("profile "+req.session.user.email);
    query="select * from feedback ";
    connection.query(query,(err,results)=>{
    if(!err){
      console.log(results);
      res.render('feedback_dash.html',{feedback_dash:results});
    }
    else{
      console.log(err);
      window.alert("Error");
    }
  
  })
})

//  router.get('/Catering_Event',async(req,res,next)=>{
//   //console.log("profile "+req.session.user.email);
//     query="select * from addevent ";
    
//     connection.query(query,(err,results)=>{
//     if(!err){
//       console.log(results);
//       res.render('Catering_Event.html',{Catering_Event:results});
//     }
//     else{
//       console.log(err);
//       window.alert("Error");
//     }
 
//   })
// })



// router.post('/addEvent',async(req,res,next)=>{
//   var admin =req.body;
//   var response={};
//   query="insert into addevent( eventname,image,veg1,veg2,veg3,veg4,veg5,veg6,nonveg1,nonveg2,nonveg2,nonveg3,nonveg4,nonveg5,nonveg6) values(?,?,?,?,?,?,?,?,?,?,?,?)";
//   connection.query(query,[admin.name, admin.image, admin.veg1,admin.veg2,admin.veg3,admin.veg4,admin.veg5,admin.veg6,admin.nonveg1,admin.nonveg2,admin.nonveg3,admin.nonveg4,admin.nonveg5,admin.nonveg6],(err,results)=>{
//     if(!err){
//       response.status = 201;
//       response.msg = "Added Successfully"
//       return res.status(response.status).send(response);
//     }
//     else{
//       response.status = 500;
//       return res.status(response.status).send(err);
//     } 
//   })
// })  

// router.post('/addEvent',async(req,res,next)=>{
//   const user =req.body;
//   var response={};
//   query="insert into addevent(eventname,image,image2,charges,veg1,veg2,veg3,veg4,veg5,veg6,nonveg1,nonveg2,nonveg3,nonveg4,nonveg5,nonveg6) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
//   connection.query(query,[user.name, user.image,user.image2,user.charges,user.veg1, user.veg2, user.veg3 ,user.veg4,user.veg5,user.veg6,user.nonveg1,user.nonveg2,user.nonveg3,user.nonveg4,user.nonveg5,user.nonveg6],(err,results)=>{
//     if(!err){
//       response.status = 201;
//       response.msg = "Event Added Succesfull";
//       return res.status(response.status).send(response);
//     }
//     else{
//       response.status = 500;
//       return res.status(response.status).send(err);
//     }
//   })
// })

router.post('/saveEdit',async(req,res,next)=>{
  var admin =req.body;
  var response={};
  query="update reserve set date=?, time=?, guests= ? where id=?";
  connection.query(query,[admin.date, admin.time, admin.guests,admin.id],(err,results)=>{
    if(!err){
      response.status = 201;
      response.msg = "Edited Successfully"
      return res.status(response.status).send(response);
    }
    else{
      response.status = 500;
      return res.status(response.status).send(err);
    }
  })
}) 


router.post('/saveEditCater',async(req,res,next)=>{
  var admin =req.body;
  var response={};
  query="update catering set date=?, time=?, food=? where id=?";
  connection.query(query,[admin.date, admin.time,  admin.food, admin.id],(err,results)=>{
    if(!err){
      response.status = 201;
      response.msg = "Edited Successfully"
      return res.status(response.status).send(response);
    }
    else{
      response.status = 500;
      return res.status(response.status).send(err);
    }
  })
})

router.post('/saveDelete',async(req,res,next)=>{
  var admin =req.body;
  var response={};
  query="delete from reserve where id=?";
  connection.query(query,[admin.id],(err,results)=>{
    if(!err){
      response.status = 201;
      response.msg = "Deleted Successfully"
      return res.status(response.status).send(response);
    }
    else{
      response.status = 500;
      return res.status(response.status).send(err);
    }
  })
})

router.post('/saveDeleteCater',async(req,res,next)=>{
  var admin =req.body;
  var response={};
  query="delete from catering where id=?";
  connection.query(query,[admin.id],(err,results)=>{
    if(!err){
      response.status = 201;
      response.msg = "Deleted Successfully"
      return res.status(response.status).send(response);
    }
    else{
      response.status = 500;
      return res.status(response.status).send(err);
    }
  })
})

router.post('/saveDeleteFeedback',async(req,res,next)=>{
  var admin =req.body;
  console.log("***");
  console.log(admin);
  var response={};
  query="delete from feedback where id=?";
  connection.query(query,[admin.id],(err,results)=>{
    if(!err){
      response.status = 201;
      response.msg = "Deleted Successfully"
      return res.status(response.status).send(response);
    }
    else{
      response.status = 500;
      return res.status(response.status).send(err);
    }
  })
})
 
router.post('/saveDeleteCust',async(req,res,next)=>{
  var admin =req.body;
  var response={};
  query="delete from user where id=?";
  connection.query(query,[admin.id],(err,results)=>{
    if(!err){
      response.status = 201;
      response.msg = "Deleted Successfully"
      return res.status(response.status).send(response);
    }
    else{
      response.status = 500;
      return res.status(response.status).send(err);
    }
  })
})






 
module.exports = router;
