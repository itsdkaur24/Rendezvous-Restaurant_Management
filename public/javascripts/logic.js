async function login(){login
   var email =  document.getElementById('email').value;
   var password = document.getElementById('password').value;
   if(!email || !password){
      window.alert("Please fill out all the fields before you submit")
   }
   else{
   let resp = await fetch('/user/login', { 
      method: "POST",
      headers: {
         'Accept': 'application/json',
         'Content-Type': 'application/json'
      },
      body: JSON.stringify({  
         "email": email,
         "password": password
      })
   });
   //console.log(resp);
   let respJson = await resp.json();
   console.log("****************************"+respJson.session);
   if(respJson.status == 201){
      console.log("You are now logged in!");
      if(respJson.msg.role === 'admin'){
         location.href = '/dashboard';
      } else {
         location.href = '/';
      }
   }
   else if(respJson.status == 401){
      window.alert(respJson.msg);
   }
   else{
      window.alert(respJson.msg);
   }
 }
}


//register button onclick

async function register(){
   var num=Math.floor(Math.random()*90000+10000);
   var name =  document.getElementById('name').value;
   var email = document.getElementById('email').value;
   var password = document.getElementById('pass').value;
   var cpassword = document.getElementById('cpass').value;
   var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
   if(!name || !email || !password || !cpassword){
      window.alert("Plese fill out all the feilds before you submit")
   }
   else if(!emailRegex.test(email)) {
      window.alert("Please enter a valid email address")
   }
   else if(password.length < 5) {
      window.alert("Password must be at least 5 characters long")
   }
   else{
   if(password==cpassword){
      let resp = await fetch('/user/signup', {
         method: "POST",
         headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
         },
         body: JSON.stringify({
            "num": num,
            "name":name,
            "email": email,
            "password": password,
         })

      });

      //console.log(resp);
      let respJson = await resp.json();
      console.log(respJson);
      if(respJson.status == 201){
         console.log("You have successfuly registered!");
         window.alert(respJson.msg);
         location.href = '/login';
      }
      else if(respJson.status == 400){
         window.alert(respJson.msg);
      }
      else{
         window.alert(respJson.msg);
      }

   }
   else
   {
      window.alert("Passwords dont match")
   }
 }
}

//feedback button onclick


async function feedback(){
   var name =  document.getElementById('Name').value;
   var email = document.getElementById('Email').value;
   var rating = document.getElementById('rating').value;
   var message = document.getElementById('comments').value;
   var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
   if(!name || !email || !rating || !comments){
      window.alert("Plese fill out all the feilds before you submit")
   }
   else if(!emailRegex.test(email)) {
      window.alert("Please enter a valid email address")
   }
   else{
   let resp = await fetch('/user/feedback', {
      method: "POST",
      headers: {
         'Accept': 'application/json',
         'Content-Type': 'application/json'
      },
      body: JSON.stringify({
         "name":name,
         "email": email,
         "rating":rating,
         "message":message,
      })

   });
   //console.log(resp);
   let respJson = await resp.json();
   console.log(respJson);
   if(respJson.status == 201){
      console.log("You have inserted successfuly!");
      window.alert(respJson.msg);
      window.location.reload();
   }
   else{
      window.alert(respJson.msg);
   }
 }
}

// async function contact(){
//    var name =  document.getElementById('Name').value;
//    var email = document.getElementById('Email').value;
//    var phone = document.getElementById('Phoneno').value;
//    var message = document.getElementById('comments').value;
//    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

//    if(!name || !email || !phone || !message){
//       window.alert("Plese fill out all the feilds before you submit")
//    }
//    else if(!emailRegex.test(email)) {
//       window.alert("Please enter a valid email address")
//    }
//    else if(phone.length !== 10) {
//       window.alert("Please enter a 10 digit phone number")
//    }
//    else{
//    let resp = await fetch('/user/contactus', {
//       method: "POST",
//       headers: {
//          'Accept': 'application/json',
//          'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({
//          "name":name,
//          "email": email,
//          "phone":phone,
//          "message":message,
//       })

//    });

   //console.log(resp);
//    let respJson = await resp.json();
//    console.log(respJson);
//    if(respJson.status == 201){
//       console.log("You have contacted successfuly!");
//       window.alert(respJson.msg);
//       window.location.reload();
//    }
//    else{
//       window.alert(respJson.msg);
//    }
//    }
// }


