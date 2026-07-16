// services/commandeFilterService.js

const db = require('../models');

const getCommandeWhere = async (user) => {
    if (user.role === "client") {
        return {
            client_id: user.id
        };
    }

    else if (user.role === "livreur") {
        const livreur = await db.Livreur.findOne({
            where: {
                user_id: user.id
            }
        });

        return {
            livreur_id: livreur ? livreur.id : null
        };
    }
    else{
        return {}
    }
};

module.exports = { getCommandeWhere };