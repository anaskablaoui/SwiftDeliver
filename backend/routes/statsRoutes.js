const express = require('express')
const router = express.Router()
const db = require('../models')
const { Op } = require('sequelize')
const { validationToken } = require('../middleware/authMiddleware')
const {getStats} = require('../services/getStats');
const {getCommandeWhere} = require('../services/commandeFilterService');

router.get('/dashboard', validationToken,async (req,res)=>{
    const stats=await getStats(req.user)
    if(stats){
        res.json(stats)
    }
    else{
        res.status(400).json({
            erreur:"erreur pas de statistique recupere"
        })
    }
})

router.get('/gains-par-mois', validationToken, async (req,res)=>{
    try{
        const where = await getCommandeWhere(req.user)

        const twelveMonthsAgo = new Date();
        twelveMonthsAgo.setMonth(twelveMonthsAgo.getMonth() - 11);
        twelveMonthsAgo.setDate(1);
        twelveMonthsAgo.setHours(0, 0, 0, 0);

        const rows = await db.commande.findAll({
            where: {
                ...where,
                created_at: { [Op.gte]: twelveMonthsAgo }
            },
            attributes: [
                [db.sequelize.fn('DATE_FORMAT', db.sequelize.col('created_at'), '%Y-%m'), 'mois'],
                [db.sequelize.fn('SUM', db.sequelize.col('prixLivraison')), 'total']
            ],
            group: [db.sequelize.fn('DATE_FORMAT', db.sequelize.col('created_at'), '%Y-%m')],
            raw: true
        });

        const totalsByMonth = {};
        rows.forEach(row => {
            totalsByMonth[row.mois] = Number(row.total);
        });

        const labels = [];
        const data = [];
        for (let i = 11; i >= 0; i--) {
            const month = new Date();
            month.setDate(1);
            month.setMonth(month.getMonth() - i);
            const key = `${month.getFullYear()}-${String(month.getMonth() + 1).padStart(2, '0')}`;
            labels.push(key);
            data.push(totalsByMonth[key] || 0);
        }

        res.json({ labels, data });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            erreur: "erreur lors de la recuperation du graphique"
        })
    }
})

router.get('/commandes-par-statut', validationToken, (req,res)=>{
    res.send('repartition par statut')
})

router.get('/commandes-par-type', validationToken, (req,res)=>{
    res.send('repartition par type')
})


module.exports = router