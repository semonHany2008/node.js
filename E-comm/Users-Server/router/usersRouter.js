const express = require('express')
const router = express.Router()
const { getUsers } = require('../controllers/getUsersController');


router.get('/', getUsers)



module.exports = router