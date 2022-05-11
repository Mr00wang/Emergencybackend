//导入模型
const {
    createModel,
    listModel,
    deleteModel,
    updateModel,
    queryModelByEpidemicName,
    AddEpidemicPeopleModel,
    MinusEpidemicPeopleModel
} = require(process.cwd() + '/models/epidemicModel');

const {verify} = require(process.cwd() + '/utils/token')
//定义处理方法
/**
 * 添加核酸检测点信息
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
 * 获取核酸检测点列表
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
 * 根据核酸检测点名称获取信息
 * @param {*} req 
 * @param {*} res 
 */
const queryByEpidemicName = async (req, res) => {
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
        let data = await queryModelByEpidemicName(getData);
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
 * 注意：先根据check_id更新状态已删除未写
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

/**
 * 登录人数
 * @param {*} req 
 * @param {*} res 
 */
const addEpidemicPeople = async (req, res) => {
    //1、接收数据
    let getData = req.query;
    // const token = req.headers.token;
    //2、过滤（忽略）
    // const verifyToken = verify(token);
    //3、操作数据库
    const rs = await AddEpidemicPeopleModel(getData);
    console.log("rs:" + rs);
    //4、判断返回
    if(rs) {
        // const data = Object.assign(updateData, rs)
        res.send({
            meta: {
                state: 200,
                msg: "登录成功"
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

/**
 * 核酸检测完成数据
 * @param {*} req 
 * @param {*} res 
 */
const minusEpidemicPeople = async (req, res) => {
    //1、接收数据
    let updateData = req.body;
    // const token = req.headers.token;
    //2、过滤（忽略）
    // const verifyToken = verify(token);
    //3、操作数据库
    const rs = await MinusEpidemicPeopleModel(updateData);
    console.log("rs:" + rs);
    //4、判断返回
    if(rs) {
        // const data = Object.assign(updateData, rs)
        res.send({
            meta: {
                state: 200,
                msg: "登出成功"
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

//导出成员
module.exports = {
    create,
    index,
    remove,
    update,
    queryByEpidemicName,
    addEpidemicPeople,
    minusEpidemicPeople
}