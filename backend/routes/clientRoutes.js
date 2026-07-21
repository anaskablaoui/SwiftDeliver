const express = require('express')
const router = express.Router()
const db = require('../models')
const { Op } = require('sequelize')
const { validationToken } = require('../middleware/authMiddleware')
const {validateRole} = require('../middleware/roleMiddleware')

//this is admin's needs

router.get('/', validationToken,validateRole('admin'), async (req,res)=>{
    try {
        const { search, status } = req.query

        const clientWhere = {
            role: "client"
        }
        if (search) {
            clientWhere[Op.or] = [
                { nom: { [Op.like]: `%${search}%` } },
                { prenom: { [Op.like]: `%${search}%` } }
            ]
        }
        if (status) {
            clientWhere.is_active = status === 'actif'
        }

        const listOfClient = await db.User.findAll({
            where: clientWhere
        })
        res.json(listOfClient)
    } catch(error){
        console.log(error)
        res.status(500).json({error:'Errur lors de la recuperation de donne'})
    }
})
router.get('/clients/:id', validationToken,validateRole('admin'), async (req,res)=>{
    console.log(req.params.id)
    try{
        const client = await db.User.findOne({
            where:{
                id:req.params.id,
                role:'client'
            }
        })
        req.json(client)
    } catch (error){
        console.log(error)
        res.status(500).json({error:'erreur de recuperation de donne'})
    }
})  

module.exports = router