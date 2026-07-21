const { getStats } = require("./getStats");
const { getCommandeService } = require("./commandeService");
const { getCommandeWhere } = require("./commandeFilterService");

const statusConfig = {
    en_attente: {
        currentStep: 0,
        color: "#F1C40F",
    },
    assignee: {
        currentStep: 1,
        color: "#3498DB",
    },
    en_retrait: {
        currentStep: 2,
        color: "#E67E22",
    },
    recuperee: {
        currentStep: 3,
        color: "#9B59B6",
    },
    livree: {
        currentStep: 4,
        color: "#27AE60",
    },
    annulee: {
        currentStep: 4,
        color: "#E74C3C",
    },
};

const getDashboard = async (user) => {
    const where = await getCommandeWhere(user);

    const [stats, commandes] = await Promise.all([
        getStats(user),
        getCommandeService(where, {})
    ]);

    const deliveries = commandes.map((commande) => {

        const config =
            statusConfig[commande.Statut] ||
            {
                currentStep: 0,
                color: "#95A5A6",
            };

        return {
            name: commande.nom_livraison,
            currentStep: config.currentStep,
            color: config.color,
        };
    });

    return {
        stats,
        deliveries,
    };
};

module.exports = { getDashboard };