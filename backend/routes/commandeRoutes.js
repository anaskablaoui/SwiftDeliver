const express = require('express')
const router =express.Router()
const db = require('../models')
const { where } = require('sequelize')
const { validationToken } = require('../middleware/authMiddleware')
const {validateRole} = require('../middleware/roleMiddleware')
const {getCommande} = require('../controllers/commandesController')
const {getCommandeWhere} = require('../services/commandeFilterService')
const {similarity} = require('../services/missionService')

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
            client_id:  req.user?.id,
            codePostal: payload.codePostal
        };

        if (!commandeData.client_id) {
            const client = await db.User.findOne({ where: { role: 'client' } });
            if (!client) {
                return res.status(400).json({ message: 'Aucun client trouvé. Créez d’abord un utilisateur client.' });
            }
            commandeData.client_id = client.id;
        }
        
        const createdCommande = await db.commande.create(commandeData);
        const livreur = await db.Livreur.findAll()
        console.log("Client:", payload.codePostal);

        for(const l of livreur){
            console.log("Livreur:", l.geoOcpation);
console.log("Equal?", payload.codePostal === l.geoOcpation);
console.log("Score:", similarity(String(payload.codePostal), String(l.geoOcpation)));
             const score = similarity(String(payload.codePostal), String(l.geoOcpation));
            
    console.log({
        client: payload.codePostal,
        livreur: l.geoOcpation,
        score
    });
            if(similarity(String(payload.codePostal), String(l.geoOcpation))>=1){
                 await db.mission.create({
                    livreur_id:l.id,
                    commande_id:createdCommande.id
                })
            }
        }

        console.log("it worked")
        res.status(201).json(createdCommande);
    } catch (err) {
        console.error(err);
        res.status(400).json({ message: err.message });
    }
})

router.put('/:id', validationToken, async (req,res)=>{
    console.log("5050505005005:", req.params.id);
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
            
        };


    try{const [updateCommande]= await db.commande.update(
        commandeData,
        {
        where:{
            id:req.params.id
        }
    });

    if(updateCommande>0){
        console.log("modified successfully")
        res.status(200).json({
        message:"commande updated successufaly "
    })}else{
        res.status(404).json({
            message:"commande not found"
        })
    }
    
    }catch(error){
        console.log("erreur de modification")
        res.status(500).json({
            erreur:"erreur de modification de contenu "
        })
    }
})

router.delete('/:id', validationToken, async (req,res)=>{
    
    await db.commande.destroy({
        where:{
        id:req.params.id
        }
    })
})

router.patch('/:id/statut', validationToken, (req,res)=>{
    res.send('this is command statut ')
})

router.patch('/:id/assigner', validationToken, async (req,res)=>{
    console.log(req.params.id)
    

    const livreurId = req.body.livreur
    try{
        const [updateCommande] = await db.commande.update(
            {livreur_id:livreurId,
            Statut:'assignee'
            },
            
            {
                where:{
                    id:req.params.id
                }
            }
        );
        if(updateCommande>0){
        console.log("modified successfully")
        res.status(200).json({
        message:"commande updated successufaly "
        })}else{
        res.status(404).json({
            message:"commande not found"
        })
    }
    
        
    }catch(error){
        console.log(error)
        res.status(500).json({
            erreur:"erreur de modification de contenu "
        })
    }
})

router.put('/mission/:id',validationToken , async (req,res)=>{
    try { 
    const commande = await db.commande.findOne({
        where:{
            id:req.params.id
        }
    })
    if(!commande)
    {
        return res.status(404).json({erreur:"commande not found"})
    }

    let nextStatut;
    switch (commande.Statut) {

        case 'assignee':
            nextStatut = 'en_retrait'
            break;
        case 'en_retrait':
            nextStatut = 'recuperee'
            break;
        case 'recuperee':
            nextStatut = 'livree'
            break;
        default:
            return res.status(400).json({
                erreur:'erreur de statut'
            })
            break;
    }

    const [updateStatut] = await db.commande.update(
        {Statut:nextStatut},
        {
        where:{
            id:req.params.id
        }
    }
    )
    if(updateStatut>0){
        console.log("modified successfully")
        res.status(200).json({
        message:"commande updated successufaly "
    })}else{
        res.status(404).json({
            message:"commande not found"
        })
    }
    
    } catch(error){
        console.log("erreur de modification de statut")
        res.status(500).json({
            erreur:"erreur de modification de statut"
        })
    }
    
})

router.delete('/:id', validationToken,validateRole('admin'), async (req,res)=> {
    await db.Livreur.destroy({
        where:{
        id:req.params.id
        }
    })
    res.json({message:'Livreur supprimé avec succès'})

})

module.exports = router