async function reserve() {
   var num = Math.floor(Math.random() * 90000 + 10000);
   var name = document.getElementById('Name').value;
   var email = document.getElementById('Email').value;
   var phone = document.getElementById('Phone').value;
   var date = document.getElementById('Date').value;
   var time = document.getElementById('Time').value;
   var guests = document.getElementById('Guests').value;

   // Date validation
   var currentDate = new Date().toISOString().slice(0,10);
   // Date validation
var currentDate = new Date();
currentDate.setDate(currentDate.getDate() + 2); // Set the minimum date to two days from today
var minDateString = currentDate.toISOString().slice(0,10);

if (date < minDateString) {
  window.alert("Please select a date at least 2 days from today.");
  return;
}


   // Range validation 
   var maxDate = new Date();
   maxDate.setDate(maxDate.getDate() + 15); // Set the maximum date to one week from today
   var maxDateString = maxDate.toISOString().slice(0,10);
   if (date > maxDateString) {
      window.alert("Please select a date within the next 15 days.");
      return;
   }

   var selectedTime = new Date('1970-01-01T' + time + 'Z');
   var lowerTime = new Date('1970-01-01T10:00:00Z'); // Set the lower limit to 10:00 am
   var upperTime = new Date('1970-01-02T03:00:00Z'); // Set the upper limit to 11:00 pm (which is actually 3:00 am of the next day)
   if (selectedTime < lowerTime || selectedTime > upperTime) {
      window.alert("Please select a time between 10:00 am and 11:00 pm.");
      return;
   }

   if (!name || !email || !phone || !date || !time || !guests) {
      window.alert("Please fill out all fields.");
      return;
   }
   else if(phone.length !== 10) {
      window.alert("Please enter a 10 digit phone number");
      return;
   }
   else if (guests < 1 || guests > 10) {
      window.alert("Number of guests should be between 1 to 10.");
   }
   else{
   let resp = await fetch('/user/reservation', {
      method: "POST",
      headers: {
         'Accept': 'application/json',
         'Content-Type': 'application/json'
      },
      body: JSON.stringify({
         "num":num,
         "name":name,
         "email": email,
         "phone":phone,
         "date":date,
         "time":time,
         "guests":guests,
      })
   });

   let respJson = await resp.json();
   console.log(respJson);
   if(respJson.status == 201){
      console.log("Reserved successfully!");
      window.alert(respJson.msg);
      window.location.reload();
   }
   else{
      window.alert(respJson.msg);
   }
}
}

// const filepicker = document.getElementById("filepicker");
// filepicker.addEventListener("change", (event) => {
//   const files = event.target.files;
//   output.textContent = "";
// });


// async function addEvent(){
//    var
//    if(){

//    }
//    else{
//       let resp = await fetch('/admin/addEvent', {
//         method: "POST",
//         headers: {
//            'Accept': 'application/json',
//            'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//               "id":id,
//               "date":date,
//               "time":time,
//               "guests":guests,
//          })
//      });
//      let respJson = await resp.json();
//      console.log(respJson);
//      console.log(date+ time+ guests);
//       if(respJson.status == 201){
//          console.log("You have Added Successfuly!");
//          window.alert(respJson.msg);
//          window.location.reload();
//       }
//       else{
//          window.alert(respJson.msg);
//       }
//   }
//   }


// async function addEvent() {
//    var name = document.getElementById('eventname').value;
//    var fullPath = document.getElementById('eventpicture').value;
//    var filename = fullPath.replace(/^.*[\\\/]/, '');
//    var fullPath2 = document.getElementById('eventpicture2').value;
//    var filename2 = fullPath2.replace(/^.*[\\\/]/, '');
//    var image = filename;
//    var image2 = filename2;
//    var charges=document.getElementById('eventcharges').value;
//    var veg1 = document.getElementById('veg-1').value;
//    var veg2  = document.getElementById('veg-2').value;
//    var veg3  = document.getElementById('veg-3').value;
//    var veg4  = document.getElementById('veg-4').value;
//    var veg5  = document.getElementById('veg-5').value;
//    var veg6  = document.getElementById('veg-6').value;
//    var nonveg1 = document.getElementById('nonveg-1').value;
//    var nonveg2  = document.getElementById('nonveg-1').value;
//    var nonveg3  = document.getElementById('nonveg-1').value;
//    var nonveg4  = document.getElementById('nonveg-1').value;
//    var nonveg5  = document.getElementById('nonveg-1').value;
//    var nonveg6  = document.getElementById('nonveg-1').value;
//    let resp = await fetch('/admin/addEvent', {
//       method: "POST",
//       headers: {
//          'Accept': 'application/json',
//          'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({
//          "name":name,
//          "image":image,
//          "image2":image2,
//          "charges":charges,
//          "veg1": veg1,
//          "veg2":veg2,
//          "veg3":veg3,
//          "veg4":veg4,
//          "veg5":veg5,
//          "veg6":veg6,
//          "nonveg1":nonveg1,
//          "nonveg2":nonveg2,
//          "nonveg3":nonveg3,
//          "nonveg4":nonveg4,
//          "nonveg5":nonveg5,
//          "nonveg6":nonveg6,
//       })
//    });

//    let respJson = await resp.json();
//    console.log(respJson);
//    if(respJson.status == 201){
//       console.log("Event Added successfully!");
//       window.alert(respJson.msg);
//       window.location.reload();
//    }
//    else{
//       window.alert(respJson.msg);
//    }
// }






//    let resp = await fetch('/user/catering', {
//       method: "POST",
//       headers: {
//          'Accept': 'application/json',
//          'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({
//          "num":num,
//          "name":name,
//          "email":email,
//          "date":date,
//          "time":time,
//          "guests":guests,
//          "food":food,
//          "event":event,
//          "price":price,
//       })

