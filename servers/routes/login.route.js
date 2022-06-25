const express =require('express');
const router = express.Router();
const {logins, logout} = require('../controllers/login.controller');
const { dashboard } = require('../controllers/user.controller');
const { body } = require("express-validator")


const ifNotLoggedin = (req, res, next) =>{
    if(!req.session.username){
        return res.redirect('logins');
    }
    next()
}

const ifLoggedin = (req, res, next) =>{
    if(req.session.username){
        return res.redirect(dashboard);
    }
    next();
}


//Route
router.get('/logout', ifNotLoggedin, logout);
router.get('/logins', ifLoggedin, logins);

const validator = [
    body('_email', "Invalid email Address")
    .notEmpty()
    .escape()
    .trim()
    .isEmail(),
    body("password", "The password must be of minimum 4 characters length")
    .notEmpty()
    .trim()
    .isLength({min: 6})
]
router.post('/login', ifLoggedin, validator, logins )

router.get('/logout', logout)



module.exports = router;


//Inspirations
// https://www.w3jar.com/node-js-login-and-registration-system-with-express-js-and-mysql/