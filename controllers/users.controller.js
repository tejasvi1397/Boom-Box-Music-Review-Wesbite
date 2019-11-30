const user_model = require('../models/users.model');
const mongoose = require('mongoose');
mongoose.set('useFindAndModify', true);
// const { hash, compare } = require('bcryptjs');
const bcrypt = require('bcryptjs');

//logic to create a new user.
exports.user_create = async(req, res, next) => {
    try{
    console.log(req.body.Password);
    let Password = req.body.Password;
    let user_email = req.body.Email;
    var count = 0;
    // var user = new user_model(
    //     {
    //         _id: new mongoose.Types.ObjectId(),
    //         Email: req.body.Email,
    //         Password: req.body.Password
    //     }
    // )
    // const check_user = user_model.find(user => user.Email === Email);
    // if (check_user) throw new Error('User already exists');
    // const hashedPassword = await hash(Password, 10);
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
                    res.send(user);
                    console.log('User Created');
                })
            });
        });
    }
    })
        
    // else{
    //     res.status(400).send(`Username ${req.body.Email} already exists`);
    //     console.log(`Username ${req.body.Email} already exists`);
    // }
}
catch (err) {
    res.send({
      error: `${err.message}`,
    });
  }
}
