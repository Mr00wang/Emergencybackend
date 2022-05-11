// 导入jsonwebtoken
const jwt = require('jsonwebtoken')
const fs = require('fs');
const path = require('path')
// 本地的密钥，随便定义
// const publicKey = fs.readFileSync(path.resolve(__dirname, '../rsa/rsa_1024_pub.pem'));
const publicKey = "wangjinglong"
// token过期时间
const TIME = 60*60*6
 
// 生成token
const sign = (_id) => {
  // 要生成token的主题信息
  let content = {_id: _id}
  // 加密的key（密钥）
  let privateKey = publicKey
 
  let token = jwt.sign(content, privateKey, {
    // 过期时间（秒）
    expiresIn: TIME
  })
 
  return token
}
 
// 验证token
const verify = (token) => {
    try {
        const {_id} = jwt.verify(token, publicKey);
        return {
            code: 200,
            msg: '校验成功',
            _id
        };
    } catch {
         return {
            code: 403,
            msg: '校验失败'
        };
    }
  
}

module.exports = {
    sign,
    verify
}