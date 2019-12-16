require('dotenv/config');
const user_model = require('../models/users.model');
const mongoose = require('mongoose');
mongoose.set('useFindAndModify', true);
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const secret = process.env.JWT_KEY;
if (typeof secret === 'undefined') { 
	console.log("Please set secret as environment variable. E.g. JWT_KEY=\"Open Sesame\" node index");
	process.exit(1);
}

var nodemailer = require("nodemailer");
var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "boxboom758@gmail.com",
        pass: "boombox_project"
    }
});

var rand,mailOptions,host,link;

//logic to create a new user.
exports.user_create = async(req, res, next) => {
    try{
    console.log(req.body.Password);
    let Password = req.body.Password;
    let user_email = req.body.Email;
    var count = 0;
    console.log(`Creating user ${user_email}`);
    // var user = new user_model()
    // console.log(user_model.find(user_email));
    user_model.find(function(err , users){
        console.log(user_email);
        users.forEach(element =>{
            console.log(element['Email']);
            if(element['Email'] === user_email){
                count = count+1;
                console.log(element['Email']);
                res.status(400).send(`Username ${req.body.Email} already exists`);
                console.log(`Username ${req.body.Email} already exists`);
                return false;
            }
        })
    console.log(`Count ${count}`);
    if(count == 0){
        bcrypt.genSalt(10, function(err , salt){
            bcrypt.hash(Password , salt, function(err, hash){
                var user = new user_model(
                    {
                        _id: new mongoose.Types.ObjectId(),
                        Email: req.body.Email,
                        Password: hash
                    }
                )
                user.save(function (err , user){
                    if (err) {
                        return next(err);
                        }
                    // res.send(user);
                    console.log('User Created');
                    //for sending email verification
                    rand=Math.floor((Math.random() * 100) + 54);
                    host=req.get('host');
                    link="http://localhost:8080/api/secure/verify?user="+user._id+"&id="+rand;
                    mailOptions={

                        from: 'Do Not Reply <boxboom758_do_not_reply@gmail.com>',
            
                        to : req.body.Email,
            
                        subject : "Please confirm your Email to access Boom-Box",
            
                        html : "Hello,<br> Please Click on the link to verify your email.<br><a href="+link+">Click here to verify</a>"
                    }
                    console.log(mailOptions);
                    transporter.sendMail(mailOptions, function(err, res){
                        if (err){
                            console.log(err);
                            res.status(400).send(error);
                        }
                        else{
                            console.log("Email Sent");
                            console.log(user._id);
                            res.json({user: user._id});
                        }
                    })
                })
            });
        });
    }
    })
}
catch (err) {
    res.send({
      error: `${err.message}`,
    });
  }
}

//logic for email verify route
exports.user_verify_email = async(req, res) => {
    if((req.protocol+"://"+req.get('host'))==("http://"+host)){
        console.log("User clicked on link. Info authentic");
        console.log(req.query.id);
        console.log(req.query.user);
        if(req.query.id==rand){
            console.log("Email Verified");
            const create =  await user_model.findOneAndUpdate({_id : req.query.user },{$set: {IsVerified: true}});
            // res.set('location', 'http://localhost:4200/login');
            res.status(301).send('Email Verified! You can now Login');
            // res.send("Email verified, you can login now..")
        }
        else{
            console.log("Email not verified");
            res.status(400).send('Email is not verified');
        }
    }
    else{
        res.status(400).send('Request is from unknown source');
    }
}

//logic to resend email
exports.user_resend_email = async(req, res) => {
    console.log(req.body);
}

//logic for when user login and if valid then generate a JWT token.
exports.user_login = async(req, res, next) => {
    try{
        console.log(req.body.Password);
        let user_password = req.body.Password;
        let user_email = req.body.Email;
        var count = 0;

        user_model.find(function(err, users)
        {
            console.log(user_email);
            users.forEach(element =>{
                console.log(element['Email']);
                if(element['Email'] === user_email){
                    count = count+1;
                    console.log("inside if block");
                    console.log(element['Email']);
                    console.log(element['Password']);
                    bcrypt.compare(user_password , element['Password'], function(err , user){
                        if (err) {
                            // res.status(403).send('Invalid Password');
                            return next(err);
                        }
                        // if(res){
                        //     // res.send('Login Successful');
                        //     console.log(element);
                        // }
                        if(user){
                            // res.send('Login Successful');
                            console.log(`Login Successful ${element}`);
                            let payload = {username: element['Email'] , id: element['_id'], status: element['Account_Status']}; //make payload
                            let token = jwt.sign(payload, secret); //make token
                            res.json({token: token, role: element['Role'], account_status: element['Account_Status'], is_verified: element['IsVerified']}); //send token
                            // res.status(200).send({token});
                            console.log('token: ' + token);
                        }
                        else{
                            res.status(403).send('Invalid Password');
                        }
                    })
                }
            })
            console.log(`Count ${count}`);
            if(count == 0){
                res.status(400).send(`Username ${req.body.Email} does not exists`);
            }
        })
    }
    catch (err) {
        res.send({
            error: `${err.message}`,
        });
    }
}

//function to verify token
exports.jwt_verify = function(req, res, next) {
    console.log('Data: ' + JSON.stringify(req.body));
    console.log("Auth: " + req.headers.authorization);
    console.log(process.env.JWT_KEY);
    
    if (typeof req.headers.authorization === 'undefined'){
        return res.status(401).send("Access denied. Missing Auth header.");
    } 
    const token = req.headers.authorization.split(" ");
    if (! token[0].startsWith("Bearer")) { // Check first element. Must be "Bearer"
        return res.status(401).send("Access denied. Missing Token.");
    }
    console.log(token[1]);

    jwt.verify(token[1], process.env.JWT_KEY, (err, user_verified) => {
        if(err){
            console.log(err);
            return res.status(403).send("Access denied. Invalid token.");
        }
        console.log("JWT Verified!");
        req.user_verified = user_verified;
        next();
    });
}

//logic to modify user 
exports.user_modify = function(req, res, next) {
    user_model.findOneAndUpdate({_id : req.params.id}, {$set: req.body}, {new: true}, function(err, user_updated, next) {
        if (err) return next(err);
        res.send(user_updated);
        console.log(user_updated);
    })
}

//logic to get all users
exports.user_get = function(req, res, next) {
    user_model.find(function(err, users){
        if (err) return next(err);
        res.send(users);
        console.log(users);
    })
};