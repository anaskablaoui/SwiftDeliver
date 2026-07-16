
const db = require('../models')
const { get } = require('../routes/clientRoutes')
const {getCommandeService} = require('../services/commandeService')
const {getCommandeWhere} = require('../services/commandeFilterService')

const getCommande = async(req,res)=>{

    console.log("Controller executed");
    //console.log(req.user);
    const where = await getCommandeWhere(req.user)
    const listOfCommandes = await getCommandeService(where)
    if(listOfCommandes)
    {
        res.json(listOfCommandes)
    }
    else{
        res.status(500).json({
            error:"erreur de recuperation de donne"
        })
    }
}

module.exports = {getCommande}