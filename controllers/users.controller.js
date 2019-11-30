const user_model = require('../models/users.model');
const mongoose = require('mongoose');
mongoose.set('useFindAndModify', true);
// const { hash, compare } = require('bcryptjs');
const bcrypt = require('bcryptjs');

exports.user_create = async(req, res, next) => {
    try{
    console.log(req.body.Password);
    const Password = req.body.Password;
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
catch (err) {
    res.send({
      error: `${err.message}`,
    });
  }
}
