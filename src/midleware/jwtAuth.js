// const jwt = require('jsonwebtoken')
// const verifyToken = (req,res,next) =>{
//     try {
//         const authHeader = req.headers['authorization'];
//         const token = authHeader && authHeader.split(' ')[1];
//         if(!token) return res.status(401).json("You are not Authorized!");
//         const verified = jwt.verify(token,process.env.USER_ACCESS_TOKEN)
//         req.user = verified;
//         next();
//     } catch (error) {
//         res.status(401).json({status:"error",error:error.message});
//     }
// }
// export default verifyToken