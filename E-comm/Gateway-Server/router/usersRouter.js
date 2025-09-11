const express = require('express');
const {getUsers} = require('../controllers/Auth/getUsersController')
const router = express.Router();



router.get('/', getUsers)






module.exports = router