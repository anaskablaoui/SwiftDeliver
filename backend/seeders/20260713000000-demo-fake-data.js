'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const [userRows] = await queryInterface.sequelize.query('SELECT COUNT(*) AS count FROM Users');
    if (Number(userRows[0].count) > 0) {
      return;
    }

    const now = new Date();

    const users = [
      { id: 1, email: 'amina.benali@example.com', password_hash: 'hash_amina', role: 'client', nom: 'Benali', prenom: 'Amina', telephone: '0601010101', photo: 'https://i.pravatar.cc/150?img=1', is_active: true, created_at: now, createdAt: now, updatedAt: now },
      { id: 2, email: 'youssef.martin@example.com', password_hash: 'hash_youssef', role: 'client', nom: 'Martin', prenom: 'Youssef', telephone: '0611121314', photo: 'https://i.pravatar.cc/150?img=2', is_active: true, created_at: now, createdAt: now, updatedAt: now },
      { id: 3, email: 'sarah.ouaaz@example.com', password_hash: 'hash_sarah', role: 'client', nom: 'Ouaaz', prenom: 'Sarah', telephone: '0622232425', photo: 'https://i.pravatar.cc/150?img=3', is_active: true, created_at: now, createdAt: now, updatedAt: now },
      { id: 4, email: 'hassan.karimi@example.com', password_hash: 'hash_hassan', role: 'livreur', nom: 'Karimi', prenom: 'Hassan', telephone: '0633343536', photo: 'https://i.pravatar.cc/150?img=4', is_active: true, created_at: now, createdAt: now, updatedAt: now },
      { id: 5, email: 'maria.bernard@example.com', password_hash: 'hash_maria', role: 'livreur', nom: 'Bernard', prenom: 'Maria', telephone: '0644454647', photo: 'https://i.pravatar.cc/150?img=5', is_active: true, created_at: now, createdAt: now, updatedAt: now },
      { id: 6, email: 'karim.essafi@example.com', password_hash: 'hash_karim', role: 'livreur', nom: 'Essafi', prenom: 'Karim', telephone: '0655565758', photo: 'https://i.pravatar.cc/150?img=6', is_active: true, created_at: now, createdAt: now, updatedAt: now },
      { id: 7, email: 'nadia.lahlou@example.com', password_hash: 'hash_nadia', role: 'livreur', nom: 'Lahlou', prenom: 'Nadia', telephone: '0666676869', photo: 'https://i.pravatar.cc/150?img=7', is_active: true, created_at: now, createdAt: now, updatedAt: now },
      { id: 8, email: 'zakaria.elmouden@example.com', password_hash: 'hash_zakaria', role: 'admin', nom: 'Elmouden', prenom: 'Zakaria', telephone: '0677787980', photo: 'https://i.pravatar.cc/150?img=8', is_active: true, created_at: now, createdAt: now, updatedAt: now },
      { id: 9, email: 'salma.rami@example.com', password_hash: 'hash_salma', role: 'livreur', nom: 'Rami', prenom: 'Salma', telephone: '0688899091', photo: 'https://i.pravatar.cc/150?img=9', is_active: true, created_at: now, createdAt: now, updatedAt: now },
      { id: 10, email: 'mehdi.bounajma@example.com', password_hash: 'hash_mehdi', role: 'client', nom: 'Bounajma', prenom: 'Mehdi', telephone: '0699909192', photo: 'https://i.pravatar.cc/150?img=10', is_active: true, created_at: now, createdAt: now, updatedAt: now }
    ];

    await queryInterface.bulkInsert('Users', users, {});

    const livreurs = [
      { id: 1, user_id: 4, type_vehicule: 'moto', statut: 'disponible', total_livraison: 12, createdAt: now, updatedAt: now },
      { id: 2, user_id: 5, type_vehicule: 'voiture', statut: 'occupe', total_livraison: 8, createdAt: now, updatedAt: now },
      { id: 3, user_id: 6, type_vehicule: 'velo', statut: 'disponible', total_livraison: 4, createdAt: now, updatedAt: now },
      { id: 4, user_id: 7, type_vehicule: 'moto', statut: 'disponible', total_livraison: 15, createdAt: now, updatedAt: now },
      { id: 5, user_id: 8, type_vehicule: 'voiture', statut: 'inactif', total_livraison: 2, createdAt: now, updatedAt: now },
      { id: 6, user_id: 9, type_vehicule: 'moto', statut: 'disponible', total_livraison: 19, createdAt: now, updatedAt: now },
      { id: 7, user_id: 10, type_vehicule: 'velo', statut: 'occupe', total_livraison: 6, createdAt: now, updatedAt: now },
      { id: 8, user_id: 1, type_vehicule: 'moto', statut: 'disponible', total_livraison: 11, createdAt: now, updatedAt: now },
      { id: 9, user_id: 2, type_vehicule: 'voiture', statut: 'disponible', total_livraison: 7, createdAt: now, updatedAt: now },
      { id: 10, user_id: 3, type_vehicule: 'velo', statut: 'occupe', total_livraison: 5, createdAt: now, updatedAt: now }
    ];

    await queryInterface.bulkInsert('Livreurs', livreurs, {});

    const commandes = [
      { id: 1, type_commmande: 'restaurant', nom_retrait: 'Le Petit Bistro', telephone_retrait: '0600000001', adress_retirait: 'Rue de la Paix, Casablanca', nom_livraison: 'Amina Benali', telephone_livraison: '0601010101', adress_livraison: 'Avenue Hassan II, Casablanca', distanceKM: 4.5, instructionSpecial: 'Sonner à l’interphone', prixLivraison: 27.5, mode_paiement: 'cash', Statut: 'en_attente', client_id: 1, livreur_id: 4, created_at: now, createdAt: now, updatedAt: now },
      { id: 2, type_commmande: 'pharmacie', nom_retrait: 'Pharmacie des Fleurs', telephone_retrait: '0600000002', adress_retirait: 'Bd Mohammed V, Rabat', nom_livraison: 'Youssef Martin', telephone_livraison: '0611121314', adress_livraison: 'Rue d’Azilal, Rabat', distanceKM: 6.2, instructionSpecial: 'Livrer avant 18h', prixLivraison: 35.0, mode_paiement: 'carte', Statut: 'assignee', client_id: 2, livreur_id: 5, created_at: now, createdAt: now, updatedAt: now },
      { id: 3, type_commmande: 'colis', nom_retrait: 'Express Box', telephone_retrait: '0600000003', adress_retirait: 'Place de l’Indépendance, Tanger', nom_livraison: 'Sarah Ouaaz', telephone_livraison: '0622232425', adress_livraison: 'Rue de la Kasbah, Tanger', distanceKM: 8.0, instructionSpecial: 'À laisser chez le gardien', prixLivraison: 42.0, mode_paiement: 'cash', Statut: 'en_retrait', client_id: 3, livreur_id: 6, created_at: now, createdAt: now, updatedAt: now },
      { id: 4, type_commmande: 'courses', nom_retrait: 'Supermarché Atlas', telephone_retrait: '0600000004', adress_retirait: 'Av. Ibn Sina, Fès', nom_livraison: 'Mehdi Bounajma', telephone_livraison: '0699909192', adress_livraison: 'Rue Al Qods, Fès', distanceKM: 3.8, instructionSpecial: 'Pas de sucre', prixLivraison: 24.5, mode_paiement: 'carte', Statut: 'recuperee', client_id: 10, livreur_id: 7, created_at: now, createdAt: now, updatedAt: now },
      { id: 5, type_commmande: 'restaurant', nom_retrait: 'Pizza House', telephone_retrait: '0600000005', adress_retirait: 'Rue de la Liberté, Marrakech', nom_livraison: 'Hassan Karimi', telephone_livraison: '0633343536', adress_livraison: 'Av. Yacoub El Mansour, Marrakech', distanceKM: 5.6, instructionSpecial: 'Déposer au portail', prixLivraison: 30.0, mode_paiement: 'cash', Statut: 'livree', client_id: 4, livreur_id: 8, created_at: now, createdAt: now, updatedAt: now },
      { id: 6, type_commmande: 'pharmacie', nom_retrait: 'Pharma Plus', telephone_retrait: '0600000006', adress_retirait: 'Rue Moulay Ismail, Meknès', nom_livraison: 'Maria Bernard', telephone_livraison: '0644454647', adress_livraison: 'Bd Hassan II, Meknès', distanceKM: 7.1, instructionSpecial: 'Appeler avant de monter', prixLivraison: 38.5, mode_paiement: 'carte', Statut: 'annulee', client_id: 5, livreur_id: 9, created_at: now, createdAt: now, updatedAt: now },
      { id: 7, type_commmande: 'colis', nom_retrait: 'Colis Direct', telephone_retrait: '0600000007', adress_retirait: 'Avenue Al Wahda, Oujda', nom_livraison: 'Karim Essafi', telephone_livraison: '0655565758', adress_livraison: 'Rue des Orangers, Oujda', distanceKM: 9.4, instructionSpecial: 'À remettre au voisin', prixLivraison: 50.0, mode_paiement: 'cash', Statut: 'en_attente', client_id: 6, livreur_id: 10, created_at: now, createdAt: now, updatedAt: now },
      { id: 8, type_commmande: 'courses', nom_retrait: 'Market 24', telephone_retrait: '0600000008', adress_retirait: 'Rue du Commerce, Agadir', nom_livraison: 'Nadia Lahlou', telephone_livraison: '0666676869', adress_livraison: 'Avenue du 20 Août, Agadir', distanceKM: 2.9, instructionSpecial: 'Livraison discrète', prixLivraison: 19.5, mode_paiement: 'carte', Statut: 'assignee', client_id: 7, livreur_id: 1, created_at: now, createdAt: now, updatedAt: now },
      { id: 9, type_commmande: 'restaurant', nom_retrait: 'Mamma Pizza', telephone_retrait: '0600000009', adress_retirait: 'Place du 16 Novembre, Kenitra', nom_livraison: 'Zakaria Elmouden', telephone_livraison: '0677787980', adress_livraison: 'Rue de la Kasbah, Kenitra', distanceKM: 4.0, instructionSpecial: 'Ne pas sonner après 21h', prixLivraison: 23.0, mode_paiement: 'cash', Statut: 'recuperee', client_id: 8, livreur_id: 2, created_at: now, createdAt: now, updatedAt: now },
      { id: 10, type_commmande: 'pharmacie', nom_retrait: 'Sante Express', telephone_retrait: '0600000010', adress_retirait: 'Rue de l’Atlas, El Jadida', nom_livraison: 'Salma Rami', telephone_livraison: '0688899091', adress_livraison: 'Bd Zerktouni, El Jadida', distanceKM: 5.1, instructionSpecial: 'Conserver au frais', prixLivraison: 28.0, mode_paiement: 'carte', Statut: 'livree', client_id: 9, livreur_id: 3, created_at: now, createdAt: now, updatedAt: now }
    ];

    await queryInterface.bulkInsert('commandes', commandes, {});

    const historiques = [
      { id: 1, ancien_statut: 'en_attente', nouveau_statut: 'assignee', commande_id: 1, changed_by: 4, changed_at: now, createdAt: now, updatedAt: now },
      { id: 2, ancien_statut: 'assignee', nouveau_statut: 'en_retrait', commande_id: 2, changed_by: 5, changed_at: now, createdAt: now, updatedAt: now },
      { id: 3, ancien_statut: 'en_retrait', nouveau_statut: 'recuperee', commande_id: 3, changed_by: 6, changed_at: now, createdAt: now, updatedAt: now },
      { id: 4, ancien_statut: 'recuperee', nouveau_statut: 'livree', commande_id: 4, changed_by: 7, changed_at: now, createdAt: now, updatedAt: now },
      { id: 5, ancien_statut: 'en_attente', nouveau_statut: 'annulee', commande_id: 5, changed_by: 8, changed_at: now, createdAt: now, updatedAt: now },
      { id: 6, ancien_statut: 'assignee', nouveau_statut: 'en_attente', commande_id: 6, changed_by: 9, changed_at: now, createdAt: now, updatedAt: now },
      { id: 7, ancien_statut: 'en_attente', nouveau_statut: 'assignee', commande_id: 7, changed_by: 10, changed_at: now, createdAt: now, updatedAt: now },
      { id: 8, ancien_statut: 'assignee', nouveau_statut: 'recuperee', commande_id: 8, changed_by: 1, changed_at: now, createdAt: now, updatedAt: now },
      { id: 9, ancien_statut: 'recuperee', nouveau_statut: 'livree', commande_id: 9, changed_by: 2, changed_at: now, createdAt: now, updatedAt: now },
      { id: 10, ancien_statut: 'en_attente', nouveau_statut: 'livree', commande_id: 10, changed_by: 3, changed_at: now, createdAt: now, updatedAt: now }
    ];

    await queryInterface.bulkInsert('statutHistoriques', historiques, {});

    const settings = [
      { id: 1, cle: 'prix_base', valeur: '15', description: 'Prix de base de livraison en MAD', createdAt: now, updatedAt: now },
      { id: 2, cle: 'tarif_km', valeur: '3.5', description: 'Tarif par kilomètre en MAD', createdAt: now, updatedAt: now },
      { id: 3, cle: 'delai_max', valeur: '45', description: 'Délai maximum de livraison en minutes', createdAt: now, updatedAt: now },
      { id: 4, cle: 'frais_service', valeur: '2', description: 'Frais de service applicables', createdAt: now, updatedAt: now },
      { id: 5, cle: 'remise_client', valeur: '5', description: 'Remise promotionnelle par défaut', createdAt: now, updatedAt: now },
      { id: 6, cle: 'heure_debut', valeur: '08:00', description: 'Heure de début de service', createdAt: now, updatedAt: now },
      { id: 7, cle: 'heure_fin', valeur: '22:00', description: 'Heure de fin de service', createdAt: now, updatedAt: now },
      { id: 8, cle: 'zone_couverte', valeur: 'Casablanca,Rabat,Tanger', description: 'Villes couvertes', createdAt: now, updatedAt: now },
      { id: 9, cle: 'paiement_cash', valeur: 'true', description: 'Paiement en espèces autorisé', createdAt: now, updatedAt: now },
      { id: 10, cle: 'paiement_carte', valeur: 'true', description: 'Paiement par carte autorisé', createdAt: now, updatedAt: now }
    ];

    await queryInterface.bulkInsert('settings', settings, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('statutHistoriques', null, {});
    await queryInterface.bulkDelete('commandes', null, {});
    await queryInterface.bulkDelete('Livreurs', null, {});
    await queryInterface.bulkDelete('Users', null, {});
    await queryInterface.bulkDelete('settings', null, {});
  }
};
