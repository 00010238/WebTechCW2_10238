const express = require('express')
const app = express()

const fs = require('fs')

app.set('view engine', 'pug')

app.use(express.static('public'))

app.get('/', (req, res) => {
    res.render('index')
})

app.get('/create', (req, res) => {
    res.render('create')
})

app.get('/my-blogs', (req, res) => {
    res.render('blogs')
})

app.get('/my-blogs/details', (req, res) => {
    res.render('detail')
})

app.listen(5050, (req, res) => {
    console.log('Running')
})