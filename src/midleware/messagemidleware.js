const messageValidation = require("../validation/messagevalidation");
const messageVal = async(req, res,next)=>{
    const {error, value} =  messageValidation.validate(req.body, {abortEarly : false});
    if(error){
        return res.status(400).json(error.details[0].message)
    }
    // req.valData = value;
    next();
}

module.exports = messageVal