//    });
//    //console.log(resp);
//    let respJson = await resp.json();
//    console.log(respJson);
//    if(respJson.status == 201){
//       console.log("Catering Booked Successfully!");
//       window.alert(respJson.msg);
//       window.location.reload();
//    }
//    else{
//       window.alert(respJson.msg);
//    }
//   }



async function forgotpassword(){
   var email =  document.getElementById('email').value;
   let resp = await fetch('/user/forgotpassword', {
      method: "POST",
      headers: {
         'Accept': 'application/json',
         'Content-Type': 'application/json'
      },
      body: JSON.stringify({
         "email":email
      })
   });
   //console.log(resp);
   let respJson = await resp.json();
   console.log(respJson);
   if(respJson.status == 200){
      console.log("Email Sent Successfully!");
      window.alert(respJson.msg);
      window.location.reload();
   }
   else{
      window.alert(respJson.msg);
   }
 }

 async function cancel(orderid){
   var orderID = orderid;
   let resp = await fetch('/user/cancel', {
      method: "POST",
      headers: {
         'Accept': 'application/json',
         'Content-Type': 'application/json'
      },
      body: JSON.stringify({
         "orderId":orderID
      })
   }); 
   //console.log(resp);
   let respJson = await resp.json();
   console.log(respJson);
   if(respJson.status == 201){
      console.log("Order Cancelled!");
      window.alert(respJson.msg);
      window.location.reload();
   }
   else{
      window.alert(respJson.msg);
   }
 }

 async function canceltable(tableid){
   var tableID = tableid;
   let resp = await fetch('/user/canceltable', {
      method: "POST",
      headers: {
         'Accept': 'application/json',
         'Content-Type': 'application/json'
      },
      body: JSON.stringify({
         "tableId":tableID
      })
   });
   //console.log(resp);
   let respJson = await resp.json();
   console.log(respJson);
   if(respJson.status == 201){
      console.log("Reservation Cancelled!");
      window.alert(respJson.msg);
      window.location.reload();
   }
   else{
      window.alert(respJson.msg);
   }
 }




 async function profile_update(){
   var name =  document.getElementById('name').value;
   var email = document.getElementById('email').value;
   var phone = document.getElementById('phone').value;
   var address = document.getElementById('address').value;
   let phoneRegex = /^\d{10}$/; // matches exactly 10 digits
   if(!name || !email || !phone || !address){
      window.alert("Plese fill out all the feilds before you submit")
   }
   else if(!phoneRegex.test(phone)) {
      window.alert("Please enter a valid 10-digit phone number")
   }
   else{ 
   let resp = await fetch('/user/profile-update', {
      method: "POST",
      headers: {
         'Accept': 'application/json',
         'Content-Type': 'application/json'
      },
      body: JSON.stringify({
         "name":name,
         "email": email,
         "phone":phone,
         "address":address,
      })

   });
   //console.log(resp);
   let respJson = await resp.json();
   console.log(respJson);
   if(respJson.status == 201){
      console.log("You have Updated successfuly!");
      window.alert(respJson.msg);
      window.location.reload();
   }
   else{
      window.alert(respJson.msg);
   }
   }
}

   async function invoice(OrdID){
      var orderId=OrdID;

         //console.log(resp);
      let resp = await fetch(`/user/invoice?orderId=${orderId}`, {
         method: "GET",
         headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
         }

      });

      let respJson = await resp.json();
      console.log(respJson);

    }



async function profile(){
   let resp = await fetch('/user/profile', {
      method: "GET",
      headers: {
         'Accept': 'application/json',
         'Content-Type': 'application/json'
      },
   });
   let respJson = await resp.json();
   console.log(respJson);
   document.getElementById('photo').src = "./img/"+ respJson.msg.image ;
   document.getElementById('name').value =  respJson.msg.name ;
   document.getElementById('email').value = respJson.msg.email;
   document.getElementById('phone').value =  respJson.msg.phone ;
   document.getElementById('address').value =  respJson.msg.address ;



      //console.log(resp);

}




 async function changePassword(){
    var opass =document.getElementById('opassword').value;
   var npass = document.getElementById('npassword').value;
   var cpass =document.getElementById('cpassword').value;
   if(npass!=cpass){
      window.alert("Your passwords dont match.")
   }
   else if(!opass || !npass || !cpass ){
      window.alert("Plese fill out all the feilds before you submit")
   }
   else if(npass.length < 5 ) {
      window.alert("Your new password must have at least 5 characters")
   }
   else{
   let resp = await fetch('/user/change_password', {
      method: "POST",
      headers: {
         'Accept': 'application/json',
         'Content-Type': 'application/json'
      },
      body: JSON.stringify({
         "opass":opass,
         "npass":npass

      })

   });
   console.log(resp);
   let respJson = await resp.json();
   console.log(respJson);
   if(respJson.status == 201){
      console.log("You have Updated successfuly!");
      window.alert(respJson.msg);
      window.location.reload();
   }
   else{
      window.alert(respJson.msg);
   }
   }
}


// async function orders(){
//    let resp = await fetch('/user/orders', {
//       method: "GET",
//       headers: {
//          'Accept': 'application/json',
//          'Content-Type': 'application/json'
//       },
//    });
//    let respJson = await resp.json();
//    console.log(respJson);

// }

