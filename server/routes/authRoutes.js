const express = require('express');
const authController = require('../controllers/authController');
const {body} = require("express-validator")

const router = express.Router();

const registerValidation = [
body("name")
    .trim()
    .notEmpty()
    .withMessage("name is required")
    .isLength({min: 2, max: 50}), 
body("email")
    .trim()
    .isEmail()
    .withMessage("Valid email is required")
    .normalizeEmail(), 
body("password")
    .isLength({min:6})
    .withMessage("password must be at least 6 characters"),
];

const emailValidation = [
    body("email")
        .isEmail()
        .withMessage("Please provide a valid email address."),
];

const loginValidation = [
    body("email")
        .isEmail()
        .withMessage("Please provide a valid email address."),
    body("password")
        .notEmpty()
        .withMessage("Password is required"),
]

router.post('/register', registerValidation, authController.register)
router.get('/verify-email/:token', authController.verifyEmail)
router.post("/resend-verification", emailValidation, authController.resendVerification);
router.post("/login",loginValidation, authController.login);

module.exports = router;