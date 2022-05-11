//一、导入模块
const mongoose = require('mongoose');
//加密模块
const Bcrypt = require('bcrypt');
//二、定义Schema(描述文档结构)
const UserSchema = new mongoose.Schema({
    user_username: {type:String,required: true,unique:true},
    user_password:{
        type: String,
        required: true,
        set (val) {
            return Bcrypt.hashSync(val, 10);
        }
    },
    user_name:{type:String,required: true},
    user_email:{type:String},
    user_phone:{type:String},
    createTime:{type:Number, default: Date.now},
    role_id:{type:String}
})

//三、设置数据模型（声明是哪个集合，限制字段个数和字段类型）
const UserModel = mongoose.model('users',UserSchema)

//四、方法
const filter = {user_password: 0, __v: 0}

const verifyModel  = (postData) => {
    return UserModel.find({user_username: postData.user_username})
    .then(res=>{
        console.log(res)
        return res
    })
    .catch(err => {
        console.log('登录失败' + err)
        return []
    })
}

/**
 * 增加用户
 */
const createModel = (postData) => {
    const insertObj = new UserModel(postData);
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
 * 获取用户列表
 */
const listModel  = () => {
    return UserModel.find({}, filter)
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
 * 根据用户名查询用户
 * @param {*} queryData 
 * @returns 
 */
const queryModel = (queryData) => {
    return UserModel.find(queryData)
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
 * 删除用户数据
 * @param {*} deleteData 删除的数据 
 * @returns 
 */
const deleteModel = (deleteData) => {
    const removeObj = new UserModel(deleteData);
    const userID = deleteData._id;
    return removeObj.deleteOne({_id: userID})
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
    const updataObj = new UserModel(updateData);
    console.log(updateData);
    console.log(updateData._id);
    return UserModel.findOneAndUpdate({ _id: updateData._id}, updateData)
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
    verifyModel,
    UserModel
}