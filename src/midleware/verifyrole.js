const jwt = require('jsonwebtoken')
const UserSchema = require('../models/users')
const requireAuth = (req, res, next) => {
    //console.log(req)
    const { authorization } = req.headers;
    if (!authorization) {
        return res.status(401).json({ "statusCode": 401, "message": "Please Login" })
    }
  const token = authorization.split(" ")[1];
    if (token) {
        jwt.verify(token, process.env.ADMIN_ACCESS_TOKEN, (err, decodedToken) => {
            if (err) {
                // console.log(err.message)
                return res.status(401).json("Please This is for admin only")
                //{ "statusCode": 401, "message": "This is for admin only!!!!" }
            } else {
                //res.redirect('/adminDashboard')
                req.user = decodedToken;
                // console.log(decodedToken)
                next()
            }
        })
    }   // console.log("My admin tokeen is " + token)
    // this will check json web token exists & verified
    else {
        res.status(406).json("login first to do anything")
    }
}
// here is to check for the current user
const checkUser = (req, res, next) => {
    // console.log("my tokeen is " +req.cookies.jwt)
    const { authorization } = req.headers;
    if (!authorization) {
        return res.status(401).json({ "statusCode": 401, "message": "Please Login" })
    }
    console.log(authorization.split(" ")[1])
  const token = authorization.split(" ")[1];
    if (token) {
        jwt.verify(token, process.env.USER_ACCESS_TOKEN, async (err, decodedToken) => {
            if (err) {
                res.locals.user = null;
                res.send({message:"login first"})
                //next()
            } else {
                let user = await UserSchema.findById(decodedToken.id)
                req.user = user
                next()
            }
        })
    } else {
        req.user = null;
        res.status(406).json("login first to procceed")
    }
}
module.exports = { requireAuth, checkUser }