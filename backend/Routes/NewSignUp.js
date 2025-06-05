const express = require('express');
const router = express.Router();

const { signUpValidations, loginValidations } = require('../Middleware/AuthValidations');
const { signUp, signIn } = require("../Controller/newSignUp_controller");

router.post('/signup', signUpValidations, signUp);
router.post('/signIn', loginValidations, signIn);

module.exports = router;