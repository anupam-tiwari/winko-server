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
    let resbody = req.body.Body.split(',')
    if(resbody[0] == "register"){
        console.log("login user")
        AddUser(req,res, resbody)
    }
    else if (resbody[0] == "unregister"){
        console.log("unregister user")
        DeleteUser(req, res)
    }    
})

async function AddUser(req, res, resbody){
    let address = req.body.FromCity + " " +  req.body.FromState + " " +  req.body.FromCountry + " " +  req.body.FromZip
    
    const subscriber = new Subscriber({
        // _id: req.body.From,
        // name: req.body.Body, 
        // number: req.body.From,
        _id: req.body.From,
        name: resbody[1], 
        number: req.body.From,
        location: address
    })
    try{
        const newSubscriber = await subscriber.save()
        res.status(201).json(newSubscriber)
    } catch (err){
        res.status(500).json({message: err.message})
    }
}


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

// async function DeleteUser(req, res, number){
//     router.delete('/:id', getSubscriber, async (req,res) => {
//         try{
//             await res.subscriber.remove()
//             res.json({message:"Deleted User"})
//         }catch (err){
//             res.status(500).json({ message: err.message})
//         }
//     })

// }

async function DeleteUser(req,res){
    let user
    console.log(req.body.From)
    try{
        user = await Subscriber.findByIdAndDelete(req.body.From)
        res.status(201).json("deleted")
    }
    catch(err){
        res.status(500).json({ message: err.message})
    }
}

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