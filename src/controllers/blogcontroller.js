const cloudinary = require('../cloudinary');
const Blogs = require('../models/blogs')
const mongoose = require('mongoose')
const Comments = require('../models/Comments')
const getBlogs = async(req,res)=>{
    try {
        const blogs = await Blogs.find();
    res.status(200).send(blogs);
    } 
    catch (error) {
        res.status(500).send('server error')
    }
    
};

const insertBlog =  async(req,res)=>{
    try {
        let currentDate = new Date().toDateString();
        const imgUpload = await cloudinary.uploader.upload(req.body.image, {folder: 'zed_image'})
        const insBlog = new Blogs({
            title: req.body.title,
            image: {
                public_id: imgUpload.public_id,
                url: imgUpload.secure_url
            },
            body: req.body.body,
            author: req.body.author,
            date: currentDate
        })
        const blog = await insBlog.save();
        res.json(blog);
    } catch (error) {
        res.status(500).json('server error')
    }
   
}

const deleteBlog = async(req, res)=> {
    try {
        const id = req.params.id
        await Blogs.deleteOne({
            _id: id
        })
        res.status(200).json('Blog deleted successfull')
        
    } catch (error) {
        console.log(error)
        res.status(404).json()
        
    }
}

const updateBlog = async (req, res) => {
	try {
		const id = req.params.id
        const Blog = await Blogs.findOne({ 
            _id: id })

		if (req.body.title) {
			Blog.title = req.body.title
		}

        if (req.body.image) {
            const imgUpload = await cloudinary.uploader.upload(req.body.image, {folder: 'zed_image'})
			Blog.image = {
                public_id: imgUpload.public_id,
                url: imgUpload.secure_url
            }
		}

		if (req.body.body) {
			Blog.body = req.body.body
		}

        if (req.body.author) {
			Blog.author = req.body.author
		}

		await Blog.save()
		res.send(Blog)
	} catch {
		res.status(500)
		res.send({ error: "Post doesn't exist!" })
	}
}

const getOneBlog = async(req,res)=>{
    try {
        const id = req.params.id
       const Blog = await Blogs.findOne({
            _id: id
        })
        res.status(200).json(Blog)
        
    } catch (error) {
        console.log(error)
        res.status(404).json("blog not found")
        
    }}

    const Commentside = async (req, res) => {
        let blog_id = req.params[0];
    
        if (!mongoose.Types.ObjectId.isValid(req.params.blog_id)) {
            return res.status(400).send({
                message: "Invalid blog id",
                data: {}
            });
        }
        await Blogs.findById(req.params.blog_id)
            .then(async (blog) => {
                //console.log(req.params)
               // console.log(req.body)
                if (!blog) {
                    return res.status(400).send({
                        message: "Blog not found",
                        data: {}
                    });
    
                } else {
                    let blogName;
                    if (blog) {
                        blogName = blog.title
                        //console.log(blogName)
                    }
                    try {
                        //console.log(blogName)
    
                        // Code to create a new comment and save it to the database here
                        let comment = new Comments({
                            blogName: blogName,
                            date: new Date().toDateString(),
                            Time: req.body.Time,
                            username: req.body.username,
                            Comment: req.body.Comment,
                            blog_id: blog_id
                            // Set properties for the new comment here
                        });
                        //console.log(comment)
                        let commentData = await comment.save();
    
                        let newOne = await Blogs.findById(
                            req.params.blog_id,
                        )
    //console.log(newOne)
                        newOne.Comments.push(commentData)
                        await newOne.save();
                        console.log(commentData)
                        return res.status(200).send({
                            message: "Your Comment already added",
                            data: commentData
                        });
                    } catch (error) {
                        return res.status(400).send({
                            message: error.message,
                            data: error
                        });
                    }
    
                }
    
            }).catch((err) => {
                return res.status(400).send({
                    message: err.message,
                    data: err
                });
            });
    };
    /// to get all comments
    const AllCommets = (req, res) => {
        Comments.find({}, (err, message) => {
            if (err) {
                res.status(500).send(err);
            } else {
                res.status(200).send(message);
            }
        })
    }
    
    const singleBlogComments = async (req, res) => {
        let blog_id = req.params[0];
    
        if (!mongoose.Types.ObjectId.isValid(req.params.blog_id)) {
            return res.status(400).send({
                message: "Invalid blog id",
                data: {}
            });
        }
        try {
            const blog = await Blogs.findOne({
                _id: req.params.blog_id
            })
            res.json({ "statusCode": 200, "message": "done well!", "comments": blog.Comments,})
        } catch (error) {
            res.status(404)
            res.json({
                error: error.message
            })
        }
    }

    const like = async (req, res) => {
        const {id, username, email} = req.user
        const blogId = req.params.id
        const blog = await Blogs.findById(blogId)

        if(!blog.likes.Peaples.includes(email) == true){
            let count = blog.likes.count+1
            let user = blog.likes.Peaples
            user.push(email)
            const blogLike = await Blogs.findByIdAndUpdate(
                {_id: blogId},
                {likes: {count: count, Peaples: user}}
            )
            res.status(200).json({status:"liked", like: blogLike.likes})

        }
        else{
            let count = blog.likes.count-1
            let user = blog.likes.Peaples.filter((eml) => eml != email)
            const blogLike = await Blogs.findByIdAndUpdate(
                {_id: blogId},
                {likes: {count, Peaples: user}}
            )
            res.status(200).json({status:"unliked", like: blogLike.likes})
        }
    }

    const getLike = async(req,res)=>{
        try {
            const id = req.params.id;
            let allLikes = await Blogs.findById(id);
            let getLikes = allLikes.likes;
            res.status(200).json(getLikes.count);
        } catch (error) {
            res.status(404).json('like not found')
        }
    }

module.exports = {getBlogs, insertBlog, deleteBlog, updateBlog, getOneBlog, Commentside, AllCommets,singleBlogComments, like, getLike}
// module.exports = getBlogs
// module.exports = insertBlog