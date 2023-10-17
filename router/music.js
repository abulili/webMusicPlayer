// 歌曲模块路由文件
const express = require('express')
const session = require('express-session')
const pool = require('../pool')
const moment = require('moment-timezone')

const musicRouter = express.Router()

// 列表
musicRouter.get('/list', (req, res) => {
    pool.query('select * from musicList', (req, result) => {
        res.send(result)
    })
})

// 添加
musicRouter.post('/send', (req, res) => {
    console.log('歌曲值为:', req.body)
    let v = req.body;
    if (v.mp3url == '' || v.title == '' || v.author == '' || v.categroy == '' || v.uploadId == '') {//判断是否选择图片
        res.send("2")
    } else {
        let localTime = moment.tz('Asia/Shanghai').format('YYYY年MM月DD日 HH:mm:ss')
        let Imgurl = '\\upload\\imgs\\a.jpg'
        if (v.Imgurl != '') {
            Imgurl = req.body.Imgurl.replace('public', '')
        }
        let mp3url = req.body.mp3url.replace('public', '')
        pool.query('insert into musicList values(null,?,?,?,?,?,?,?,?)', [v.title, v.author, v.categroy, v.lyric, localTime, v.uploadId, Imgurl, mp3url], err => {
            if (err) throw err;
            console.log('上传成功')
            res.send("1")
        })
    }
})

// 删除歌
musicRouter.get('/del', (req, res) => {
    pool.query('delete from musicList where id=?', req.query.id, err => {
        console.log('删除成功')
    })
})

// 查询搜索
musicRouter.get('/search', (req, res) => {
    pool.query(`select * from musicList where title like "%${req.query.wd}%"`, (err, result) => {
        res.send(result)
    })
})

// 查询是否喜欢
musicRouter.get('/likeif', (req, res) => {
    pool.query('select * from likeList where belong =? and loveId = ?', [req.query.userid, req.query.musicid], (err, result) => {
        console.log(result)
        res.send(result)
    })
})

// 查询是否喜欢
musicRouter.get('/like', (req, res) => {
    pool.query('select * from likeList where belong=?', req.query.id, (err, result) => {
        res.send(result)
    })
})

// 进一步查询喜欢,查询指定歌
musicRouter.get('/likely', (req, res) => {
    pool.query('select * from musicList where id=?', req.query.id, (err, result) => {
        res.send(result)
        console.log(result)
    })
})

// 查询歌曲标签
musicRouter.get('/categroy', (req, res) => {
    pool.query('select * from musicList where categroy=?', req.query.categroy, (err, result) => {
        res.send(result)
        console.log(result)
    })
})

// 删除喜欢的歌
musicRouter.get('/delLike', (req, res) => {
    pool.query('delete from likeList where id=?', req.query.id, err => {
        console.log('删除成功')
    })
})

// 添加喜欢
musicRouter.post('/sendLike', (req, res) => {
    console.log('歌曲值为:', req.body)
    let v = req.body;
    pool.query('insert into likeList values(null,?,?)', [v.userId, v.id], err => {
        if (err) throw err;
        console.log('收藏成功')
        res.send("1")
    })
})



module.exports = musicRouter