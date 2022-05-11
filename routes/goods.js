var express = require('express');
var router = express.Router();

const GoodsController = require(process.cwd() + '/controller/goodsController');

/* GET goods listing. */
router.get('/query', GoodsController.index);

/* GET goods listing. */
router.get('/queryByGoodsName', GoodsController.queryByGoodsName);

/* GET goods listing. */
router.get('/queryByGoodsType', GoodsController.queryByGoodsType);

/* POST goods */
router.post('/create', GoodsController.create);

/* Delete goods */
router.delete('/delete', GoodsController.remove);

/* POST goods */
router.post('/update', GoodsController.update);


module.exports = router;