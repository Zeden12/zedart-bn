const Messages = require('../models/messages')
const getMessages = async(req,res)=>{
    try {
        const messages = await Messages.find();
    res.send(messages);
    } 
    catch (error) {
        res.status(500).send('server error')
    }
    
};

const insertMessage =  async(req,res)=>{
    const insMessage = new Messages({
        username: req.body.username,
        email: req.body.email,
        idea: req.body.idea
    })
    const message = await insMessage.save();
    res.json(message);
}

const deleteMessage = async(req, res)=> {
    try {
        const id = req.params.id
        await Messages.deleteOne({
            _id: id
        })
        res.status(200).json('Message deleted successfull')
        
    } catch (error) {
        console.log(error)
        res.status(404).json()
        
    }
}

const updateMessage = async (req, res) => {
	try {
		const id = req.params.id
        const Message = await Messages.findOne({ 
            _id: id })

		if (req.body.username) {
			Message.username = req.body.username
		}

        if (req.body.email) {
			Message.email = req.body.email
		}

		if (req.body.idea) {
			Message.body = req.body.idea
		}

		await Message.save()
		res.send(Message)
	} catch {
		res.status(404)
		res.send({ error: "There is no message to Update!" })
	}
}

const getOneMessage = async(req,res)=>{
    try {
        const id = req.params.id
       const Message = await Messages.findOne({
            _id: id
        })
        res.status(200).json(Message)
        
    } catch (error) {
        console.log(error)
        res.status(404).json("Message not found")
        
    }}

module.exports = {getMessages, insertMessage, deleteMessage, updateMessage, getOneMessage}