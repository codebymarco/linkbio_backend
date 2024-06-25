const express = require('express')
const router = express.Router()
const {createUser, loginUser} = require('../controllers/authController')

//login user
router.post('/login', loginUser)

//signin user
router.post('/create', createUser)

module.exports = router