//导入模型
const {
    createModel,
    listModel,
    deleteModel,
    updateModel,
    queryModelByVolunteerName,
} = require(process.cwd() + '/models/volunteerModel');

const checkModel = require(process.cwd() + '/models/checkModel');
const {verify} = require(process.cwd() + '/utils/token')
//定义处理方法

/**
 * 新添志愿者
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
        //3、操作数据库
        let rs = await createModel(postData);
        //4、判断返回
        if(rs) {
            console.log("volunteer");
            console.log(rs);
            let checkObj = {
                "check_type":  "志愿者信息", 
                "type_id": rs._id,
            } 
            console.log(checkObj);
            let checkRs = await checkModel.createModel(checkObj);
            console.log(checkRs);
            rs["check_id"] = checkRs._id;
            let updateRs = await updateModel(rs);
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
 * 获取列表
 * @param {*} req 
 * @param {*} res 
 */
const index = async (req, res) => {
    //1、接收数据
    const token = String(req.headers.token);
    //2、过滤 验证token
    const rs = verify(token);
    //4、判断返回
    // console.log(rs);
    if (rs.code === 200) {
        //3、操作数据库
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
 * 根据志愿者姓名查询列表
 * @param {*} req 
 * @param {*} res 
 */
const queryByVolunteerName = async (req, res) => {
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
        let data = await queryModelByVolunteerName(getData);
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
    let deleteData = req.query;
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
    queryByVolunteerName
}