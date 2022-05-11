var express = require('express');
var router = express.Router();

const emergencyController = require(process.cwd() + '/controller/emergencyController');

/* GET emergency listing. */
router.get('/query', emergencyController.index);

/* GET emergency listing. */
router.get('/queryByEmergencyType', emergencyController.queryByEmergencyType);

/* GET emergency listing. */
router.get('/queryByEmergencyTitle', emergencyController.queryByEmergencyTitle);

/* POST emergency */
router.post('/create', emergencyController.create);

/* Delete emergency */
router.delete('/delete', emergencyController.remove);

/* POST emergency */
router.post('/update', emergencyController.update);


module.exports = router;