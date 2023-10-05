const { string } = require('joi');
const mongoose = require('mongoose');
// const Schema = mongoose.Schema();
const BlogSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    image:{
        public_id:{
            type: String,
            required: true
        },
        url:{
            type: String,
            required: true
        }
    },

    body:{
        type: String,
        required: true
    },
    author:{
        type: String,
        required: true
    },

    Comments: [{ 
        Time: String,
        date: String,
        username: String,
        Comment: String
    }],
    
    likes: {
        count: {
            type: Number,
            default: 0
        },
        Peaples: []
    },

    date: { type: String}
})
const Blogs = mongoose.model('Blogs',BlogSchema);
module.exports = Blogs;