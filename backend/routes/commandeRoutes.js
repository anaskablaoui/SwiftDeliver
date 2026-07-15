const express = require('express')

const router =express.Router()
const db = require('../models')
const { where } = require('sequelize')
const { validationToken } = require('../middleware/authMiddleware')
const {validateRole} = require('../middleware/roleMiddleware')
const {getCommande} = require('../controllers/commandesController')

router.get('/', validationToken, getCommande);
router.get('/:id', validationToken, async (req,res)=>{
    
    console.log(req.params.id)
    try{
        const commande = await db.commande.findOne({
            where:{
                id:req.params.id
            },
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
        res.json(commande)
    } catch(error){
        console.log(error)
    }
})

router.post('/', validationToken, async (req, res) => {
    try {
        const payload = req.body || {};

        const commandeData = {
            type_commande:  payload.type_commande,
            nom_retrait: payload.nom_retrait,
            telephone_retrait: payload.telephone_retrait,
            adresse_retrait:  payload.adresse_retrait,
            nom_livraison: payload.nom_livraison,
            telephone_livraison: payload.telephone_livraison,
            adresse_livraison:  payload.adresse_livraison,
            distanceKM: payload.distanceKM,
            instructionSpecial: payload.instructionSpecial,
            prixLivraison: payload.prixLivraison ?? (payload.distanceKM ? Number(payload.distanceKM) * 5 : 0),
            mode_paiement: payload.mode_paiement || 'cash',
            Statut: payload.Statut || 'en_attente',
            client_id: payload.client_id || payload.clientId || req.user?.id,
        };

        if (!commandeData.client_id) {
            const client = await db.User.findOne({ where: { role: 'client' } });
            if (!client) {
                return res.status(400).json({ message: 'Aucun client trouvé. Créez d’abord un utilisateur client.' });
            }
            commandeData.client_id = client.id;
        }

        const createdCommande = await db.commande.create(commandeData);
        console.log("it worked")
        res.status(201).json(createdCommande);
    } catch (err) {
        console.error(err);
        res.status(400).json({ message: err.message });
    }
})

router.put('/:id', validationToken, (req,res)=>{
    res.send('this is commande modification')
})

router.delete('/:id', validationToken, (req,res)=>{
    res.send('this is commande deleting')
})

router.patch('/:id/statut', validationToken, (req,res)=>{
    res.send('this is command statut ')
})

router.patch('/:id/assigner', validationToken, (req,res)=>{
    res.send('this is assignement commande to the delivery man')
})


module.exports = router