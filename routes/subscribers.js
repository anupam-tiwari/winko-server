const express = require('express')
const router = express.Router()
const Subscriber = require('../model/subscriber')

//Getting all 
router.get('/', async (req, res) => {
    try{
        const subscribers = await Subscriber.find()
        res.json(subscribers)
    } catch(err) {
        res.status(500).json( {message: err.message})
    }
})

router.get('/:id', getSubscriber, (req, res) => {
    res.send(res.subscriber)
})

router.post('/', async (req, res) => {
    const subscriber = new Subscriber({
        // _id: req.body.From,
        // name: req.body.Body, 
        // number: req.body.From,
        _id: req.body._id,
        name: req.body.name, 
        number: req.body.number,
    })
    try{
        const newSubscriber = await subscriber.save()
        res.status(201).json(newSubscriber)
    } catch (err){
        res.status(500).json({message: err.message})
    }
})

router.patch('/:id', getSubscriber, async (req, res) => {
    if(req.body.name != null){
        res.subscriber.name = req.body.name
    }
    try{
        const updatedSubscriber = await res.subscriber.save() 
        res.json(updatedSubscriber)

    }catch(err){
        res.status(400).json({message: err.message})

    }
})

router.delete('/:id', getSubscriber, async (req,res) => {
    try{
        await res.subscriber.remove()
        res.json({message:"Deleted User"})
    }catch (err){
        res.status(500).json({ message: err.message})
    }
})

async function getSubscriber(req, res, next){
    let subscriber 
    try{
        subscriber = await Subscriber.findById(req.params.id)
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