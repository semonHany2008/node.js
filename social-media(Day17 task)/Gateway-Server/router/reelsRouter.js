const get_reels=require("../controllers/reels/get_reelsController");
const add_reel=require("../controllers/reels/add_reelController");
const getById=require("../controllers/reels/getByIdController");


const express=require('express');
const router=express.Router();

router.get("/", get_reels);
router.post("/add-reel", add_reel);
router.get("/:id", getById);


module.exports=router