const Bcrypt = require('bcrypt');

//导入模型
const {
    createModel,
    listModel,
    deleteModel,
    updateModel,
    queryModel,
    verifyModel
} = require(process.cwd() + '/models/userModel');

const {RoleModel} = require(process.cwd() + '/models/roleModel')

const {verify, sign} = require(process.cwd() + '/utils/token')
const {decryptPwd} = require(process.cwd() + '/utils/decryptPwd')
//定义处理方法


/**
 * 用户登录
 * @param {*} req 
 * @param {*} res 
 */
const login = async (req, res) => {
    //1、接收数据
    let postData = req.body;
    //2、解密过滤
    let passwordRight = decryptPwd(postData.user_password);
    //3、操作数据库
    let [rs] = await verifyModel(postData);
    // console.log(rs);
    //4、判断返回
    if(!rs) {
        console.log(rs);
        res.send({
            meta: {
                state: 422,
                msg: "用户名不存在"
            },
            data: null
        })
    } else {
        const isPasswordValid = Bcrypt.compareSync(
            passwordRight, 
            rs.user_password
        );
        if (!isPasswordValid) {
            res.send({
                meta: {
                    state: 422,
                    msg: "密码不正确"
                },
                data: null
            })
        } else {
            //生成token
            const token = sign(String(rs._id));
            if (rs.role_id) {
            //根据角色ID获取权限菜单
                RoleModel.findOne({_id: rs.role_id})
                .then(role => {
                    rs._doc.role = role
                    // console.log('role user', rs)
                    res.send({
                        meta: {
                            state: 200,
                            msg: "登录成功"
                        },
                        data: rs,
                        token:token
                    })
                })
            } else {
                rs._doc.role = {role_menu: []}
                // 返回登陆成功信息(包含user)
                res.send({
                     meta: {
                            state: 200,
                            msg: "登录成功"
                    },
                    data: rs,
                    token:token
                })
            }
        }
    }
}

/**
 * 创建用户
 * @param {*} req 
 * @param {*} res 
 */
const create = async (req, res) => {
    //1、接收数据
    let postData = req.body;
    console.log(postData);
    const token = req.headers.token;
    //2、解密过滤 验证token
    
    const verifyToken = verify(token);
    if (verifyToken.code === 403) {
        res.send({
            meta: {
                state: 403,
                msg: "登录已失效，请重新登录"
            },
            data: null
        })
    } else {
        //密码解密
        let passwordRight = decryptPwd(postData.user_password);
        console.log("passwordRight:" + passwordRight);
        //修改提交密码
        postData['user_password'] = passwordRight;
        console.log(postData);
        //3、操作数据库
        let rs = await createModel(postData);
        //4、判断返回
        if(rs && rs !== 11000) {
            res.send({
                meta: {
                    state: 200,
                    msg: "添加成功"
                },
                data: rs
            })
        } else if(rs === 11000) {
            res.send({
                meta: {
                    state: 422,
                    msg: "用户名已存在"
                },
                data: null
            })
        }else {
            // console.log(rs);
            res.send({
                meta: {
                    state: 500,
                    msg: "添加失败"
                },
                data: null
            })
        }
    }
}

/**
 * 获取列表
 * @param {*} req 
 * @param {*} res 
 */
const index = async (req, res) => {
    //1、接收数据
    const token = String(req.headers.token);
    // let token2 = String(req.headers.authroization)
    // console.log(token);
    //  console.log(token2);
    //2、过滤 验证token
    const rs = verify(token);
    //3、操作数据库
    //4、判断返回
    // console.log(rs);
    if (rs.code === 200) {
        let data = await listModel();
        res.send({
            meta: {
                state: 200,
                msg: "查询成功"
            },
            data: data
        })
    }else {
        res.send({
            meta: {
                state: 403,
                msg: "登录已失效，请重新登录"
            },
            data: null
        })
    }
   
   
}

/**
 * 获取列表
 * @param {*} req 
 * @param {*} res 
 */
const queryByName = async (req, res) => {
    //1、接收数据
    const token = req.headers.token
    let getData = req.query;
    //2、过滤 验证token
    const verifyToken = verify(token);
    if (verifyToken.code === 403) {
        res.send({
            meta: {
                state: 403,
                msg: "登录已失效，请重新登录"
            },
            data: null
        })
    } else {
        //3、操作数据库
        let data = await queryModel(getData);
        //4、判断返回
        res.send({
            meta: {
                state: 200,
                msg: "查询成功"
            },
            data: data
        })
    }
}

/**
 * 删除数据
 * @param {} req 
 * @param {*} res 
 */
const remove  = async (req, res) => {
    //1.接收数据
    let deleteData = req.body;
    console.log(deleteData);
    const token = req.headers.token;
    //2.过滤数据 验证token
    const verifyToken = verify(token);
    if (verifyToken.code === 403) {
         res.send({
            meta: {
                state: 403,
                msg: "登录已失效，请重新登录"
            },
            data: null
        })
    }else {
        //3.操作数据库
        let rs = await deleteModel(deleteData);
        //4.判断返回
        if(rs) {
            res.send({
                meta: {
                    state: 200,
                    msg: "删除成功"
                },
                data: rs
            })
        }else {
            res.send({
                meta: {
                    state: 500,
                    msg: "删除失败"
                },
                data: null
            })
        }
    }
}

/**
 * 修改数据
 * @param {*} req 
 * @param {*} res 
 */
const update = async (req, res) => {
    //1、接收数据
    let updateData = req.body;
    const token = req.headers.token;
    //2、过滤（忽略） 验证token
    const verifyToken = verify(token);
    if (verifyToken.code === 403) {
        res.send({
            meta: {
                state: 403,
                msg: "登录已失效，请重新登录"
            },
            data: null
        })
    } else {
        //3、操作数据库
        const rs = await updateModel(updateData);
        console.log("rs:" + rs);
        //4、判断返回
        if(rs) {
            // const data = Object.assign(updateData, rs)
            res.send({
                meta: {
                    state: 200,
                    msg: "修改成功"
                },
                data: rs
            })
        } else {
            res.send({
                meta: {
                    state: 500,
                    msg: "修改失败"
                },
                data: null
            })
        }
    }
}
//导出成员
module.exports = {
    create,
    index,
    remove,
    update,
    queryByName,
    login
}