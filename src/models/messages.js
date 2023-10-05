const mongoose = require('mongoose');
// const Schema = mongoose.Schema();
const MessageSchema = mongoose.Schema({
    username: {
        type: String,
        require: true
    },
    email:{
        type: String,
        requireL: true
    },
    idea:{
        type: String,
        require: true
    },

    date: { type: Date, default: Date.now }
})
const Messages = mongoose.model('Messages',MessageSchema);
module.exports = Messages;