const express = require('express')
const router = express.Router()
const db = require('../models')

// all of this is admin needs

router.get('/', async (req, res) => {
    try {
        const listOfLivreur = await db.Livreur.findAll({
            include:[
                {
                    model:db.User
                 }
            ]
        })
        res.json(listOfLivreur)
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Erreur lors de la récupération des livreurs' })
    }
})

router.get('/:id',(req,res)=>{
    res.send('this delivery man details')
})

router.post('/',(req,res)=> {
    res.send('this is delivery man creation ')
})

router.put('/:id',(req,res)=>{
    res.send('this is delivery man modification')
})

router.delete('/:id',(req,res)=> {
    res.send('this is delivery man deleting')
})



module.exports =  router