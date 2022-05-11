var express = require('express');
var router = express.Router();

const userController = require(process.cwd() + '/controller/userController');
/* POST user Login */
router.post('/login', userController.login);

/* GET users listing. */
router.get('/query', userController.index);

/* GET users listing. */
router.get('/queryByName', userController.queryByName);

/* POST user */
router.post('/create', userController.create);

/* Delete user */
router.delete('/delete', userController.remove);

/* POST user */
router.post('/update', userController.update);
module.exports = router;