const db = require('../models')

const getCommandeService = async (where,query)=>{
    let status = {}
    if(query.status){
        status={
            Statut:query.status
        }
    }
    try{
        const commandeList= await db.commande.findAll({
        where:{
            ...where,
            ...status
        },
        include:[
            {
                model: db.User,
                where: { role: "client" },
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
    return null
}
}

    module.exports = {getCommandeService}
