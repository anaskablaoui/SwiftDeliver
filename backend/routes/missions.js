const express = require('express')
const router = express.Router()
const db = require('../models')
const { validationToken } = require('../middleware/authMiddleware')
const { validateRole } = require('../middleware/roleMiddleware')
const { where } = require('sequelize')



router.get('/',validationToken,async (req,res)=>{
    console.log('testtest')
const livreur = await db.Livreur.findOne({
        where:{
            user_id:req.user.id
        },
        attributes:[
            'id'
        ]
    })
    if(!livreur)
    {
        console.log("livreur not found")
    }
    else{
    console.log( await db.mission.findAll({
            where:{
                livreur_id:livreur.id
            },
            include:[
                {
                    model:db.commande,
                    as:'commande'
                }
            ]
        }))
    }
    
    try{
        
        const mission = await db.mission.findAll({
            where:{
                livreur_id:livreur.id
            },
            include:[
                {
                    model:db.commande,
                    as:'commande'
                }
            ]
        })
        res.json(mission)
    } catch(error){
        console.log('erreur de recuperation de mission')
        res.status(400).json({
            erreur:'erreur de recuperation de mission'
        })
    }
})

router.patch('/:id/validate',validationToken, async(req,res)=>{

    console.log(req.params.id);
    try{
        const livreur = await db.Livreur.findOne({
        where:{
            user_id:req.user.id
        },
        attributes:[
            'id'
        ]
    })
        const mission = await db.mission.findOne({
            where:{
                id:req.params.id,
                livreur_id:livreur.id
            },
            attributes:[
                'commande_id'
            ]
        })

        
        


        const [updateCommande] = await db.commande.update({
            livreur_id:livreur.id,
            Statut:'assignee'
        },
    {
        where:{
            id:mission.commande_id
        }
    });

    if(updateCommande>0){
        console.log("commande assigne avec succes")
        await db.mission.destroy({
            where:{
                commande_id:mission.commande_id
            }
        })
        res.status(200).json({
            message:"commande assigne avec succes"
        })
    } else{
        res.status(404).json({
            message:'commande not found'
        })
    }
    } catch(error){
        console.log(error)
        res.status(500).json({
            erreur:"erreur de modification de contenu"
        })
    }
})

router.delete('/:id/refuse',validationToken, async (req,res)=>{
    try {
        console.log(req.params.id)
        await db.mission.destroy({
            where:{
                id:req.params.id
            }
        })
        res.json({messahe:'mission refuse'})
    } catch(error){
        console.log(error)
        res.status(500).json({message:'erreur de refus de mission '})
    }    
})

module.exports = router