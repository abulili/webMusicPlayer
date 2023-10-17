// 用户模块路由文件
const express = require('express')
const session = require('express-session')
const pool = require('../pool')

const userRouter = express.Router()
userRouter.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}))
// 注册接口
// http://127.0.0.1:3000/reg.html
userRouter.post('/reg', (req, res) => {
    console.log(req.body)
    pool.query('select * from user where username=?', req.body.username, (err, result) => {
        console.log('通过用户名查询结果:', result)
        if (result.length == 0) {
            console.log('该用户不存在,开始注册')
            pool.query('insert into user values(null, ?, ?, ?, false)', [req.body.username, req.body.password, req.body.nick])
            res.send('1')
        } else {
            console.log('该用户已存在')
            res.send('2')
        }
    })
})

// 登录接口
userRouter.post('/login', (req, res) => {
    console.log(req.body)
    pool.query('select * from user where username=?', req.body.username, (err, result) => {
        if (res.length != 0) {
            console.log('用户存在: ', result[0])
            if (req.body.password == result[0].password) {
                console.log('密码输入正确')
                req.session.user = result[0] // 登陆数据存在session
                res.send('1')
            } else {
                console.log('密码错误')
                res.send('2')
            }
        } else {
            console.log('用户不存在')
        }
    })
})

// 用户登录信息接口
userRouter.get('/isLogin', (req, res) => {
    // 拿值
    console.log('登陆数据', req.session.user)
    res.send(req.session.user)
})

// 登出
userRouter.get('/logout', (req, res) => {
    // 将session中的数据清除
    req.session.destroy()
})

// 返回用户列表
userRouter.get('/list', (req, res) => {
    pool.query('select * from user', (err, result) => {
        console.log('用户列表信息', result)
        res.send(result)
    })
})

// id删除用户
userRouter.get('/del', (req, res) => {
    console.log('删除用户id:', req.query.id)
    pool.query('delete from user where id=?', req.query.id, err => { })
})

// 根据id查询用户数据
userRouter.get('/detail', (req, res) => {
    console.log('/detail-id:', req.query.id)
    pool.query('select * from user where id=?', req.query.id, (err, result) => {
        console.log('得到的用户数据为:', result)
        // 查询出的结果是数组,只需要第一个
        res.send(result[0])
    })
})

// 修改用户数据
userRouter.post('/send', (req, res) => {
    console.log('更新的数据:', req.body)
    pool.query('select * from user where id=?', req.body.id, (err, result) => {
        if (req.body.password == result[0].password) {
            res.send('2')
        } else {
            pool.query('update user set password=? where id=?', [req.body.password, req.body.id], err => {
                res.send('1')
            })
        }
    })
})

// 修改用户身份
userRouter.post('/sendAdmin', (req, res) => {
    console.log(req.body.admin)
    pool.query('update user set admin=? where id=?', [req.body.admin, req.body.id], err => {
        res.send('1')
    })
})


module.exports = userRouter
