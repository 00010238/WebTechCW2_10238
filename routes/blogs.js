const express = require('express')
const router = express.Router()

const path = require('path')
const fs = require('fs')

const Validator = require('../localModules').dataValidator

const BlogsDB = require('../dbClass')

const blogDatabase = new BlogsDB()
blogDatabase.findDatabase('my-blogs.json')

router.get('/', (req, res) => {
    blogDatabase.getAll(
        blogs => res.render('blogs', { items: blogs }), 
        () => res.render('blogs', { items: null })
    )
})

router.get('/create', (req, res) => {
    res.render('create', {})
})

router.post('/create', (req, res) => {
    if(Validator(req.body)) {
        blogDatabase.saveBlog(req.body, () => res.render('create', {success: true}))
    } else res.render('create', {success: false, error: true})
})

router.get('/:id', (req, res) => {
    blogDatabase.getBlog (
        req.params.id,
        blog => res.render('blogDetail', { item: blog })
    )
})

router.get('/:id/delete', (req, res) => {
    blogDatabase.delete(
        req.params.id, () => res.redirect('/blogs'))
})

module.exports = router