// async function userReservation(){
//    let resp = await fetch('/user/userReservation', {
//       method: "GET",
//       headers: {
//          'Accept': 'application/json',
//          'Content-Type': 'application/json'
//       },
//    });
//    let respJson = await resp.json();
//    console.log(respJson);

// }


function editDialog(Id,Date,Time,Guests){
   $('#myModal1').modal('show');
   var id=Id;
   var date=Date;
   var time=Time;
   var guests=Guests;
   document.getElementById("editId").innerHTML=id;
   document.getElementById('editDate').value=date;
   document.getElementById('editTime').value=time;
   document.getElementById('editGuests').value=guests;
}

function editDialogCater(Id,Date,Time,Guests,Food){
   $('#myModal1').modal('show');
   var id=Id;
   var date=Date;
   var time=Time;
   var guests=Guests;
   var food=Food;
   document.getElementById("CaterId").innerHTML=id;
   document.getElementById('CaterDate').value=date;
   document.getElementById('CaterTime').value=time;
   document.getElementById('CaterGuests').value=guests;
   document.getElementById('CaterFood').value=food;
}





async function saveEdit(){
    var id= document.getElementById('editId').innerHTML
    var date= document.getElementById('editDate').value;
    var time= document.getElementById('editTime').value;
    var guests= document.getElementById('editGuests').value;
    // Date validation
    var currentDate = new Date().toISOString().slice(0,10);
    if (date < currentDate) {
       window.alert("Please select a date in the future.");
       return;
    }

    // Range validation
    var maxDate = new Date();
    maxDate.setDate(maxDate.getDate() + 15); // Set the maximum date to one week from today
    var maxDateString = maxDate.toISOString().slice(0,10);
    if (date > maxDateString) {
       window.alert("Please select a date within the next 15 days.");
       return;
    }

    else if (guests < 1 || guests > 10) {
      window.alert("Number of guests should be between 1 to 10.");
   }
   else{
    let resp = await fetch('/admin/saveEdit', {
      method: "POST",
      headers: {
         'Accept': 'application/json',
         'Content-Type': 'application/json'
      },
      body: JSON.stringify({
            "id":id,
            "date":date,
            "time":time,
            "guests":guests,
       })
   });
   let respJson = await resp.json();
   console.log(respJson);
   console.log(date+ time+ guests);
    if(respJson.status == 201){
       console.log("You have Edited successfuly!");
       window.alert(respJson.msg);
       window.location.reload();
    } 
    else{
       window.alert(respJson.msg);
    }
}
}

async function saveEditCater() {
   var id = document.getElementById('CaterId').innerHTML;
   var date = document.getElementById('CaterDate').value;
   var time = document.getElementById('CaterTime').value;
   var food = document.getElementById('CaterFood').value;
 
   // Check if any field is empty
   if (!id || !date || !time || !food) {
     window.alert("Please fill in all the fields.");
     return;
   }
 
   // Date validation
   var currentDate = new Date().toISOString().slice(0, 10);
   if (date < currentDate) {
     window.alert("Please select a date in the future.");
     return;
   }
 
   // Range validation
   var maxDate = new Date();
   maxDate.setDate(maxDate.getDate() + 20); // Set the maximum date to one week from today
   var maxDateString = maxDate.toISOString().slice(0, 10);
   if (date > maxDateString) {
     window.alert("Please select a date within the next 20 days.");
     return;
   }
 
   else if (guests < 20 || guests > 60) {
     window.alert("Number of guests should be between 20 to 60.");
     return;
   }
 
   let resp = await fetch('/admin/saveEditCater', {
     method: "POST",
     headers: {
       'Accept': 'application/json',
       'Content-Type': 'application/json'
     },
     body: JSON.stringify({
       "id": id,
       "date": date,
       "time": time,
       //   "guests":guests,
       "food": food,
     })
   });
 
   let respJson = await resp.json();
   console.log(respJson);
   console.log(date + time + guests);
 
   if (respJson.status == 201) {
     console.log("You have edited successfully!");
     window.alert(respJson.msg);
     window.location.reload();
   } else {
     window.alert(respJson.msg);
   }
 }
 // uigjgjgj//


function deleteDialog(Id){
   $('#myModal2').modal('show');
   var id=Id;
   document.getElementById("deleteId").innerHTML=id;
}

function deleteDialogCater(Id){
   $('#myModal2').modal('show');
   var id=Id;
   document.getElementById("CaterDeleteId").innerHTML=id;
}

function deleteDialogFeed(Id){
   $('#myModal2').modal('show');
   var id=Id;
   document.getElementById("FeedDeleteId").innerHTML=id;
}


function deleteDialogCust(Id){
   $('#myModal2').modal('show');
   var id=Id;
   document.getElementById("CustDeleteId").innerHTML=id;
}

async function saveDelete(){
   var id= document.getElementById('deleteId').innerHTML
   let resp = await fetch('/admin/saveDelete', {
     method: "POST",
     headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
     },
     body: JSON.stringify({
           "id":id,
      })
  });
  let respJson = await resp.json();
  console.log(respJson);
  console.log(date+ time+ guests);
   if(respJson.status == 201){
      console.log("You have Deleted successfuly!");
      window.alert(respJson.msg);
      window.location.reload();
   }
   else{
      window.alert(respJson.msg);
   }
}

