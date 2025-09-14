const add_post=require("../controllers/posts/add-postController");
const get_post=require("../controllers/posts/get-postController");
const delete_post=require("../controllers/posts/delete-postController");


const express=require('express');
const router=express.Router();

router.post("/new-post", add_post);
router.get("/:id", get_post);
router.delete("/:id", delete_post);


module.exports=router