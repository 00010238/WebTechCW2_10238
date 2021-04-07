const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const fs = require('fs')

const BlogDB = require('./routes/blogs')

app.set('view engine', 'pug')

app.use(express.static('public'))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}));

app.use('/blogs', BlogDB)

app.get('/', (req, res) => {
    res.render('index')
})

app.get('/api/blogs', (req, res) => {
    fs.readFile('./data/my-blogs.json', (err, data) => {
        if(err) throw err

        const blogs = JSON.parse(data)
        res.json(blogs)
    })
})

app.listen(5050, () => {
    console.log('Running')
})