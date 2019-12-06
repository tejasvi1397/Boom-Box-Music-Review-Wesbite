const mongoose = require('mongoose');
require('mongoose-type-email');
const Schema = mongoose.Schema;

let UserSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    Email: {type: mongoose.SchemaTypes.Email, required: true, unique: true},
    Password: {type: String, required: true},
    Account_Status: {type: String, default: "Activated"}
});

var User = mongoose.model('User' , UserSchema);
// Export the model
module.exports = User;