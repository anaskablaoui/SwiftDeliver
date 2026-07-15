const express = require('express')
const router = express.Router()
const db = require('../models')
const { validationToken } = require('../middleware/authMiddleware')
const {validateRole} = require('../middleware/roleMiddleware')
const bcrypt = require('bcrypt')
// all of this is admin needs

router.get('/', validationToken,validateRole('admin'), async (req, res) => {
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

router.get('/:id', validationToken,validateRole('admin'), async (req,res)=>{
    console.log(req.params.id)
    try{
        const livreur = await db.livreur.findOne({
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

router.post('/', validationToken,validateRole('admin'),  (req,res)=> {
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
                userId:user.id,
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

router.put('/:id', validationToken,validateRole('admin'), (req,res)=>{
    res.send('this is delivery man modification')
})

router.delete('/:id', validationToken,validateRole('admin'), (req,res)=> {
    res.send('this is delivery man deleting')
})



module.exports =  router