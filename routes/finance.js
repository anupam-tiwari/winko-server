const express = require('express')
const router = express.Router() 
const Account = require('../model/account') 

router.get('/', async (req, res) => {
    try{
        const accounts = await Account.find()
        res.json(accounts)
    } catch(err) {
        res.status(500).json( {message: err.message})
    }
})

router.post('/', async (req, res) => {
    const account = new Account({
        _id: req.body._id, 
        name: req.body.name, 
        balance: req.body.balance
    })

    try{
        const newAccount = await account.save()
        res.status(201).json({message: "account created"})
    } catch (err){
        res.status(500).json({message: err.message})
    }
})

router.get("/:id", async  (req,res) => {
    try{
        const account = await Account.findById(req.params.id)
        res.json(account)
    }catch(err){
        res.status(500).json( {message: err.message})
    }
})

router.put('/add/:id', async (req, res) => {
    let account = await Account.findById(req.params.id)
    if(req.body.amount != null){
        account.balance = parseInt(account.balance) + parseInt(req.body.amount)
    }
    try{
        const updatedAccount = await account.save()
        res.json(updatedAccount)
    }catch(err){
        res.status(400).json({message: err.message})
    }
})

router.put('/deduct/:id', async (req, res) => {
    let account = await Account.findById(req.params.id)
    if(req.body.amount != null){
        account.balance = parseInt(account.balance) - parseInt(req.body.amount)
    }
    try{
        const updatedAccount = await account.save()
        res.json(updatedAccount)
    }catch(err){
        res.status(400).json({message: err.message})
    }
})


async function getAccount(req, res, next){
    let account 
    try{
        account = await Account.findById(req.params.id)
        
        if(account == null){
            return res.status(404).json({ message: "cannot find user"})
        }
    }catch(err){
        return res.status(500).json({message: err.message })
    }
    res.account = account
    next()
}


module.exports = router
