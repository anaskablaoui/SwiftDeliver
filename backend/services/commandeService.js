const db = require('../models')
const {Op} = require('sequelize')

const getCommandeService = async (where,query)=>{
    let status = {}
    if(query.status){
        status={
            Statut:query.status
        }
    }
    let search={}
    if(query.search){
        search={
            nom_retrait:{
                [Op.like]: `%${query.search}%`
            }
        }
    }
    let clientWhere = { role: "client" }
    if(query.client){
        clientWhere = {
            ...clientWhere,
            [Op.or]: [
                { nom: { [Op.like]: `%${query.client}%` } },
                { prenom: { [Op.like]: `%${query.client}%` } }
            ]
        }
    }
    try{
        const commandeList= await db.commande.findAll({
        where:{
            ...where,
            ...status,
            ...search
        },
        include:[
            {
                model: db.User,
                where: clientWhere,
                as: "client"
            },
            {
                model: db.Livreur,
                as: "livreur",
                required: false,
                include: {
                    model: db.User
                }
            }
        ]

    })
    console.log("===list of commande===")
    console.log(commandeList)
    return commandeList

}
catch(error){
    console.log("==== upps error finding commandes")
    console.log(error)
    return null
}
}

    module.exports = {getCommandeService}
