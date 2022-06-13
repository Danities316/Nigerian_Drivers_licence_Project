const mysql = require("mysql2");
require("dotenv").config();

const pool = mysql.createPool({
  connectionLimit: 100,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DATABASE,
});

exports.view = (req, res) => {
  // res.render('home')

  //Conneting to DB
  pool.getConnection((err, connection) => {
    if (err) throw err;
    console.log("Connect with ID: " + connection.threadId);

    connection.query("SELECT * FROM ndl.user LIMIT 10", (err, rows) => {
      //When done wuth the connection release it;
      connection.release();

      if (!err) {
        res.render("addUser");
      } else {
        res.render("404", { err });
      }
      // console.log('The data from the user Table: \n', rows)
    });
  });
};

exports.logins = (req, res) =>{
  res.render('logins')
}

exports.dashboard = (req, res) => {

  //Conneting to DB
  pool.getConnection((err, connection) => {
    if (err) throw err;
    console.log("Connect with ID: " + connection.threadId);
    let searchName = req.body.search;

    connection.query(
      "SELECT * FROM ndl.user WHERE Name LIKE ?",
      ["%" + searchName + "%"],
      (err, rows) => {
        // console.log(searchTerms)
        //When done wuth the connection release it;
        connection.release();
        if (!err) {
          res.render("dashboard", { rows });
        } else {
          console.log(err);
          res.render("404", { err });
        }
        //  console.log('The data from the user Table: \n', rows)
      }
    );
  });
};

exports.home = (req,res) =>{
  //Conneting to DB
  pool.getConnection((err, connection) => {
    if (err) throw err;
    console.log("Connect with ID: " + connection.threadId);
  });
  res.render('home')
}

exports.search = (req, res) => {
  // res.render('home')
  // let searchTerms = req.body.search;
  // console.log('hi')

  //Conneting to DB
  pool.getConnection((err, connection) => {
    if (err) throw err;
    console.log("Connect with ID: " + connection.threadId);
    let searchName = req.body.search;
    // let searchUsername = req.body.username;
    // let searchPIN = req.body.pin;
    // console.log(searchTerms)

    connection.query(
      "SELECT * FROM ndl.user WHERE Name LIKE ?",
      ["%" + searchName + "%"],
      (err, rows) => {
        // console.log(searchTerms)
        //When done wuth the connection release it;
        connection.release();
        if (!err) {
          res.render("home", { rows });
        } else {
          console.log(err);
          res.render("404", { err });
        }
        //  console.log('The data from the user Table: \n', rows)
      }
    );
  });
};

exports.addUser = (req, res) => {
  function showTab (n) {
    var currentTab = 0; // Current tab is set to be the first tab (0)
    showTab(currentTab); // Display the current tab

    // This function will display the specified tab of the form...
    var tab = document.getElementsByClassName("tab");
    tab[n].style.display = "block";


    //... and fix the Previous/Next buttons:
    if (n == 0) {
      document.getElementById("prevBtn").style.display = "none";
    } else {
      document.getElementById("prevBtn").style.display = "inline";
    }
    if (n == tab.length - 1) {
      document.getElementById("nextBtn").innerHTML = "Submit";
    } else {
      document.getElementById("nextBtn").innerHTML = "Next";
    }
    //... and run a function that will display the correct step indicator:
    fixStepIndicator(n);
  };

  function nextPrev(n) {
    // This function will figure out which tab to display
    var tab = document.getElementsByClassName("tab");
    // Exit the function if any field in the current tab is invalid:
    if (n == 1 && !validateForm()) return false;
    // Hide the current tab:
    tab[currentTab].style.display = "none";
    // Increase or decrease the current tab by 1:
    currentTab = currentTab + n;
    // if you have reached the end of the form...
    if (currentTab >= tab.length) {
      // ... the form gets submitted:
      document.getElementById("regForm").submit();
      return false;
    }
    // Otherwise, display the correct tab:
    showTab(currentTab);
  }
  
  function fixStepIndicator(n) {
    // This function removes the "active" class of all steps...
    var i, x = document.getElementsByClassName("step");
    for (i = 0; i < x.length; i++) {
      x[i].className = x[i].className.replace(" active", "");
    }
    //... and adds the "active" class on the current step:
    x[n].className += " active";
  }
  res.render("addUser");
};
