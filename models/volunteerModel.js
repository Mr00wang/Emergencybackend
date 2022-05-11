//一、导入模块
const mongoose = require('mongoose');

//二、定义Schema(描述文档结构)
const VolunteerSchema = new mongoose.Schema({
    volunteer_name:   {type:String,required: true},
    volunteer_phone:  {type:String},
    volunteer_address:{type:String},
    volunteer_time:   {type:Number, default: Date.now},
    check_id:         {type: mongoose.Schema.Types.ObjectId, ref:'checks', default: "62753c228d2b680004573657"}
     
})

//三、设置数据模型（声明是哪个集合，限制字段个数和字段类型）
const VolunteerModel = mongoose.model('volunteers', VolunteerSchema)

//四、方法
const filter = {__v: 0}

/**
 * 申请志愿者
 */
const createModel = (postData) => {
    const insertObj = new VolunteerModel(postData);
    return insertObj.save()
    .then(doc =>{
        console.log(doc)
        return doc
    })
    .catch(err => {
        console.log('插入失败' + err)
        return err.code;
    })
}

/**
 * 获取志愿者列表
 */
const listModel  = () => {
    return VolunteerModel.find({}).populate('check_id')
    .then(res=>{
        console.log(res)
        return res
    })
    .catch(err => {
        console.log('查询失败' + err)
        return []
    })
}

/**
 * 根据姓名查询志愿者
 * @param {*} queryData 
 * @returns 
 */
const queryModelByVolunteerName = (queryData) => {
    return VolunteerModel.find(queryData)
    .then(res=>{
        console.log(res)
        return res
    })
    .catch(err => {
        console.log('查询失败' + err)
        return []
    })
}

/**
 * 删除志愿者数据
 * @param {*} deleteData 删除的数据 
 * @returns 
 */
const deleteModel = (deleteData) => {
    const removeObj = new VolunteerModel(deleteData);
    const volunteerID = deleteData._id;
    return removeObj.deleteOne({_id: volunteerID})
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
 * 修改用户
 * @param {*} updateData 
 * @returns 
 */
const updateModel = (updateData) => {
    return VolunteerModel.findOneAndUpdate({ _id: updateData._id}, updateData)
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
    queryModelByVolunteerName,   
    VolunteerModel
}