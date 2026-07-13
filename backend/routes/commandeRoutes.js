const express = require('express')

const router =express.Router()
const db = require('../models')
const { where } = require('sequelize')

router.get('/', async (req,res)=>{
    try {
        const listOfCommandes = await db.commande.findAll({
            include:[
            {
                model:db.User,
                where:{
                    role:'client'
                },
                as:'client'
            },
            {
                model:db.Livreur,
                as:'livreur',
                required:false,
                include:{
                    model:db.User
                }
            }
        ]
        })

        res.json(listOfCommandes)
    } catch (err) {
        console.error(err)
        res.status(500).json({ message: err.message })
    }
})

router.get(`/{id}`,(req,res)=>{
    res.send('this is commande details')
})

router.post('/',(req,res)=>{
    res.send('this is the commande creation')
})

router.put('/:id',(req,res)=>{
    res.send('this is commande modification')
})

router.delete('/:id',(req,res)=>{
    res.send('this is commande deleting')
})

router.patch('/:id/statut',(req,res)=>{
    res.send('this is command statut ')
})

router.patch('/:id/assigner',(req,res)=>{
    res.send('this is assignement commande to the delivery man')
})


module.exports = router