const express = require('express');
const eventController = require('../controllers/eventController')
const router = express.Router();

router.get('/', eventController.get);

router.get('/:id', eventController.getById);

router.post('/', eventController.create);

router.put('/:id', eventController.update);

router.delete('/:id', eventController.delete);

router.post('/:id/participant', eventController.addParticipants);

router.delete('/:id/participant/:participant_id', eventController.removeParticipants);






module.exports = router;