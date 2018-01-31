const express = require('express')

const Comment = require('../models/comment')
const { log } = require('../utils')
const { currentUser } = require('./main')

const comment = express.Router()

comment.post('/add', (request, response) => {
    const u = currentUser(request)
    const form = request.body
    const c = Comment.create(form)
    c.userId = u.id
    c.save()

    response.redirect('/weibo')
})

comment.get('/delete/:commentId', (request, response) => {
    const commentId = Number(request.params.commentId)
    const c = Comment.remove(commentId)
    response.redirect('/weibo')
})

comment.get('/edit/:commentId', (request, response) => {
    const id = Number(request.params.commentId)
    const c = Comment.get(id)
    const args = {
        comment: c,
    }
    response.render('comment/edit.html', args)
})

comment.post('/update', (request, response) => {
    const form = request.body
    const c = Comment.update(form)
    response.redirect('/weibo')
})

module.exports = comment