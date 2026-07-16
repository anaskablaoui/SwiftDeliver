const db = require('../models')

const getCommandeService = async (where)=>{
    try{
        const commandeList= await db.commande.findAll({
        where,
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
