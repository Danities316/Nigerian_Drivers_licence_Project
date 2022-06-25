const express =require('express');
const router = express.Router();
const {register} = require('../controllers/register.controller');
const { body } = require("express-validator");

const validator = [
    body('_name', "The name must be maximum of 3 characters")
    .notEmpty()
    .escape()
    .trim()
    .isLength({min: 3}),
        body('_email', "Invalid email Address")
        .notEmpty()
        .escape()
        .trim()
        .isEmail(),
    body("PIN", "The PIN must be minimum/maximum 7 characters length")
    .notEmpty()
    .trim()
    .isLength({min: 7, max: 7}),
    body("_password", "The Password must be minimum 6 characters length")
    .notEmpty()
    .trim()
    .isLength({min: 6})
]



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



// router.post('/register', register);
router.get('/register', ifNotLoggedin, register);
router.post('/register', ifLoggedin, validator, register);



module.exports = router;