async function saveDeleteCater(){
   var id= document.getElementById('CaterDeleteId').innerHTML
   let resp = await fetch('/admin/saveDeleteCater', {
     method: "POST",
     headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
     },
     body: JSON.stringify({
           "id":id,
      })
  });
  let respJson = await resp.json();
  console.log(respJson);
  console.log(date+ time+ guests);
   if(respJson.status == 201){
      console.log("You have Deleted successfuly!");
      window.alert(respJson.msg);
      window.location.reload();
   }
   else{
      window.alert(respJson.msg);
   }
}

async function saveDeleteFeed(){

   var id= document.getElementById('FeedDeleteId').innerHTML;
   console.log(id);
   let resp = await fetch('/admin/saveDeleteFeedback', {
     method: "POST",
     headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
     },
     body: JSON.stringify({
           "id":id,
      })
  });
  let respJson = await resp.json();
  console.log(respJson);
   if(respJson.status == 201){
      console.log("You have Deleted successfuly!");
      window.alert(respJson.msg);
      window.location.reload();
   }
   else{
      window.alert(respJson.msg);
   } 
}

async function saveDeleteCust(){
   var id= document.getElementById('CustDeleteId').innerHTML
   let resp = await fetch('/admin/saveDeleteCust', {
     method: "POST",
     headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
     },
     body: JSON.stringify({
           "id":id,
      })
  });
  let respJson = await resp.json();
  console.log(respJson);
   if(respJson.status == 201){
      console.log("You have Deleted successfuly!");
      window.alert(respJson.msg);
      window.location.reload();
   }
   else{
      window.alert(respJson.msg);
   }
}


var numCatering;
var nameCatering;
var emailCatering;
var dateCatering;
var timeCatering;
var guestsCatering;
var foodCatering;
var eventCatering;
var itemCatering;
var taxCatering;
var totalCatering;
var imageCatering;



 async function proceed(){
    nameCatering =  document.getElementById('Namebday').value;
    emailCatering =  document.getElementById('Emailbday').value;
    dateCatering = document.getElementById('Datebday').value;
    timeCatering = document.getElementById('Timebday').value;
    guestsCatering = document.getElementById('Guestsbday').value;
    foodCatering = document.getElementById('Foodbday').value;
    eventCatering=document.getElementById('eventName').innerHTML;
    console.log(foodCatering,guestsCatering,timeCatering);
    var today = new Date();
      var selectedDate = new Date(dateCatering);
      var diffInDays = (selectedDate - today) / (1000 * 60 * 60 * 24);
      var today = new Date();
      var selectedDate = new Date(dateCatering);
      var diffInDays = (selectedDate - today) / (1000 * 60 * 60 * 24);
      var selectedTime = new Date("2000-01-01 " + timeCatering);
      var startTime = new Date("2000-01-01 10:00:00");
      var endTime = new Date("2000-01-01 23:00:00");
      if(guestsCatering>=20 && guestsCatering<=30){
      itemCatering= "2090";
      taxCatering= "209";
      totalCatering= "2299";

      }
      else if(guestsCatering>30 && guestsCatering<=40){
         itemCatering= "3090";
         taxCatering= "309";
         totalCatering= "3299";
      }
      else if(guestsCatering>40 && guestsCatering<=50){
         itemCatering= "4090";
         taxCatering= "409";
         totalCatering= "4299";
      }
      else if(guestsCatering>50 && guestsCatering<=60){
         itemCatering= "5090";
         taxCatering= "509";
         totalCatering= "5299";

      }
      else{
         window.alert('enter valid number of guests');
      }
      if (!dateCatering||!timeCatering||!guestsCatering||!foodCatering) {
         window.alert("Please fill out all fields.");
      }
      else if (diffInDays <2 || diffInDays > 20) { // check if selected date is in the future and not more than 20 days in the future
         window.alert("Please select a date at least 2 days after the current date and within the next 20 days.");
      }
      else if (guestsCatering < 20 || guestsCatering > 60) { // check if number of guests is between 20 and 60
         window.alert("Please select a number of guests between 20 and 60.");
      }
      else if (selectedTime < startTime || selectedTime > endTime) {
         window.alert("Please select a time between 10 am and 11 pm.");
      }
      else{
      $('#myModalproceed1').modal('show');
      document.getElementById('ItemPrice').innerHTML= itemCatering;
      document.getElementById('Tax').innerHTML= taxCatering;
      document.getElementById('TotalPrice').innerHTML= totalCatering;
      }

 }




