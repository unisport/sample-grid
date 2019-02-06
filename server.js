// load the things we need
var express = require('express');
var app = express();
const path = require('path');
const bodyParser = require("body-parser");


const port = process.env.PORT || 3000;

app.set('port', port);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
require('./routes/index')(app);

app.listen(port);
console.log(`Express server started http://localhost:${port}/`);