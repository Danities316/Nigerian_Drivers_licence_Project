const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const session = require('express-session');
const mysql = require('mysql2');
const logger = require('morgan');
const userRoute = require('./servers/routes/user.route')
const registerRoute = require('./servers/routes/register.route')
const loginRoute = require('./servers/routes/login.route')
const pool = require('./config/connection')

require('dotenv').config();

const app = express();


//passinf middleware
//Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}));

//parse app/json
app.use(bodyParser.json());


//static file
app.use(express.static('public'));
app.use(logger('dev'))
app.use(session({
    secret: '123456cat',
    resave: false,
    saveUninitialized: true,
    cookie: {maxAge: 6000}
}))


//Templating Engine
app.engine('hbs', exphbs.engine( {extname: '.hbs',  defaultLayout: "main"}) );
app.set('view engine', 'hbs');





//Conneting to DB
pool.getConnection((err, connection) =>{
    if(err) throw err;
    console.log('Connect with ID: ' + connection.threadId);
})



app.use('/', userRoute);
app.use('/', registerRoute);
app.use('/', loginRoute);




const port = process.env.PORT || 8000;
app.listen(port, () => console.log('Port listening on 8000....'))

// https://medium.com/@prashantramnyc/a-simple-registration-and-login-backend-using-nodejs-and-mysql-967811509a64
//  https://www.w3jar.com/node-js-login-and-registration-system-with-express-js-and-mysql/
// https://codeshack.io/basic-login-system-nodejs-express-mysql/