async function Pay(){

   // numCatering=Math.floor(Math.random()*90000+10000);
   numCatering=Math.floor(Math.random()*90000+10000);
   if(eventCatering=='Birthday Party'){
      imageCatering='bday.jpg';
   }
   else if(eventCatering=='Family Get-Togethers'){
      imageCatering='family-together.jpg';
   }
   else if(eventCatering=='Farewells and Reunions'){
      imageCatering='friends.jpg';
   }
   else{
      imageCatering='baby shower.jpg';
   }
   // if(guestsCatering>=20 && guestsCatering<=30){
   //    document.getElementsById('ItemPrice').label= "₹2,090";
   //    document.getElementsById('Tax').label= "₹209";
   //    document.getElementsById('TotalPrice').label= "₹2,299";
   //    priceCatering=document.getElementById('TotalPrice').innerHTML;
   // }
   // else if(guestsCatering>30 && guestsCatering<=40){
   //    document.getElementsById('ItemPrice').label= "₹3,090";
   //    document.getElementsById('Tax').label= "₹309";
   //    document.getElementsById('TotalPrice').label= "₹3399";
   //    priceCatering=document.getElementById('TotalPrice').innerHTML;
   //  }
   // else if(guestsCatering>40 && guestsCatering<=50){
   //    document.getElementsById('ItemPrice').label= "₹4090";
   //    document.getElementsById('Tax').label= "₹409";
   //    document.getElementsById('TotalPrice').label= "₹4499";
   // }
   // else if(guestsCatering>50 && guestsCatering<=60){
   //    document.getElementsById('ItemPrice').label= "₹5090";
   //    document.getElementsById('Tax').label= "₹509";
   //    document.getElementsById('TotalPrice').label= "₹5599";

   // }
   // else{
   //    window.alert('enter valid number of guests');
   // }
   itemCatering=document.getElementById('ItemPrice').innerHTML;
   taxCatering=document.getElementById('Tax').innerHTML;
   totalCatering=document.getElementById('TotalPrice').innerHTML;
   let resp = await fetch('/user/Pay', {
      method: "POST",
      headers: {
         'Accept': 'application/json',
         'Content-Type': 'application/json'
      },
      body: JSON.stringify({
         "num":numCatering,
         // "image":image,
         "name":nameCatering,
         "email": emailCatering,
         "date":dateCatering,
         "time":timeCatering,
         "guests":guestsCatering,
         "food":foodCatering,
         "event":eventCatering,
         "item":itemCatering,
         "tax":taxCatering,
         "total":totalCatering,
         "image":imageCatering,
      })

   });
   //console.log(resp);
   let respJson = await resp.json();
   console.log(respJson);
   if(respJson.status == 201){
      console.log("You have Booked Successfuly!");
      window.alert(respJson.msg);
      window.location.reload();
   }
   else{
      window.alert(respJson.msg);
   }
   }





   async function proceed2(){
      nameCatering =  document.getElementById('Namefmly').value;
      emailCatering =  document.getElementById('Emailfmly').value;
      dateCatering = document.getElementById('Datefmly').value;
      timeCatering = document.getElementById('Timefmly').value;
      guestsCatering = document.getElementById('Guestsfmly').value;
      foodCatering = document.getElementById('Foodfmly').value;
      eventCatering=document.getElementById('eventfmly').innerHTML;
      console.log(foodCatering,guestsCatering,timeCatering);
      var today = new Date();
      var selectedDate = new Date(dateCatering);
      var diffInDays = (selectedDate - today) / (1000 * 60 * 60 * 24);
      var selectedTime = new Date("2000-01-01 " + timeCatering);
      var startTime = new Date("2000-01-01 10:00:00");
      var endTime = new Date("2000-01-01 23:00:00");
      if(guestsCatering>=20 && guestsCatering<=30){
         itemCatering= "3239";
         taxCatering= "323.9";
         totalCatering= "3562.9";

         }
         else if(guestsCatering>30 && guestsCatering<=40){
            itemCatering= "4239";
            taxCatering= "423.9";
            totalCatering= "4662.9";
         }
         else if(guestsCatering>40 && guestsCatering<=50){
            itemCatering= "5239";
            taxCatering= "523.9";
            totalCatering= "5762.9";
         }
         else if(guestsCatering>50 && guestsCatering<=60){
            itemCatering= "6239";
            taxCatering= "623.9";
            totalCatering= "6862.9";

         }
         else{
            window.alert('enter valid number of guests');
         }
    if (!dateCatering||!timeCatering||!guestsCatering||!foodCatering) {
      window.alert("Please fill out all fields.");
    }
    else if (diffInDays < 2 || diffInDays > 20) { // check if selected date is in the future and not more than 20 days in the future
      window.alert("Please select a date at least 2 days after the current date and within the next 20 days.");
    }
    else if (selectedTime < startTime || selectedTime > endTime) {
      window.alert("Please select a time between 10 am and 11 pm.");
    }
    else if (guestsCatering < 20 || guestsCatering > 60) { // check if number of guests is between 20 and 60
       window.alert("Please select a number of guests between 20 and 60.");
    }
    else{
    $('#myModalproceed2').modal('show');
    document.getElementById('ItemPrice2').innerHTML= itemCatering;
    document.getElementById('Tax2').innerHTML= taxCatering;
    document.getElementById('TotalPrice2').innerHTML= totalCatering;
    }

   }


