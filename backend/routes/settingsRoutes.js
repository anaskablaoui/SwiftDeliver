const express  = require('express')
const router = express.Router()
const { validationToken } = require('../middleware/authMiddleware')
const db = require('../models')
const {validateRole} = require('../middleware/roleMiddleware')


router.get('/', validationToken,async(req,res)=>{
    console.log("setting display testing ")
    try{const role= await db.settings.findOne()
    res.json(role)}
    catch{
        res.status(500).json({
            error:'erreur de recuperation de contenu'
        })
    }
})

router.put('/', validationToken, async (req,res)=>{
    try{
        const [updateSetting] = await db.settings.update(
            req.body,
            {
                where:{
                    id:1
                }
            }
        );
        if(updateSetting>0){
            console.log("settings modified successufully")
            res.status(200).json({
                message:"commande updated successuflly"
            })
        } else {
            res.status(404).json({
                message:"no data found"
            })
        }
    } catch(error){
        console.log("erreur de modification de erreur")
        res.status(500).json({
            erreur:"erreru de modification de contenu"
        })
    }
})


module.exports = router