const mysql = require("mysql2");
const bcrypt = require("bcrypt");
const pool = require('../../config/connection');

exports.register = (req, res) => {
    res.render('register')
    // const username = req.params.username;
    // if (!req.body) {
    //     return res.status(400).send({
    //         msg: `content can not be empty`
    //     });
    // }
    // try {
    //     pool.getConnection((err, connection) =>{
    //         if (err) throw err;
    //         const postData = { username, ...req.body };
    //         connection.query('INSERT INTO ndl.user SET ?', postData, (err, result) =>{
    //             if (err) throw err;
    //         return res.status(201).send(result);
    //         })
    //     })
    // } catch (error) {
    //     // logger.error(logger.combinedFormat(req, res, error.message));
    //     return res.status(500).send({
    //         message: error.message || `Some error occured while creating the Vacancy`
    //     });
    // }
};