//一、导入模块
const mongoose = require('mongoose');

//二、定义Schema(描述文档结构)
const CheckSchema = new mongoose.Schema({
    check_type:    {type:String}, 
    type_id:  {type: mongoose.Schema.Types.ObjectId, ref:'volunteers'},
    check_people:  {type:String, default: ""},
    check_status:  {type:Number, default: 0},
    check_text:    {type:String, default: ""},
    check_time:    {type:Number}, // 时间
    createTime:    {type:Number, default: Date.now},
})

const CheckHelpSchema = new mongoose.Schema({
    check_type:    {type:String}, 
    type_id:  {type: mongoose.Schema.Types.ObjectId, ref:'helps'},
    check_people:  {type:String, default: ""},
    check_status:  {type:Number, default: 0},
    check_text:    {type:String, default: ""},
    check_time:    {type:Number}, // 时间
    createTime:    {type:Number, default: Date.now},
})

const CheckEmergencySchema = new mongoose.Schema({
    check_type:    {type:String}, 
    type_id:  {type: mongoose.Schema.Types.ObjectId, ref:'emergencys'},
    check_people:  {type:String, default: ""},
    check_status:  {type:Number, default: 0},
    check_text:    {type:String, default: ""},
    check_time:    {type:Number}, // 时间
    createTime:    {type:Number, default: Date.now},
})

const CheckGoodsSchema = new mongoose.Schema({
    check_type:    {type:String}, 
    type_id:  {type: mongoose.Schema.Types.ObjectId, ref:'goods'},
    check_people:  {type:String, default: ""},
    check_status:  {type:Number, default: 0},
    check_text:    {type:String, default: ""},
    check_time:    {type:Number}, // 时间
    createTime:    {type:Number, default: Date.now},
})

//三、设置数据模型（声明是哪个集合，限制字段个数和字段类型）
const CheckModel = mongoose.model('checks', CheckSchema, 'checks');
const CheckHelpModel = mongoose.model('checkhelp', CheckHelpSchema, 'checks');
const CheckEmergencyModel = mongoose.model('checkemergency', CheckEmergencySchema, 'checks');
const CheckGoodsModel = mongoose.model('checkgoods', CheckGoodsSchema, 'checks');
// const CheckHelpModel = mongoose.model('checks', CheckHelpSchema)

//四、方法
const filter = { __v: 0}
/**
 * 创建审核
 */
const createModel = (postData) => {
    const CheckModel = mongoose.model('checks', CheckSchema);
    const insertObj = new CheckModel(postData);
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
 * 获取审核列表
 */
const listModel  = (getData) => {
    return CheckModel.find(getData, filter).populate('check_id')
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
 * 根据审核类型查询审核信息
 * @param {*} queryData 
 * @returns 
 */
const queryModelByCheckType = (queryData) => {
    const type = queryData.check_type;
    console.log('querycheckType:' + type);
    if (type === '志愿者信息') {
        return CheckModel.find(queryData).populate('type_id')
        .then(res => {
            console.log(res)
            return res
        })
        .catch(err => {
            console.log('查询失败' + err)
            return []
        })
    } else if (type === "求助信息") {
         return CheckHelpModel.find(queryData).populate('type_id')
        .then(res => {
            console.log(res)
            return res
        })
        .catch(err => {
            console.log('查询失败' + err)
            return []
        })
    } else if (type === "应急信息") {
         return CheckEmergencyModel.find(queryData).populate('type_id')
        .then(res => {
            console.log(res)
            return res
        })
        .catch(err => {
            console.log('查询失败' + err)
            return []
        })
    }  else if (type === "资源信息") {
         return CheckGoodsModel.find(queryData).populate('type_id')
        .then(res => {
            console.log(res)
            return res
        })
        .catch(err => {
            console.log('查询失败' + err)
            return []
        })
    }
   
}

/**
 * 根据审核人查询审核信息
 * @param {*} queryData 
 * @returns 
 */
const queryModelByCheckPeople = (queryData) => {
    return CheckModel.find(queryData)
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
 * 删除审核数据
 * 注意：先根据check_id更新状态已删除
 * @param {*} deleteData 删除的数据 
 * @returns 
 */
const deleteModel = (deleteData) => {
    const removeObj = new CheckModel(deleteData);
    const CheckID = deleteData._id;
    return removeObj.deleteOne({_id: CheckID})
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
 * 更新审核数据
 * @param {*} updateData 
 * @returns 
 */
const updateModel = (updateData) => {
    // const updataObj = new HelpModel(updateData);
    console.log(updateData);
    // console.log(updateData._id);
    return CheckModel.findOneAndUpdate({ _id: updateData._id}, updateData)
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
    queryModelByCheckType,
    queryModelByCheckPeople,
    CheckModel,
    CheckHelpModel,
    CheckEmergencyModel,
    CheckGoodsModel
}