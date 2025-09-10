const {sendEmail}=require("../../utils/mailSender");
const {usersModel}=require("../../models/users");
const {ordersModel}=require("../../models/orders");
const {reviewsModel}=require("../../models/reviews");
const jwt=require('jsonwebtoken');
const path=require('path');
require('dotenv').config({path:path.join(__dirname, '../../.env')})


const review = async (req, res) => {
  let token = req.session.token;
  if (!token) {
    return res.json({ message: "you're not authenticated, login first!" });
  }
  let plainToken;
  try {
    plainToken = jwt.verify(token, process.env.JWT_SECRET,{expiresIn:'2m'});
  } catch (err) {
    return res.status(401).json({ message: "invalid token!" });
  }

  let foundUser=await usersModel.findOne({email:plainToken.email});
  if(!foundUser){
    return res.status(400).json({ message: "sorry, try register first!" });
  }

  let id = req.params.id;
  let { stars, description } = req.body;

  if(!id || !stars){
    return res.status(400).json({ message: "orderId and evaluation stars are required!" });
  }

  let foundOrder=await ordersModel.findOne({_id:id});
  if(!foundOrder){
    return res.status(400).json({ message: "sorry, product with id: "+id+" isn't found" });
  }

  let foundReview=await reviewsModel.findOne({orderId:id, ownerUsername:foundUser.username});
  if(foundReview){
    return res.status(400).json({ message: "you already submit your review on this order" });
  }

  if(stars.length<1 || stars.length>5){
    return res.status(400).json({ message: "stars num must be between 1 and 5" });
  }

  await reviewsModel.create({ownerUsername:foundUser.username, orderId:id, stars, description});

  if(stars.length==1 || stars.length==2){
    return sendEmail(plainToken.email,"bad review","we're sorry for this review we'll exert more efforts on enhancing this product");
  }
  else if(stars.length==3){
    return sendEmail(plainToken.email,"good review","thanks for your review and we will try to make it better later");
  }
  else {
    return sendEmail(plainToken.email,"excellent review","we're so happy to hear that the order admire you, we hope to keep this level of quality");
  }
};

module.exports = { review };
