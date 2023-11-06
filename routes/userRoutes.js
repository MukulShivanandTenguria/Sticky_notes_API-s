const express = require('express');
const authController = require('../controllers/authController')
const userController = require('../controllers/userController')
const router = express.Router()

router.route("/signup").post(authController.signUp)
router.route("/LogIn").post(authController.login)
router.route("/logout").get(authController.logout)
router.route("/get-all-user").get(userController.getAllUser)

module.exports = router;