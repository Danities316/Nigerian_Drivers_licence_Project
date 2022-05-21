const mysql = require('mysql2');
require('dotenv').config();

const pool = mysql.createPool({
    connectionLimit: 100,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DATABASE,
});




exports.view = (req, res) =>{
// res.render('home')

//Conneting to DB
pool.getConnection((err, connection) =>{
    if(err) throw err;
    console.log('Connect with ID: ' + connection.threadId);

    connection.query('SELECT * FROM ndl.user LIMIT 10', (err, rows) =>{
        //When done wuth the connection release it;
        connection.release();

        if(!err){
            res.render('home', { rows});
        }else{
            res.render('404', {err})
        }
        // console.log('The data from the user Table: \n', rows)


    });
});

}



exports.search = (req, res) =>{
    // res.render('home')
    // let searchTerms = req.body.search;
    // console.log('hi')
    
    //Conneting to DB
    pool.getConnection((err, connection) =>{
        if(err) throw err;
        console.log('Connect with ID: ' + connection.threadId);
        let searchName = req.body.search;
        // let searchUsername = req.body.username;
        // let searchPIN = req.body.pin;
        // console.log(searchTerms)
        
        connection.query('SELECT * FROM ndl.user WHERE Name LIKE ?', ['%' + searchName + '%'],(err, rows) =>{
            // console.log(searchTerms)
            //When done wuth the connection release it;
            connection.release();
             if(!err){
                 res.render('home', { rows});
             }else{
                 console.log(err)
                 res.render('404', { err})
             }
            //  console.log('The data from the user Table: \n', rows)
    
    
        });
    });
    }

    exports.addUser = (req, res) =>{
        res.render('addUser')

    }