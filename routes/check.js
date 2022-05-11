var express = require('express');
var router = express.Router();

const checkController = require(process.cwd() + '/controller/checkController');

/* GET checks listing. */
router.get('/query', checkController.index);

/* GET checks listing. */
router.get('/queryByCheckType', checkController.queryByCheckType);

/* GET checks listing. */
router.get('/queryByCheckPeople', checkController.queryByCheckPeople);

/* POST checks */
router.post('/create', checkController.create);

/* Delete checks */
router.delete('/delete', checkController.remove);

/* POST checks */
router.post('/update', checkController.update);

module.exports = router;