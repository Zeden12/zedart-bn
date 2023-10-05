const userValidation = require("../validation/uservalidation");
const userVal = async(req, res,next)=>{
    const {error, value} =  userValidation.validate(req.body, {abortEarly : false});
    if(error){
        return res.status(400).json(error.details[0].message)
    }
    // req.valData = value;
    next();
}

module.exports = userVal