async function Pay2(){

   numCatering=Math.floor(Math.random()*90000+10000);

   if(eventCatering=='Birthday Party'){
      imageCatering='bday.jpg';
   }
   else if(eventCatering=='Family Get-Togethers'){
      imageCatering='family-together.jpg';
   }
   else if(eventCatering=='Farewells and Reunions'){
      imageCatering='friends.jpg';
   }
   else{
      imageCatering='baby shower.jpg';
   }
   itemCatering=document.getElementById('ItemPrice2').innerHTML;
   taxCatering=document.getElementById('Tax2').innerHTML;
   totalCatering=document.getElementById('TotalPrice2').innerHTML;
   let resp = await fetch('/user/Pay', {
      method: "POST",
      headers: {
         'Accept': 'application/json',
         'Content-Type': 'application/json'
      },
      body: JSON.stringify({
         "num":numCatering,
         // "image":image,
         "name":nameCatering,
         "email": emailCatering,
         "date":dateCatering,
         "time":timeCatering,
         "guests":guestsCatering,
         "food":foodCatering,
         "event":eventCatering,
         "item":itemCatering,
         "tax":taxCatering,
         "total":totalCatering,
         "image":imageCatering,
      })

   });
   //console.log(resp);
   let respJson = await resp.json();
   console.log(respJson);
   if(respJson.status == 201){
      console.log("You have Booked Successfuly!");
      window.alert(respJson.msg);
      window.location.reload();
   }
   else{
      window.alert(respJson.msg);
   }
   }




   async function proceed3(){
      nameCatering =  document.getElementById('Namefrnd').value;
      emailCatering =  document.getElementById('Emailfrnd').value;
      dateCatering = document.getElementById('Datefrnd').value;
      timeCatering = document.getElementById('Timefrnd').value;
      guestsCatering = document.getElementById('Guestsfrnd').value;
      foodCatering = document.getElementById('Foodfrnd').value;
      eventCatering=document.getElementById('eventfrnd').innerHTML;
      console.log(foodCatering,guestsCatering,timeCatering);
      var today = new Date();
      var selectedDate = new Date(dateCatering);
      var diffInDays = (selectedDate - today) / (1000 * 60 * 60 * 24);
      var selectedTime = new Date("2000-01-01 " + timeCatering);
      var startTime = new Date("2000-01-01 10:00:00");
      var endTime = new Date("2000-01-01 23:00:00");
      if(guestsCatering>=20 && guestsCatering<=30){
         itemCatering= "1694.9";
         taxCatering= "169.49";
         totalCatering= "1864.39";

         }
         else if(guestsCatering>30 && guestsCatering<=40){
            itemCatering= "2694.9";
            taxCatering= "269.49";
            totalCatering= "2964.39";
         }
         else if(guestsCatering>40 && guestsCatering<=50){
            itemCatering= "3694.9";
            taxCatering= "369.49";
            totalCatering= "4064.39";
         }
         else if(guestsCatering>50 && guestsCatering<=60){
            itemCatering= "4694.9";
            taxCatering= "469.49";
            totalCatering= "5164.39";

         }
         else{
            window.alert('enter valid number of guests');
         }
     if (!dateCatering||!timeCatering||!guestsCatering||!foodCatering) {
      window.alert("Please fill out all fields.");
    }
    else if (diffInDays < 2 || diffInDays > 20) { // check if selected date is in the future and not more than 20 days in the future
      window.alert("Please select a date at least 2 days after the current date and within the next 20 days.");
    }
    else if (guestsCatering < 20 || guestsCatering > 60) { // check if number of guests is between 20 and 60
       window.alert("Please select a number of guests between 20 and 60.");
    }
    else if (selectedTime < startTime || selectedTime > endTime) {
      window.alert("Please select a time between 10 am and 11 pm.");
    }
     else{
      $('#myModalproceed3').modal('show');
      document.getElementById('ItemPrice3').innerHTML= itemCatering;
    document.getElementById('Tax3').innerHTML= taxCatering;
    document.getElementById('TotalPrice3').innerHTML= totalCatering;
         }

   }


