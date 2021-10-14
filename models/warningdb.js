const { Schema, model } = require('mongoose')

module.exports = model('warningdb', new Schema({
    GuildID: String,
    UserID: String,
    UserTag: String,
    Content: Array
}))