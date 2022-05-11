//一、导入模块
const mongoose = require('mongoose');

//二、定义Schema(描述文档结构)
const EpidemicSchema = new mongoose.Schema({
    epidemic_name:     {type:String, required: true},
    epidemic_address:   {type:String}, 
    epidemic_picture:   {type:String},
    epidemic_illustrate: {type:String}, 
    epidemic_longitude: {type:String}, //经度
    epidemic_latitude:  {type:String},  //纬度
    epidemic_startTime: {type:Number}, 
    epidemic_endTime:   {type:String},
    createTime:        {type:Number, default: Date.now}, // 时间
    epidemic_totalPeople: {type:Number}, 
    check_id:          {type:String},
})

//三、设置数据模型（声明是哪个集合，限制字段个数和字段类型）
const EpidemicModel = mongoose.model('epidemics',EpidemicSchema)

//四、方法
const filter = { __v: 0}
/**
 * 添加核算检测点
 */
const createModel = (postData) => {
    const insertObj = new EpidemicModel(postData);
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
 * 获取核算检测点列表
 */
const listModel  = () => {
    return EpidemicModel.find({}, filter)
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
 * 根据核酸检测点名称查询信息
 * @param {*} queryData 
 * @returns 
 */
const queryModelByEpidemicName = (queryData) => {
    let name = queryData.help_name;
    let searchNameRegExp = new RegExp(name);
    return EpidemicModel.find({"epidemic_name":searchNameRegExp})
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
    const removeObj = new EpidemicModel(deleteData);
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
    return EpidemicModel.findOneAndUpdate({ _id: updateData._id}, updateData)
    .then((doc) => {
      return doc;
    })
    .catch(error => {
      console.error('修改失败', error);
      return false;
    })
}

const AddEpidemicPeopleModel = (updateData) => {
    return EpidemicModel.findOneAndUpdate(
        { _id: updateData._id}, 
        {$inc:
            {epidemic_totalPeople : 1}
        })
    .then((doc) => {
      return doc;
    })
    .catch(error => {
      console.error('添加失败', error);
      return false;
    })
};

const MinusEpidemicPeopleModel = (updateData) => {
    return EpidemicModel.findOneAndUpdate(
        { _id: updateData._id}, 
        {$inc:
            {epidemic_totalPeople : -1}
        })
    .then((doc) => {
      return doc;
    })
    .catch(error => {
      console.error('添加失败', error);
      return false;
    })
};
module.exports = {
    createModel,
    listModel,
    deleteModel,
    updateModel,
    queryModelByEpidemicName,
    AddEpidemicPeopleModel,
    MinusEpidemicPeopleModel,
    EpidemicModel
}