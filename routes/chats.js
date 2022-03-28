const express = require('express')
const router = express.Router()
const Chat = require('../model/chat')

router.get('/', async (req, res) => {
    try{
        const subscribers = await Chat.find()
        res.json(subscribers)
    } catch(err) {
        res.status(500).json( {message: err.message})
    }
})

router.get('/:id', getChat, (req, res) => {
    res.send(res.subscriber)
})

router.post('/', async(req,res) => {
    let user
    let chatdata = []
    try{
        user = await Chat.findById(req.body.data.visitorId)
        // console.log(user.data)
        // chatdata.push(user.data)
        // console.log(chatdata)
        if(user == null){
            const subscriber = new Chat({
                _id: req.body.data.visitorId,
                name: req.body.data.visitorId, 
                data: req.body.data.summary
            })
            try{
                const newSubscriber = await subscriber.save()
                res.status(201).json({message: "received"})
            } 
            catch (err){
                res.status(500).json({message: err.message})
            }
        }
        else{
            // chatdata.push(user.data)
            // console.log()
            user = await Chat.findById(req.body.data.visitorId)
            chatdata = user.data
            chatdata.push(req.body.data.summary)
            console.log(chatdata)
            await Chat.findByIdAndDelete(req.body.data.visitorId)
            const newUser = new Chat({
                _id: req.body.data.visitorId,
                name: req.body.data.visitorId, 
                data: chatdata
            })
            try{
                const newSubscriber = await newUser.save()
                res.status(201).json({message: "received"})
            } 
            catch (err){
                res.status(500).json({message: err.message})
            }
            return res.status(404).json({ message: "resgistered"})
        }
    }
    
    // const subscriber = new Chat({
    //     _id: req.body.data.visitorId,
    //     name: req.body.data.visitorId, 
    //     data: req.body.data.summary
    // })
    // try{
    //     const newSubscriber = await subscriber.save()
    //     res.status(201).json({message: "received"})
   // } 
    catch (err){
        res.status(500).json({message: err.message})
    }
})

async function getChat(req, res, next){
    let subscriber 
    try{
        subscriber = await Chat.findById(req.params.id)
        
        if(subscriber == null){
            return res.status(404).json({ message: "cannot find user"})
        }
    }catch(err){
        return res.status(500).json({message: err.message })
    }
    res.subscriber = subscriber
    next()
}

module.exports = router