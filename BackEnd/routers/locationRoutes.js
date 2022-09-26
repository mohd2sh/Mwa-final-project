const express = require('express');
const locationController = require('../controllers/locationController')
const router = express.Router();

router.get('/', locationController.get);


router.get('/eventTypes', locationController.getEventTypes);


router.post('/', locationController.create);

router.put('/:id', locationController.update);

router.delete('/:id', locationController.delete);


module.exports = router;