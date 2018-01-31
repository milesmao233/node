const express = require('express')

const Weibo = require('../models/weibo')
const { log } = require('../utils')
const { currentUser } = require('./main')

// 使用 express.Router 可以创建模块化的路由
// 类似我们以前实现的形式
const weibo = express.Router()

// 实际上匹配的路由是 /todo/
weibo.get('/', (request, response) => {
    const weiboList = Weibo.all()
    const args = {
        weibos: weiboList,
    }
    response.render('weibo/index.html', args)
})

weibo.get('/new', (request, response) => {
    response.render('weibo/new.html')
})

weibo.post('/add', (request, response) => {
    const u = currentUser(request)
    const form = request.body
    const w = Weibo.create(form)
    w.userId = u.id
    w.save()

    response.redirect('/weibo')
})

weibo.get('/delete/:weiboId', (request, response) => {
    const weiboId = Number(request.params.weiboId)
    const w = Weibo.remove(weiboId)
    response.redirect('/weibo')
})

weibo.get('/edit/:weiboId', (request, response) => {
    const id = Number(request.params.weiboId)
    const t = Weibo.get(id)
    const args = {
        weibo: t,
    }
    response.render('weibo/edit.html', args)
})

weibo.post('/update', (request, response) => {
    const form = request.body
    const t = Weibo.update(form)
    response.redirect('/weibo')
})



module.exports = weibo

