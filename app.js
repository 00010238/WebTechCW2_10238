const express = require('express')
const app = express()
const bodyParser = require('body-parser')

const BlogDB = require('./routes/blogs')

app.set('view engine', 'pug')

app.use(express.static('public'))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}));

app.use('/blogs', BlogDB)

app.get('/', (req, res) => {
    res.render('index')
})

app.listen(5050, () => {
    console.log('Running')
})