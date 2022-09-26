const express = require('express');
const attachmentController = require('../controllers/attachmentController');

const router = express.Router();


router.post('/', attachmentController.upload);




module.exports = router;