//一、导入模块
const mongoose = require('mongoose');

//二、定义Schema(描述文档结构)
const HelpSchema = new mongoose.Schema({
    help_name:    {type:String, required: true},
    help_phone:   {type:String},
    help_type:    {type:String}, 
    help_context: {type:String}, 
    help_address: {type:String}, 
    help_picture: {type:String}, 
    help_longitude:{type:String}, //经度
    help_latitude: {type:String},  //纬度
    help_emergency: {type:Number}, 
    help_time:    {type:Number, default: Date.now}, // 时间
    check_id:     {type: mongoose.Schema.Types.ObjectId, ref:'checks'},
})

//三、设置数据模型（声明是哪个集合，限制字段个数和字段类型）
const HelpModel = mongoose.model('helps',HelpSchema)

//四、方法
const filter = { __v: 0}
/**
 * 请求帮助
 */
const createModel = (postData) => {
    const insertObj = new HelpModel(postData);
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
    console.log(getData);
    return HelpModel.find(getData).populate("check_id")
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
 * 根据请求帮助姓名查询用户
 * @param {*} queryData 
 * @returns 
 */
const queryModelByHelpName = (queryData) => {
    let name = queryData.help_name;
    let searchNameRegExp = new RegExp(name);
    return HelpModel.find({"help_name":searchNameRegExp})
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
 * 根据请求帮助者电话查询用户
 * @param {*} queryData 
 * @returns 
 */
const queryModelByHelpPhone = (queryData) => {
    return HelpModel.find(queryData)
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
    const removeObj = new HelpModel(deleteData);
    const HelpID = deleteData._id;
    return removeObj.deleteOne({_id: HelpID})
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
    return HelpModel.findOneAndUpdate({ _id: updateData._id}, updateData)
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
    queryModelByHelpPhone,
    queryModelByHelpName,
    HelpModel
}