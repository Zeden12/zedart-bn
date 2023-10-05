const { urlencoded } = require("express")
const mongoose = require("mongoose")

const commentSchema = mongoose.Schema({
    blogName:{
        type:String
    },
    date:{
        type:String,
        required: true,
    },
    Time:{
        type:String,
        required: true,
    },
username:{
        type:String,
        required: true,
    },
Comment:{
    type:String,
    required: true,
},
blog_Id:{
    type: mongoose.Schema.Types.ObjectId, ref:'Blog'},

// user_Id:{
//     type: mongoose.Schema.Types.ObjectId, ref:'user'},
}
,
{  
timestamps: true,
    
});

const Comment = mongoose.model('Comment', commentSchema)
module.exports =  Comment;