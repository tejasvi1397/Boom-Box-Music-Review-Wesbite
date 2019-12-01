require('dotenv/config');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const song_route_export = require('./routes/songs.route'); 
const review_route_exports = require('./routes/reviews.route');
const user_route_exports = require('./routes/users.route'); 
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

mongoose.set('useUnifiedTopology', true); // to avoid deprecation warning
mongoose.set('useNewUrlParser', true);
let MongoAtlasURL = 'mongodb+srv://MusicProject:abcd1234@ece9065-project-tejasvi-kctlu.mongodb.net/test?retryWrites=true&w=majority';
let mongoDB = process.env.MONGODB_URI || MongoAtlasURL;
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// const secret = process.env.JWT_KEY;
// if (typeof secret === 'undefined') { 
// 	console.log("Please set secret as environment variable. E.g. JWT_KEY=\"Open Sesame\" node index");
// 	process.exit(1);
// }

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/api/secure/song' , song_route_export);
app.use('/api/open/song' , song_route_export);
app.use('/api/secure/review' , review_route_exports);
app.use('/api/secure' , user_route_exports);

let port = process.env.PORT;

app.listen(port, () => {
    console.log('Server is running on port number ' + port);
});