const create_group = require("../controllers/groups/create-groupController");
const get_group = require("../controllers/groups/get-groupController");
const add_post = require("../controllers/groups/add-postController");

const express = require("express");
const router = express.Router();

router.post("/create-group", create_group);
router.get("/:id", get_group);
router.patch("/add-post", add_post);

module.exports = router;
