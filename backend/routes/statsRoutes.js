const express = require('express')
const router = express.Router()
const { validationToken } = require('../middleware/authMiddleware')
const {getCommande} = require('../controllers/commandesController')
const db = require('../models')
const sequelize = require('sequelize')
const {getCommandeWhere} = require('../services/commandeFilterService')
const { Op } = require('sequelize');

router.get('/dashboard', validationToken,async (req,res)=>{
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    const where = await getCommandeWhere(req.user)

    
    try {
        const [todayCommande,totalCommande,totalGains] = await Promise.all([
        db.commande.findOne({
            where:{
                    ...where,
                    created_at: { [Op.between]: [startOfDay, endOfDay] }
                }
            ,
            attributes:[
                [sequelize.fn("count",sequelize.col("id")),"todaysTotal"],

            ]
        }),
        db.commande.findOne({
            where,

            attributes:[
                [sequelize.fn("count",sequelize.col("id")),"total"],
                [sequelize.fn("Sum",sequelize.col("prixLivraison")),"totlGains"]
            ]
        }),
        db.commande.findAll({
            where,

            attributes:[
                [sequelize.fn("MONTH",sequelize.col("created_at")),"month"],
                [sequelize.fn("Sum",sequelize.col("prixLivraison")),"Gains"]
            ],
            group: [sequelize.fn("MONTH", sequelize.col("created_at"))],
                raw: true
        })

    ])

        console.log("===== statts calculated successfully=====")

        res.json({
            todayCommande,
            totalCommande,
            totalGains
        });
    }
    catch (error){
        console.log(error)
        res.status(500).json({
            error:"erreur de recuperation de statistique"
        })
    }
    
})

router.get('/commandes-par-jour', validationToken, (req,res)=>{
    res.send('graph de 7 dernier jour')
})

router.get('/commandes-par-statut', validationToken, (req,res)=>{
    res.send('repartition par statut')
})

router.get('/commandes-par-type', validationToken, (req,res)=>{
    res.send('repartition par type')
})


module.exports = router