const usercontroller = require("../controllers/usercontroller");
const express = require("express");
const userrouter = express.Router();

// User routes
userrouter.post("/insertuser", usercontroller.insertuser);
userrouter.post("/checkuserlogin", usercontroller.checkuserlogin);
userrouter.post("/checkemail", usercontroller.checkEmail); // New route to check email

module.exports = userrouter;