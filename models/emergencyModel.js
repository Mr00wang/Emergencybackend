//一、导入模块
const mongoose = require('mongoose');

//二、定义Schema(描述文档结构)
const EmergencySchema = new mongoose.Schema({
    emergency_type:    {type:String},
    emergency_title:   {type:String},  
    emergency_context: {type:String}, 
    emergency_picture: {type:String}, 
    emergency_longitude:{type:String}, //经度
    emergency_latitude:{type:String},  //纬度
    emergency_emergency: {type:Number}, 
    emergency_time:    {type:Number, default: Date.now}, // 时间
    check_id:           {type: mongoose.Schema.Types.ObjectId, ref:'checks'}
})

//三、设置数据模型（声明是哪个集合，限制字段个数和字段类型）
const EmergencyModel = mongoose.model('emergencys',EmergencySchema)

//四、方法
const filter = { __v: 0}
/**
 * 添加应急信息
 */
const createModel = (postData) => {
    const insertObj = new EmergencyModel(postData);
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
 * 获取应急信息列表
 */
const listModel  = (getData) => {
    return EmergencyModel.find(getData, filter).populate('check_id')
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
 * 根据应急信息类型查询应急信息
 * @param {*} queryData 
 * @returns 
 */
const queryModelByEmergencyType = (queryData) => {
    return EmergencyModel.find(queryData)
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
 * 根据应急信息题目查询应急信息
 * @param {*} queryData 
 * @returns 
 */
const queryModelByEmergencyTitle = (queryData) => {
    let title = queryData.emergency_title;
    let searchTitleRegExp = new RegExp(title);
    return EmergencyModel.find({"emergency_title" : searchTitleRegExp})
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
    const removeObj = new EmergencyModel(deleteData);
    const Emergency = deleteData._id;
    return removeObj.deleteOne({_id: Emergency})
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
    return EmergencyModel.findOneAndUpdate({ _id: updateData._id}, updateData)
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
    queryModelByEmergencyType,
    queryModelByEmergencyTitle,
    EmergencyModel
}