var express = require('express');
var router = express.Router();

const epidemicController = require(process.cwd() + '/controller/epidemicController');

/* GET epidemic listing. */
router.get('/query', epidemicController.index);

/* GET epidemic listing. */
router.get('/queryByEpidemicName', epidemicController.queryByEpidemicName);


/* POST epidemic */
router.post('/create', epidemicController.create);

/* Delete epidemic */
router.delete('/delete', epidemicController.remove);

/* POST epidemic */
router.post('/update', epidemicController.update);

/* POST epidemic */
router.get('/addEpidemicPeople', epidemicController.addEpidemicPeople);

/* POST epidemic */
router.get('/minusEpidemicPeople', epidemicController.minusEpidemicPeople);

module.exports = router;