const express=require('express');
const buyRouter=express.Router();

const { buy_without_discount, buy_with_discount }=require("../controllers/buyControllers");
const checkAuth=require('../middleware/checkAuth');

buyRouter.post('/without-discount', checkAuth, buy_without_discount);
buyRouter.post('/with-discount', checkAuth, buy_with_discount);

module.exports=buyRouter;