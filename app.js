/*
*服务器入口文件
*创建日期:2023/9/20
*开发者:abulili
*/

const express = require('express')
const bodyParser = require('body-parser')
const fs = require('fs')
const multiparty = require('multiparty')
const moment = require('moment-timezone')

const userRouter = require('./router/user')
const musicRouter = require('./router/music')

const server = express()
server.listen(3000, () => {
    console.log('http://127.0.0.1:3000')
})


server.use(express.static(__dirname + "/public"))
server.use(bodyParser.json())
server.use(bodyParser.urlencoded({
    extended: false
}))
server.use('/user', userRouter)
server.use('/music', musicRouter)

server.post('/upload/music', (req, res) => {
    let form = new multiparty.Form();
    // 上传图片需要保存到一个目录,目录必须存在
    form.uploadDir = './public/upload/music'
    form.parse(req, (err, fields, files) => {
        console.log(files.file[0].path)
        res.send(files.file[0].path)//返回文件存储路径
    })
})

server.post('/upload/imgs', (req, res) => {
    let form = new multiparty.Form();
    // 上传图片需要保存到一个目录,目录必须存在
    form.uploadDir = './public/upload/imgs'
    form.parse(req, (err, fields, files) => {
        console.log(files.picFile[0].path)
        res.send(files.picFile[0].path)//返回文件存储路径
    })
})

//处理图片删除,get获取图片路径,删除图片
server.get('/remove/music', (req, res) => {
    console.log(req.query.name)
    // 根据图片的存储路径进行删除
    fs.unlink(req.query.name, err => {
        console.log("删除完成")
    })
})

//处理图片删除,get获取图片路径,删除图片
server.get('/remove/imgs', (req, res) => {
    console.log(req.query.name)
    // 根据图片的存储路径进行删除
    fs.unlink(req.query.name, err => {
        console.log("删除完成")
    })
})

