const express =require('express');
const router = express.Router();
const {view, search, addUser} = require('../controllers/user.controller');

//Route
router.get('/', view);
router.post('/', search);
router.get('/adduser', addUser);

module.exports = router;