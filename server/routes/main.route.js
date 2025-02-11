const registerUser = require("../controller/registerUser");
const logout = require("../controller/logout");
const updateUserDetails = require("../controller/updateUserDetails");
const searchUser = require("../controller/searchUser");
const userDetails = require("../controller/userDetails")
const userLoginController = require("../controller/loginUser.controller")
const router = require('express').Router()

//create user api
router.post('/register',registerUser)
//check user email
router.post('/login',userLoginController)
//login user details
router.get('/user-details',userDetails)
//logout user
router.get('/logout',logout)
//update user details
router.post('/update-user',updateUserDetails)
//search user
router.post("/search-user",searchUser)

module.exports = router;
