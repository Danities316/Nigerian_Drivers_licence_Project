const express =require('express');
const router = express.Router();
const {home, view, logins, search, addUser, dashboard} = require('../controllers/user.controller');

//Route
router.get('/view', view);
router.get('/logins', logins);
router.post('/', search);
router.get('/adduser', addUser);
router.get('/', home);
router.get('/dashboard', dashboard);

module.exports = router;