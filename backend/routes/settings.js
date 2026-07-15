const express  = require('express')
const router = express.Router()
const { validationToken } = require('../middleware/authMiddleware')
const db = require('../models')
const {validateRole} = require('../middleware/roleMiddleware')

router.get('/', validationToken,validateRole('admin'),async(req,res)=>{
    try{const role= await db.settings.findAll()
    res.json(role)}
    catch{
        res.status(500).json({
            error:'erreur de recuperation de contenu'
        })
    }
})

router.put('/:cle', validationToken,validateRole('admin'), (req,res)=>{
    res.send('settigns edditing')
})


module.exports = router