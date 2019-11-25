const express = require('express');
const bodyParser = require('body-parser');
const app = express();

let port = 8080;

app.listen(port, () => {
    console.log('Server is running on port number ' + port);
});