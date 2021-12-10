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

router.get('/:id', (req, res) => {
    res.send(req.params.id)
})

router.post('/', async (req, res) => {
    const subscriber = new Subscriber({
        // name: req.body.Body, 
        // number: req.body.From, 
        name: req.body.Body, 
        number: req.body.From,
    })
    try{
        const newSubscriber = await subscriber.save()
        res.status(201).json(newSubscriber)
    } catch (err){
        res.status(500).json({message: err.message})
    }
})


//Getting One



module.exports = router