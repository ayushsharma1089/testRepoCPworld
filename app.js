const express = require('express'); 
const routing = require('./routes/routing');
const app = express(); 
const bodyParser= require('body-parser'); 
const verifyToken=require('./routes/validate-token');
const router2=require('./routes/route2');
const router3=require('./routes/route3');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(function (req, res, next) {


    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.use('/profile',router3);
app.use('/rest',verifyToken,router2);
app.use(routing);


app.listen(3000); 
console.log("Server Started at port 3000!");