async function Pay3(){

   numCatering=Math.floor(Math.random()*90000+10000);

   if(eventCatering=='Birthday Party'){
      imageCatering='bday.jpg';
   }
   else if(eventCatering=='Family Get-Togethers'){
      imageCatering='family-together.jpg';
   }
   else if(eventCatering=='Farewells and Reunions'){
      imageCatering='friends.jpg';
   }
   else{
      imageCatering='baby shower.jpg';
   }
   itemCatering=document.getElementById('ItemPrice3').innerHTML;
   taxCatering=document.getElementById('Tax3').innerHTML;
   totalCatering=document.getElementById('TotalPrice3').innerHTML;
   let resp = await fetch('/user/Pay', {
      method: "POST",
      headers: {
         'Accept': 'application/json',
         'Content-Type': 'application/json'
      },
      body: JSON.stringify({
         "num":numCatering,
         // "image":image,
         "name":nameCatering,
         "email": emailCatering,
         "date":dateCatering,
         "time":timeCatering,
         "guests":guestsCatering,
         "food":foodCatering,
         "event":eventCatering,
         "item":itemCatering,
         "tax":taxCatering,
         "total":totalCatering,
         "image":imageCatering,
      })

   });
   //console.log(resp);
   let respJson = await resp.json();
   console.log(respJson);
   if(respJson.status == 201){
      console.log("You have Booked Successfuly!");
      window.alert(respJson.msg);
      window.location.reload();
   }
   else{
      window.alert(respJson.msg);
   }
   }





   async function proceed4(){
      nameCatering =  document.getElementById('Namebby').value;
      emailCatering =  document.getElementById('Emailbby').value;
      dateCatering = document.getElementById('Datebby').value;
      timeCatering = document.getElementById('Timebby').value;
      guestsCatering = document.getElementById('Guestsbby').value;
      foodCatering = document.getElementById('Foodbby').value;
      eventCatering=document.getElementById('eventbby').innerHTML;
      console.log(foodCatering,guestsCatering,timeCatering);
      var today = new Date();
      var selectedDate = new Date(dateCatering);
      var diffInDays = (selectedDate - today) / (1000 * 60 * 60 * 24); // number of days between today and selected date
      var selectedTime = new Date("2000-01-01 " + timeCatering);
      var startTime = new Date("2000-01-01 10:00:00");
      var endTime = new Date("2000-01-01 23:00:00");
      if(guestsCatering>=20 && guestsCatering<=30){
         itemCatering= "3796";
         taxCatering= "379.6";
         totalCatering= "4175.6";

         }
         else if(guestsCatering>30 && guestsCatering<=40){
            itemCatering= "4796";
            taxCatering= "479.6";
            totalCatering= "5275.6";
         }
         else if(guestsCatering>40 && guestsCatering<=50){
            itemCatering= "5796";
            taxCatering= "579.6";
            totalCatering= "6375.6";
         }
         else if(guestsCatering>50 && guestsCatering<=60){
            itemCatering= "6796";
            taxCatering= "679.6";
            totalCatering= "7475.6";

         }
         else{
            window.alert('enter valid number of guests');
         }
      if (!dateCatering||!timeCatering||!guestsCatering||!foodCatering) {
        window.alert("Please fill out all fields.");
      }
      else if (diffInDays < 2 || diffInDays > 20) { // check if selected date is in the future and not more than 20 days in the future
         window.alert("Please select a date at least 2 days after the current date and within the next 20 days.");
      }
      else if (guestsCatering < 20 || guestsCatering > 60) { // check if number of guests is between 20 and 60
         window.alert("Please select a number of guests between 20 and 60.");
      }
      else if (selectedTime < startTime || selectedTime > endTime) {
         window.alert("Please select a time between 10 am and 11 pm.");
       }
      else{
      $('#myModalproceed4').modal('show');
      document.getElementById('ItemPrice4').innerHTML= itemCatering;
    document.getElementById('Tax4').innerHTML= taxCatering;
    document.getElementById('TotalPrice4').innerHTML= totalCatering;
      }
   }


async function Pay4(){

   numCatering=Math.floor(Math.random()*90000+10000);

   if(eventCatering=='Birthday Party'){
      imageCatering='bday.jpg';
   }
   else if(eventCatering=='Family Get-Togethers'){
      imageCatering='family-together.jpg';
   }
   else if(eventCatering=='Farewells and Reunions'){
      imageCatering='friends.jpg';
   }
   else{
      imageCatering='baby shower.jpg';
   }
   itemCatering=document.getElementById('ItemPrice4').innerHTML;
   taxCatering=document.getElementById('Tax4').innerHTML;
   totalCatering=document.getElementById('TotalPrice4').innerHTML;
   let resp = await fetch('/user/Pay', {
      method: "POST",
      headers: {
         'Accept': 'application/json',
         'Content-Type': 'application/json'
      },
      body: JSON.stringify({
         "num":numCatering,
         // "image":image,
         "name":nameCatering,
         "email": emailCatering,
         "date":dateCatering,
         "time":timeCatering,
         "guests":guestsCatering,
         "food":foodCatering,
         "event":eventCatering,
         "item":itemCatering,
         "tax":taxCatering,
         "total":totalCatering,
         "image":imageCatering,
      })

   });
   //console.log(resp);
   let respJson = await resp.json();
   console.log(respJson);
   if(respJson.status == 201){
      console.log("You have Booked Successfuly!");
      window.alert(respJson.msg);
      window.location.reload();
   }
   else{
      window.alert(respJson.msg);
   }
   }

   async function contact() {
      var name = document.getElementById('Name').value
      var email = document.getElementById('Email').value;
      var phone = document.getElementById('Phoneno').value;
      var message = document.getElementById('comments').value;
    // Check for empty fields
    if (!name || !email || !phone || !message) {
      window.alert("Please fill in all fields");
      return;
    }
      // Email validation
      var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        window.alert("Please enter a valid email address");
        return;
      }

      // Phone number validation
      if (phone.length !== 10 || isNaN(phone)) {
        window.alert("Please enter a 10-digit phone number");
        return;
      }



      let resp = await fetch('/user/sendemail', {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "name": name,
          "email": email,
          "phone": phone,
          "message": message,
        })
      });
      let respJson = await resp.json();
      console.log(respJson);
      if (respJson.status == 201) {
        console.log("Email sent successfully!");
        window.alert(respJson.msg);
        window.location.reload();
      }
      else {
        window.alert(respJson.msg);
      }
    }




