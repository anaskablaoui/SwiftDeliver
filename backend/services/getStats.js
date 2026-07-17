const db = require('../models');
const { Op } = require('sequelize');

const getStats = async (user) => {
    let stats = {}
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);
    try {
        switch (user.role) {
            case 'admin': {
                const [totalClient, totalLivreur, totalGains] = await Promise.all([
                    db.User.count({ where: { role: 'client' } }),
                    db.User.count({ where: { role: 'livreur' } }),
                    db.commande.sum('prixLivraison')
                ])
                stats = { totalClient, totalLivreur, totalGains: totalGains || 0 }
                break;
            }
            case 'livreur': {
                const livreur = await db.Livreur.findOne({ where: { user_id: user.id } });
                const livreurId = livreur ? livreur.id : null;

                const [todayMissions, totalMission, totalGains] = await Promise.all([
                    db.commande.count({
                        where: {
                            livreur_id: livreurId,
                            created_at: { [Op.between]: [startOfDay, endOfDay] }
                        }
                    }),
                    db.commande.count({ where: { livreur_id: livreurId } }),
                    db.commande.sum('prixLivraison', { where: { livreur_id: livreurId } })
                ])
                stats = { todayMissions, totalMission, totalGains: totalGains || 0 }
                break;
            }
            default: {
                const [totalCommande, commandeEnCours, commandeAnnule] = await Promise.all([
                    db.commande.count({ where: { client_id: user.id } }),
                    db.commande.count({ where: { client_id: user.id, Statut: 'assignee' } }),
                    db.commande.count({ where: { client_id: user.id, Statut: 'annulee' } })
                ])
                stats = { totalCommande, commandeEnCours, commandeAnnule }
            }
        }
        return stats;
    }
    catch (error) {
        console.log(error)
        return null;
    }
}

module.exports = { getStats };
