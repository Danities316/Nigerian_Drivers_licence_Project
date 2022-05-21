const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
// const config = require('./config/connection');
const mysql = require('mysql2');
const userRoute = require('./servers/routes/user.route')

require('dotenv').config();

const app = express();
const port = process.env.PORT || 8000;

//passinf middleware
//Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}));

//parse app/json
app.use(bodyParser.json());


//static file
app.use(express.static('public'));


//Templating Engine
app.engine('hbs', exphbs.engine( {extname: '.hbs',  defaultLayout: "main"}) );
app.set('view engine', 'hbs');

const pool = mysql.createPool({
    connectionLimit: 100,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DATABASE,
});

//Conneting to DB
pool.getConnection((err, connection) =>{
    if(err) throw err;
    console.log('Connect with ID: ' + connection.threadId);
})



app.use('/', userRoute);





app.listen(port, () => console.log('Port listening on 8000....'))

// https://medium.com/@prashantramnyc/a-simple-registration-and-login-backend-using-nodejs-and-mysql-967811509a64