const mysql = require("mysql2");
const bcrypt = require("bcrypt");
const pool = require('../../config/connection');


exports.logins = (req, res) =>{
    res.render('logins')
  }

  exports.logout = (req, res) =>{
    req.session.destroy((err) =>{
      next();
    })
    res.render('/login')
  }

  //Inspiration
  // https://www.w3jar.com/node-js-login-and-registration-system-with-express-js-and-mysql/