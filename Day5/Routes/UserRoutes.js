const express = require("express");
const router = new express.Router();
const UsersController = require("../Controllers/UserController");

router.post("/signup", UsersController.Register);

router.post("/login", UsersController.Login);

module.exports = router;
