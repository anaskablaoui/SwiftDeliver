const express = require('express')
const router = express.Router()
const db = require('../models')
const { validationToken } = require('../middleware/authMiddleware')

//this is admin's needs 

router.get('/', validationToken, async (req,res)=>{
    try {
        const listOfClient = await db.User.findAll({
            where:{
                role:"client",
            }
        })
        res.json(listOfClient)
    } catch(error){
        console.log(error)
        res.status(500).json({error:'Errur lors de la recuperation de donne'})
    }
})
router.get('/clients/:id', validationToken,(req,res)=>{
    res.send('this is client details')
})  

module.exports = router