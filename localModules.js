const path = require('path')

module.exports.randomGenerator = function() {
    return "" + Math.random().toString(36).substr(2, 9)
}

const rootFolder = path.dirname(
    require.main.filename || process.require.main.filename
)

module.exports.rootFolder = rootFolder

module.exports.dataValidator = function(data) {
    if(data.title.trim() === '' || data.content.trim() === '') {
        return false
    } else return true
}

// module.exports.getBlogs = function(database) {
//     return path.join(rootFolder, `data/${database}`)
// }