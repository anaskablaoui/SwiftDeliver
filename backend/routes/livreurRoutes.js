const express = require('express')
const router = express.Router()
const db = require('../models')
const { validationToken } = require('../middleware/authMiddleware')
const {validateRole} = require('../middleware/roleMiddleware')
const bcrypt = require('bcrypt')
const { Op } = require('sequelize')
// all of this is admin needs

router.get('/', validationToken, async (req, res) => {
    try {
        const { search, status } = req.query

        const livreurWhere = {}
        if (status) {
            livreurWhere.statut = status
        }

        const userInclude = {
            model: db.User,
            required: false
        }
        if (search) {
            userInclude.where = {
                [Op.or]: [
                    { nom: { [Op.like]: `%${search}%` } },
                    { prenom: { [Op.like]: `%${search}%` } }
                ]
            }
            userInclude.required = true
        }

        const listOfLivreur = await db.Livreur.findAll({
            where: livreurWhere,
            include: [userInclude]
        })
        res.json(listOfLivreur)
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Erreur lors de la récupération des livreurs' })
    }
})

router.get('/:id', validationToken,validateRole('admin'), async (req,res)=>{
    console.log(req.params.id)
    try{
        const livreur = await db.Livreur.findOne({
            where:{
                id:req.params.id
            },
            include:[
                {
                    model:db.User,
                    as:'user'
                }
            ]
        })
        res.json(livreur)
    }
    catch(error)
    {
        console.log(error)
        res.status(500).json({error:'erreru de recuperation de donne'})
    }
})

router.post('/', validationToken, (req,res)=> {
    const payload = req.body || {};
    if (payload.password === payload.passwordConfirm)
    {   bcrypt.hash(payload.password,10).then((hash)=>{

        const userData={
        nom:payload.nom ,
        prenom:payload.prenom,
        telephone:payload.telephone,
        email:payload.email,
        password_hash:hash,
    }
        db.User.create(userData).then((user)=>{
            const livreurData={
                user_id:user.id,
                type_vehicule:payload.type_vehicule
            }
            db.Livreur.create(livreurData).then(()=>{
                res.json({message:'Livreur créé avec succès'})
            })
        })

    })
    
    }
    else{
        res.status(401).json({
            error:'erreur de creation de livreur'
        })
    }

    
})

router.put('/:id', validationToken,validateRole('admin'), async (req,res)=>{
    res.json("livreur modification")
})

router.get('/assignement',validationToken, async (req,res)=>{
    try{
        const listOfLivreur = await db.commande.findAll({
            where:{
                Statut:"disponible",
            },
            include:[
                {
                    model:db.User,
                    as:'user'
                 }
            ]
        })
        res.json(listOfLivreur)
    }catch(error){
        console.log("erreur de recuperation de donnee")
        res.status(400).json({
            erreur:"erreur de recuperation de donnee"
        })
    }
})



module.exports =  router