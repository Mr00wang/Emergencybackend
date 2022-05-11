var express = require('express');
var router = express.Router();

const roleController = require(process.cwd() + '/controller/roleController');

/* GET role listing. */
router.get('/query', roleController.index);

/* GET role listing. */
router.get('/queryByName', roleController.queryByName);

/* POST role */
router.post('/create', roleController.create);

/* Delete role */
router.delete('/delete', roleController.remove);

/* POST role */
router.post('/update', roleController.update);
module.exports = router;