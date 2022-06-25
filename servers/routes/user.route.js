const express =require('express');
const router = express.Router();
const {home, view, search, auth, addUser, dashboard} = require('../controllers/user.controller');

//Route
router.get('/view', view);
router.post('/auth', auth);
router.post('/', search);
router.get('/adduser', addUser);
router.get('/', home);
router.get('/dashboard', dashboard);

module.exports = router;