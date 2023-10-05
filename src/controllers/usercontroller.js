require('dotenv').config()
const Users = require('../models/users')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const getUsers = async(req,res)=>{
    try {
        const users = await Users.find();
    res.send(users);
    } 
    catch (error) {
        res.status(500).send('server error')
    }
    
};

const insertUser =  async(req,res)=>{
    const insUser = new Users({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        role: req.body.role
    })
    const email = insUser.email;
    const alreadyUser = await Users.findOne({email});
    if(alreadyUser){
        return res.status(409).send("Already user exist")
    }

    bcrypt.hash(insUser.password,10,(err,hash)=>{
        if(err){
         console.log(err)
         res.status(500).json({message:"internal error"})
        }
        else{
         insUser.password = hash
     }
      insUser.save()
     res.status(201).json(insUser)
    })

}

const login  = async(req,res)=>{
    let accessToken = ''
    try {
        const user = await Users.findOne({email:req.body.email});
        if(!user) return res.status(401).json({status:"fail",error:"Invalid credentials" });
        const match = await bcrypt.compare(req.body.password,user.password);
        if(!match){
          res.status(401).json({status:"fail",error:"Invalid password" })
          return;
        }
        if(user.role === "admin"){
         accessToken = jwt.sign({id:user._id},process.env.ADMIN_ACCESS_TOKEN)
         res.status(200).json({status:"success",message:`user ${user.username} successfully logged in`,role: user.role ,token:accessToken});
        }
       else {
         accessToken = jwt.sign({id:user._id},process.env.USER_ACCESS_TOKEN)
         res.status(200).json({status:"success",message:`user ${user.username} successfully logged in`,role: user.role  ,token:accessToken});
       }
    } catch (error) {
        console.log("our error", error)
      res.status(500).json({status:"fail", error: error.message });
    }
    }

const deleteUser = async(req, res)=> {
    try {
        const id = req.params.id
        await Users.deleteOne({
            _id: id
        })
        res.status(200).json('User deleted successfull')
        
    } catch (error) {
        console.log(error)
        res.status(404).json()
        
    }
}

const updateUser = async (req, res) => {
	try {
		const id = req.params.id
        const User = await Users.findOne({ 
            _id: id })

		if (req.body.username) {
			User.username = req.body.username
		}

        if (req.body.email) {
			User.email = req.body.email
		}

		if (req.body.password) {
			User.body = req.body.password
		}

		await User.save()
		res.send(User)
	} catch {
		res.status(404)
		res.send({ error: "User doesn't exist!" })
	}
}

const getOneUser = async(req,res)=>{
    try {
        const id = req.params.id
       const User = await Users.findOne({
            _id: id
        })
        res.status(200).json(User)
        
    } catch (error) {
        console.log(error)
        res.status(404).json("User not found")
        
    }}

module.exports = {getUsers, insertUser,login, deleteUser, updateUser, getOneUser}