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
    console.log("====="+req.params.id)
    try{
        const livreur = await db.Livreur.findOne({
            where:{
                id:req.params.id
            },
            include:[
                {
                    model:db.User,
                    as:'User'
                }
            ]
        })
        if(!livreur){
            console.log('erreur')
            res.status(404).json({
                message:"livreur not found "
            })
        }
        console.log(livreur)
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
    try{
        const livreur = await db.Livreur.findByPk(req.params.id)
        if(!livreur){
            return res.status(404).json({
                message:'livreur not found'
            })
        }

        const { nom, prenom, email, telephone, type_vehicule } = req.body

        await db.User.update(
            { nom, prenom, email, telephone },
            { where: { id: livreur.user_id } }
        )

        await db.Livreur.update(
            { type_vehicule },
            { where: { id: req.params.id } }
        )

        res.json({ message: 'Livreur mis à jour avec succès' })
    } catch(error){
        console.log(error)
        res.status(500).json({
            message:'erreur de mise a jour du livreur'
        })
    }
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


router.delete('/:id',validationToken,async (req,res)=>{
    try{
    const livreur = await db.Livreur.findByPk(req.params.id);

    if(!livreur){
        return res.status(404).json({
            message:"livreur iconnue"
        })
    }
    else{
        await db.Livreur.destroy({
            where:{
                id:req.params.id
            }
        })

        await db.User.destroy({
            where:{
                id:livreur.user_id
            }
        })
        return res.json({
            message:"livreur supprime"
        })
    }}
    catch(error){
        console.log(error)
        return res.status(500).json({
            message:"erreur de destruction de livreur   "
        })
    }

})


module.exports =  router