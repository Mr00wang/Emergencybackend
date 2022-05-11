const fs = require('fs');
const path = require('path');
const NodeRSA = require('node-rsa');

/**
 * 解密
 * @param {*} user_password 
 * @returns 
 */
const decryptPwd = (user_password) => {
    const privateKey = fs.readFileSync(path.resolve(__dirname, '../rsa/rsa_1024_priv.pem'));
    const nodersa = new NodeRSA(privateKey);
    // 因为 jsencrypt 自身使用的是 pkcs1 加密方案, nodejs 需要修改成 pkcs1
    nodersa.setOptions({ encryptionScheme: 'pkcs1' });
    passwordRight = nodersa.decrypt(user_password, 'utf-8');
    console.log('passwordRight:', passwordRight);
    return passwordRight;
}

module.exports = {
    decryptPwd
}