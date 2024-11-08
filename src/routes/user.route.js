const express = require('express');
const userController = require('../controllers/user.controller');
const router = express.Router();


router.route('/register').post(userController.createUserController);
router.route('/login').post(userController.loginUserController);
router.route('/logout').post(userController.logoutUserController);

const authRoute = router
module.exports = authRoute