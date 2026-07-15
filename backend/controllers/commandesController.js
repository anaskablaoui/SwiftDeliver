
const db = require('../models')
const { get } = require('../routes/clientRoutes')


const getCommande = async(req,res)=>{

    console.log("Controller executed");
    console.log(req.user);
    try{
        let listOfCommandes;
    if(req.user.role =='client'){
         listOfCommandes = await db.commande.findAll({
            where:{
                client_id:req.user.id
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
    }
    else if(req.user.role === 'livreur')
    {
         const livreur = await db.Livreur.findOne({
            where:{
                user_id:req.user.id
            }
         });
         listOfCommandes = await db.commande.findAll({
            where:{
                livreur_id: livreur ? livreur.id : null
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
    }
    else{
         listOfCommandes = await db.commande.findAll({
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
    }
    console.log("+++++ ocmmande")
    console.log(listOfCommandes)
    res.json(listOfCommandes)
}catch(error)
{
    res.status(500).json({
        error:"erreur d'acces aux donnees"
    })
}
}

module.exports = {getCommande}