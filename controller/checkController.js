//导入模型
const {
    createModel,
    listModel,
    deleteModel,
    updateModel,
    queryModelByCheckType,
    queryModelByCheckPeople,
} = require(process.cwd() + '/models/checkModel');

const {verify} = require(process.cwd() + '/utils/token')
//定义处理方法
/**
 * 创建审核信息表
 * @param {*} req 
 * @param {*} res 
 */
const create = async (req, res) => {
    //1、接收数据
    let postData = req.body;
    console.log(postData);
    const token = req.headers.token
    //2、过滤（忽略）
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
        let rs = await createModel(postData);
        //4、判断返回
        if(rs) {
            res.send({
                meta: {
                    state: 200,
                    msg: "添加成功"
                },
                data: rs
            })
        } else {
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
 * 获取审核信息列表
 * @param {*} req 
 * @param {*} res 
 */
const index = async (req, res) => {
    //1、接收数据
    const token = req.headers.token;
    //2、过滤（忽略）
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
        let data = await listModel();
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
 * 根据审核类型获取列表
 * @param {*} req 
 * @param {*} res 
 */
const queryByCheckType = async (req, res) => {
    //1、接收数据
    let getData = req.query;
    console.log("checkController:" + getData);
    const token = req.headers.token;
    //2、过滤（忽略）
    const verifyToken = verify(token);
    if (verifyToken.code === 403) {
        res.send({
            meta : {
                state: 403,
                msg: "登录已失效，请重新登录"
            },
            data : null
        })
    } else {
        //3、操作数据库
        let data = await queryModelByCheckType(getData);
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
 * 根据审核人获取列表
 * @param {*} req 
 * @param {*} res 
 */
const queryByCheckPeople = async (req, res) => {
    //1、接收数据
    let getData = req.query;
    const token = req.headers.token;
    //2、过滤（忽略）
    const verifyToken = verify(token);
    if (verifyToken.code === 403) {
        res.send({
            meta : {
                state: 403,
                msg: "登录已失效，请重新登录"
            },
            data : null
        })
    } else {
        //3、操作数据库
        let data = await queryModelByCheckPeople(getData);
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
 * 
 * @param {} req 
 * @param {*} res 
 */
const remove  = async (req, res) => {
    //1.接收数据
    let deleteData = req.body;
    console.log(deleteData);
    const token = req.headers.token;
    //2.过滤数据
    const verifyToken = verify(token);
    if (verifyToken.code === 403) {
        res.send({
            meta : {
                state: 403,
                msg: "登录已失效，请重新登录"
            },
            data : null
        })
    } else {
        //3.操作数据库
        let rs = await deleteModel(deleteData);
        //4.判断返回
        if(rs) {
            res.send({
                meta: {
                    state: 200,
                    msg: "删除成功"
                },
                data: null
            })
        }else {
            res.send({
                meta: {
                    state: 200,
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
    //2、过滤（忽略）
    const verifyToken = verify(token);
    if (verifyToken.code === 403) {
        res.send({
            meta : {
                state: 403,
                msg: "登录已失效，请重新登录"
            },
            data : null
        })
    }else {
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
    queryByCheckType,
    queryByCheckPeople
}