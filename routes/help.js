var express = require('express');
var router = express.Router();

const helpController = require(process.cwd() + '/controller/helpController');

/* GET users listing. */
router.get('/query', helpController.index);

/* GET users listing. */
router.get('/queryByHelpName', helpController.queryByHelpName);

/* GET users listing. */
router.get('/queryByHelpPhone', helpController.queryByHelpPhone);

/* POST user */
router.post('/create', helpController.create);

/* Delete user */
router.delete('/delete', helpController.remove);

/* POST user */
router.post('/update', helpController.update);


module.exports = router;