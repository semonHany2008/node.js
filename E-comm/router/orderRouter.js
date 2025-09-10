const express = require('express')
const router = express.Router()
const { review } = require('../controllers/order/reviewController');

router.post('/review/:id', review)


module.exports = router