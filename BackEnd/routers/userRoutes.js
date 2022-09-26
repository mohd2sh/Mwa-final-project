const express = require('express');
const userController = require('../controllers/userController')
const router = express.Router();

router.post('/login', userController.login);

router.post('/signup', userController.SignUp);



router.put('/:id', userController.update);

module.exports = router;