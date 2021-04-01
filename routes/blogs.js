const express = require('express')
const router = express.router()

const fs = require('fs')

router.get('/create', (req, res) => {
    res.render('create', {})
})

router.post('/create', (req, res) => {
    let blogData = req.body

    if(isValid(blogData)) {
        fs.readFile(blogData, (err, data) => {
            if (err) errorCb();
      
            const records = JSON.parse(data);
      
            records.push({
                id: generateID(),
                title: newRecord.title,
                body: newRecord.body,
            });
      
            fs.writeFile(blogData, JSON.stringify(records), err => {
                if (err) errorCb();
                successCb();
            });
        });
    } else {

    }
})

function isValid(data) {
    if(data.title.trim() === '' || data.content.trim() === '') {
        return false
    } else return true
}