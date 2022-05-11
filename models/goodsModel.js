//一、导入模块
const mongoose = require('mongoose');

//二、定义Schema(描述文档结构)
const GoodsSchema = new mongoose.Schema({
    goods_name:   {type:String, required: true},
    goods_type:   {type:String}, 
    goods_detail: {type:String}, 
    goods_origin: {type:String}, 
    goods_time:   {type:Number, default: Date.now}, // 时间
    check_id:     {type: mongoose.Schema.Types.ObjectId, ref:'checks'},
})

//三、设置数据模型（声明是哪个集合，限制字段个数和字段类型）
const GoodsModel = mongoose.model('goods',GoodsSchema)

//四、方法
const filter = { __v: 0}
/**
 * 请求帮助
 */
const createModel = (postData) => {
    const insertObj = new GoodsModel(postData);
    return insertObj.save()
    .then(doc =>{
        console.log(doc)
        return doc
    })
    .catch(err => {
        console.log('添加失败' + err)
        return err.code;
    })
}

/**
 * 获取请求帮助列表
 */
const listModel  = (getData) => {
    return GoodsModel.find(getData, filter).populate('check_id')
    .then(res => {
        console.log(res)
        return res
    })
    .catch(err => {
        console.log('查询失败' + err)
        return []
    })
}

/**
 * 根据资源名称查询信息
 * @param {*} queryData 
 * @returns 
 */
const queryModelByGoodsName = (queryData) => {
    let name = queryData.goods_name;
    let searchNameRegExp = new RegExp(name);
    return GoodsModel.find({"goods_name" : searchNameRegExp})
    .then(res => {
        console.log(res)
        return res
    })
    .catch(err => {
        console.log('查询失败' + err)
        return []
    })
}

/**
 * 根据资源类型查询信息
 * @param {*} queryData 
 * @returns 
 */
const queryModelByGoodsType = (queryData) => {
    return GoodsModel.find(queryData)
    .then(res => {
        console.log(res)
        return res
    })
    .catch(err => {
        console.log('查询失败' + err)
        return []
    })
}

/**
 * 删除请求帮助者数据
 * 注意：先根据check_id更新状态已删除
 * @param {*} deleteData 删除的数据 
 * @returns 
 */
const deleteModel = (deleteData) => {
    const removeObj = new GoodsModel(deleteData);
    const GoodsID = deleteData._id;
    return removeObj.deleteOne({_id: GoodsID})
    .then(res=>{
        console.log(res)
        return res
    })
    .catch(err => {
        console.log('删除失败' + err)
        return false
    })
}

/**
 * 修改请求帮助数据
 * @param {*} updateData 
 * @returns 
 */
const updateModel = (updateData) => {
    // const updataObj = new HelpModel(updateData);
    console.log(updateData);
    // console.log(updateData._id);
    return GoodsModel.findOneAndUpdate({ _id: updateData._id}, updateData)
    .then((doc) => {
      return doc;
    })
    .catch(error => {
      console.error('修改失败', error);
      return false;
    })
}
module.exports = {
    createModel,
    listModel,
    deleteModel,
    updateModel,
    queryModelByGoodsName,
    queryModelByGoodsType,
    GoodsModel
}