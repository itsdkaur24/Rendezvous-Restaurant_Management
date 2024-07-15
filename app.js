var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var cors =require('cors');
const connection = require('./connection');
const userRoute = require('./routes/users');
const adminRoute = require('./routes/admin'); 
const { get } = require('http');
const session = require('express-session');

var app = express();
const nodemailer = require("nodemailer");
var transporter = nodemailer.createTransport({
    //service: "zohomail",
    host: 'smtp.zoho.in',
    secure: true,
    port: 465,
    auth:{
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    }
})

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('squirrelly').renderFile);
app.set('view engine', 'html');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/img', express.static('public/images'));
app.use('/style', express.static('public/stylesheets'));
app.use('/js', express.static('public/javascripts'));

app.use(cors());
app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.use(session({
    secret: '39487dwi',
    resave: 'true',
    saveUninitialized: true,
    cookie: {maxAge:900000},
}))

app.use('/user',userRoute);
app.use('/admin',adminRoute);

app.get('/', async (req,res,next)=>{
    console.log("Session: "+req.session)
    if(req.session.user != undefined){
        console.log("Session: "+req.session.user)
        res.render('main.html', {user: req.session.user});
    }
    else{
        res.render('main.html', {user: 0});
    }
    
})

app.get('/menu',async(req,res,next)=>{
    if(req.session.user != undefined){
        res.render('Menu.html', {user: req.session.user});
    }
    else{
        res.render('Menu.html', {user: 0});
    } 
})

app.get('/aboutus',async(req,res,next)=>{
    if(req.session.user != undefined){
        res.render('AboutUs.html', {user: req.session.user});
    }
    else{
        res.render('AboutUs.html', {user: 0});
    }
})

app.get('/catering',async(req,res,next)=>{
    if(req.session.user != undefined){
        res.render('Catering.html', {user: req.session.user});
    }
    else{
        res.render('Catering.html', {user: 0});
    }
})

app.get('/contactus',async(req,res,next)=>{
    if(req.session.user != undefined){
        res.render('ContactUs.html', {user: req.session.user});
    }
    else{
        res.render('ContactUs.html', {user: 0});
    }
})

app.get('/feedback',async(req,res,next)=>{
    if(req.session.user != undefined){
        res.render('Feedback.html', {user: req.session.user});
    }
    else{
        res.render('Feedback.html', {user: 0});
    }
})



app.get('/hours-location',async(req,res,next)=>{
    if(req.session.user != undefined){
        res.render('hours&locations.html', {user: req.session.user});
    }
    else{
        res.render('hours&locations.html', {user: 0});
    }
}) 

// app.get('/dashboard',async(req,res,next)=>{
//     res.render('dashboard.html');
// })

app.get('/dashboard',async(req,res,next)=>{
    if(req.session.user != undefined){
        res.redirect('/user/dashboard');
    }
    else{
    res.redirect('/login');
        
    }
})

app.get('/customers',async(req,res,next)=>{
    if(req.session.user != undefined){
        res.redirect('/admin/customers');
      //  res.render('customers.html', {user: req.session.user});
    }
    else{
        res.redirect('/login');
        
    }
})

// app.get('/Catering_Event',async(req,res,next)=>{
//     if(req.session.user != undefined){
//         res.redirect('/admin/Catering_Event');
//     }
//     else{
//         res.redirect('/login');
        
//     }
// })

// app.get('/Catering_Event',async(req,res,next)=>{ 
//     if(req.session.user != undefined){
//         res.render('Catering_Event.html', {user: req.session.user});
//     }
//     else{
//         res.render('Catering_Event.html', {user: 0});
//     }
// }) 

app.get('/catering_dash',async(req,res,next)=>{
    if(req.session.user != undefined){
        res.redirect('/admin/catering_dash');
    }
    else{
        res.redirect('/login');
        
    }
})



app.get('/tablereserve',async(req,res,next)=>{
    if(req.session.user != undefined){
        res.redirect('/admin/tablereserve');
    }
    else{
        res.redirect('/login');
        
    }
})


app.get('/feedback_dash',async(req,res,next)=>{
    if(req.session.user != undefined){
        res.redirect('/admin/feedback_dash');
    }
    else{
    res.redirect('/login');
        
    }
})



app.get('/OrderReport',async(req,res,next)=>{
    if(req.session.user != undefined){ 
        res.redirect('/admin/OrderReport');
    }
    else{
        res.redirect('/login');
    }
})

app.get('/TableReport',async(req,res,next)=>{
    if(req.session.user != undefined){ 
        res.redirect('/admin/TableReport');
    }
    else{
        res.redirect('/login');
    }
})

app.get('/CustReport',async(req,res,next)=>{
    if(req.session.user != undefined){ 
        res.redirect('/admin/CustReport');
    }
    else{
        res.redirect('/login');
    }
})

app.get('/FeedReport',async(req,res,next)=>{
    if(req.session.user != undefined){ 
        res.redirect('/admin/FeedReport');
    }
    else{
        res.redirect('/login');
    }
})





app.get('/login',async(req,res,next)=>{
    res.render('login.html');
})


app.get('/register',async(req,res,next)=>{
    res.render('Register.html');
})

app.get('/forgotpassword',async(req,res,next)=>{
    res.render('forgotpassword.html');
})



app.get('/reservation',async(req,res,next)=>{
    if(req.session.user != undefined){
        res.render('Reservation.html', {user: req.session.user});
    }
    else{
        res.render('Reservation.html', {user: 0});
    }
}) 

app.get('/logout', async(req, res,next)=> {
    req.session.user = "";
    res.redirect('/');
})



app.get('/profile',async(req,res,next)=>{
    if(req.session.user != undefined){ 
        res.render('profile.html', {user: req.session.user});
    }
    else{
        res.redirect('/');
    }
})
 
// app.get('/Catering_Event',async(req,res,next)=>{
//     if(req.session.user != undefined){
//         res.render('Catering_Event.html', {user: req.session.user});
//     }
//     else{
//         res.redirect('/');
//     }
// })



app.get('/TermsConditions',async(req,res,next)=>{
   
    if(req.session.user != undefined){
        res.render('TermsConditions.html', {user: req.session.user});
    }
    else{
        res.redirect('/');
    }
})

app.get('/privacy-policy',async(req,res,next)=>{
    res.render('privacy-policy.html');
})

app.get('/change_password',async(req,res,next)=>{
    if(req.session.user != undefined){
        res.render('change_password.html', {user: req.session.user});
    }
    else{
        res.redirect('/');
    }
})


app.get('/orders',async(req,res,next)=>{
    if(req.session.user != undefined){
        res.redirect('/user/orders');
    }
    else{
        res.redirect('/login');
    }
})

// app.get('/invoice',async(req,res,next)=>{
//     res.render('')
//     if(req.session.user != undefined){
//         res.redirect('/user/invoice');
//     }
//     else{ 
//         res.redirect('/login');
//     }
// })

app.get('/userReservation',async(req,res,next)=>{
    if(req.session.user != undefined){ 
        res.redirect('/user/userReservation');
    }
    else{
        res.redirect('/login');
    }
})



  



module.exports = app;
