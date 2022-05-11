//一、导入模块
const mongoose = require('mongoose');

//二、定义Schema(描述文档结构)
const RoleSchema = new mongoose.Schema({
    role_name: {type:String, required: true, unique:true},
    role_menu: {type: Array},
    auth_name: {type:String}, // 授权人
    auth_time: {type:Number}, // 授权时间
    createTime:{type:Number, default: Date.now},
})

//三、设置数据模型（声明是哪个集合，限制字段个数和字段类型）
const RoleModel = mongoose.model('roles',RoleSchema)

//四、方法
const filter = { __v: 0}
/**
 * 增加角色
 */
const createModel = (postData) => {
    const insertObj = new RoleModel(postData);
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
 * 获取用户列表
 */
const listModel  = () => {
    return RoleModel.find({}, filter)
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
 * 根据用户ID查询用户
 * @param {*} queryData 
 * @returns 
 */
const queryMenusModel = (queryData) => {
    return RoleModel.find(queryData)
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
 * 根据用户名查询用户
 * @param {*} queryData 
 * @returns 
 */
const queryModel = (queryData) => {
    return RoleModel.find(queryData)
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
 * 删除用户数据
 * @param {*} deleteData 删除的数据 
 * @returns 
 */
const deleteModel = (deleteData) => {
    const removeObj = new RoleModel(deleteData);
    const roleID = deleteData._id;
    return removeObj.deleteOne({_id: roleID})
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
    // const updataObj = new RoleModel(updateData);
    // console.log(updateData);
    // console.log(updateData._id);
    return RoleModel.findOneAndUpdate({ _id: updateData._id}, updateData)
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
    queryModel,
    queryMenusModel,
    RoleModel
}