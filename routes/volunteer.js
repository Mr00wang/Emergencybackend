var express = require('express');
var router = express.Router();

const volunteerController = require(process.cwd() + '/controller/volunteerController');

/* GET volunteer listing. */
router.get('/query', volunteerController.index);

/* GET volunteer listing. */
router.get('/queryByVolunteerName', volunteerController.queryByVolunteerName);

/* POST volunteer */
router.post('/create', volunteerController.create);

/* Delete volunteer */
router.delete('/delete', volunteerController.remove);

/* POST volunteer */
router.post('/update', volunteerController.update);
module.exports = router;