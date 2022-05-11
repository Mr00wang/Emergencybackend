//引入数据库mongoose
const mongoose = require('mongoose')
//1、引入express模块
const express = require('express');
const router = express.Router();
//2、创建app对象，通过语法express（）
const app = express();
const bodyparser = require('body-parser');
app.use(bodyparser.urlencoded({extended : true}));
app.use(bodyparser.json());
//中间件
// 声明使用静态中间件
app.use(express.static('public'))
//3、路由
const userRouter = require('./routes/user')
const roleRouter = require('./routes/role')
const helpRouter = require('./routes/help')
const checkRouter = require('./routes/check');
const emergencyRouter = require('./routes/emergency');
const goodsRouter = require('./routes/goods');
const volunteerRouter = require('./routes/volunteer');
const epidemicRouter = require('./routes/epidemic');
const fileRouter = require('./routes/file');
app.use('/api/user', userRouter);
app.use('/api/role', roleRouter);
app.use('/api/help', helpRouter);
app.use('/api/check', checkRouter);
app.use('/api/emergency', emergencyRouter);
app.use('/api/volunteer', volunteerRouter);
app.use('/api/goods', goodsRouter);
app.use('/api/epidemic', epidemicRouter);
app.use('/api/img', fileRouter);
// 通过mongoose连接数据库
//4、启动服务监听端口
mongoose.connect('mongodb://localhost:27017/emergency', {
    useNewUrlParser: true, 
    useUnifiedTopology: true
    // useCreateIndex: true
  })
  .then(() => {
    console.log('连接数据库成功!')
    // 只有当连接上数据库后才去启动服务器
    app.listen('5000', () => {
      console.log('服务器启动成功, 请访问: http://localhost:5000')
    })
    
  })
  .catch(error => {
    console.error('连接数据库失败', error)
  })