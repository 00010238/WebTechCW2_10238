const fs = require('fs')
const path = require('path')

const IdGenerator = require('./localModules').randomGenerator
const rootFolder = require('./localModules').rootFolder

class BlogsDB {
    constructor() {
        this.database = null;
    }

    findDatabase(database = '') {
        this.database = path.join(rootFolder, `data/${database}`)
    }

    getBlog(id, success, error) {
        fs.readFile(this.database, 'utf8', (err, data) => {
            if(err) error()

            const blogs = JSON.parse(data)
            const blog = blogs.filter(blog => blog.id == id)[0]
            success(blog)
        })
    }

    getAll(success, error) {
        fs.readFile(this.database, "utf8", (err, data) => {
            if(err) error()

            const blogs = JSON.parse(data)
            success(blogs)
        })
    }

    saveBlog(newBlog, success, error) {
        fs.readFile(this.database, 'utf8', (err, data) => {
            if(err) error()

            const blogs = JSON.parse(data)

            blogs.push({
                id: IdGenerator(),
                title: newBlog.title,
                content: newBlog.content
            })
            
            fs.writeFile(this.database, JSON.stringify(blogs), err => {
                if(err) error()

                success()
            })
        })    
    }

    update(selectedBlog, id, success, error) {
        fs.readFile(this.database, 'utf8', (err, data) => {
            if(err) error()

            const blogs = JSON.parse(data)
            const updated = blogs.filter(blog => blog.id != id) || []

            let blog = blogs.filter(blog => blog.id == id)[0]

            blog = {
                id: id,
                title: selectedBlog.title,
                content: selectedBlog.content
            }

            updated.push(blog)

            fs.writeFile(this.database, JSON.stringify(updated), err => {
                if(err) error()

                success()
            })
        })
    }

    delete(id, succes, error) {
        fs.readFile(this.database, 'utf8', (err, data) => {
            if(err) error()

            const blogs = JSON.parse(data)
            const deleted = blogs.filter(blog => blog.id != id) || []

            fs.writeFile(this.database, JSON.stringify(deleted), err => {
                if(err) error()
                succes()
            })
        })
    }
}

module.exports = BlogsDB;