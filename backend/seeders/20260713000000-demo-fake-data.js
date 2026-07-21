'use strict';

const bcrypt = require('bcrypt');

module.exports = {
  async up(queryInterface, Sequelize) {
    const [userRows] = await queryInterface.sequelize.query('SELECT COUNT(*) AS count FROM Users');
    if (Number(userRows[0].count) > 0) {
      return;
    }

    const now = new Date();
    const passwordHash = await bcrypt.hash('password123', 10);

    const users = [
      { id: 1, email: 'amina.benali@example.com', password_hash: passwordHash, role: 'client', nom: 'Benali', prenom: 'Amina', telephone: '0601010101', photo: 'https://i.pravatar.cc/150?img=1', is_active: true, created_at: now, createdAt: now, updatedAt: now },
      { id: 2, email: 'youssef.martin@example.com', password_hash: passwordHash, role: 'client', nom: 'Martin', prenom: 'Youssef', telephone: '0611121314', photo: 'https://i.pravatar.cc/150?img=2', is_active: true, created_at: now, createdAt: now, updatedAt: now },
      { id: 3, email: 'sarah.ouaaz@example.com', password_hash: passwordHash, role: 'client', nom: 'Ouaaz', prenom: 'Sarah', telephone: '0622232425', photo: 'https://i.pravatar.cc/150?img=3', is_active: true, created_at: now, createdAt: now, updatedAt: now },
      { id: 4, email: 'hassan.karimi@example.com', password_hash: passwordHash, role: 'livreur', nom: 'Karimi', prenom: 'Hassan', telephone: '0633343536', photo: 'https://i.pravatar.cc/150?img=4', is_active: true, created_at: now, createdAt: now, updatedAt: now },
      { id: 5, email: 'maria.bernard@example.com', password_hash: passwordHash, role: 'livreur', nom: 'Bernard', prenom: 'Maria', telephone: '0644454647', photo: 'https://i.pravatar.cc/150?img=5', is_active: true, created_at: now, createdAt: now, updatedAt: now },
      { id: 6, email: 'karim.essafi@example.com', password_hash: passwordHash, role: 'livreur', nom: 'Essafi', prenom: 'Karim', telephone: '0655565758', photo: 'https://i.pravatar.cc/150?img=6', is_active: true, created_at: now, createdAt: now, updatedAt: now },
      { id: 7, email: 'nadia.lahlou@example.com', password_hash: passwordHash, role: 'livreur', nom: 'Lahlou', prenom: 'Nadia', telephone: '0666676869', photo: 'https://i.pravatar.cc/150?img=7', is_active: true, created_at: now, createdAt: now, updatedAt: now },
      { id: 8, email: 'zakaria.elmouden@example.com', password_hash: passwordHash, role: 'admin', nom: 'Elmouden', prenom: 'Zakaria', telephone: '0677787980', photo: 'https://i.pravatar.cc/150?img=8', is_active: true, created_at: now, createdAt: now, updatedAt: now },
      { id: 9, email: 'salma.rami@example.com', password_hash: passwordHash, role: 'livreur', nom: 'Rami', prenom: 'Salma', telephone: '0688899091', photo: 'https://i.pravatar.cc/150?img=9', is_active: true, created_at: now, createdAt: now, updatedAt: now },
      { id: 10, email: 'mehdi.bounajma@example.com', password_hash: passwordHash, role: 'client', nom: 'Bounajma', prenom: 'Mehdi', telephone: '0699909192', photo: 'https://i.pravatar.cc/150?img=10', is_active: true, created_at: now, createdAt: now, updatedAt: now }
    ];

    await queryInterface.bulkInsert('Users', users, {});

    const codePostals = [
      { code: 20000, nom: 'Casablanca', createdAt: now, updatedAt: now },
      { code: 10000, nom: 'Rabat', createdAt: now, updatedAt: now },
      { code: 90000, nom: 'Tanger', createdAt: now, updatedAt: now },
      { code: 30000, nom: 'Fès', createdAt: now, updatedAt: now },
      { code: 40000, nom: 'Meknès', createdAt: now, updatedAt: now },
      { code: 40010, nom: 'Marrakech', createdAt: now, updatedAt: now },
      { code: 80000, nom: 'Agadir', createdAt: now, updatedAt: now },
      { code: 25000, nom: 'Kénitra', createdAt: now, updatedAt: now },
      { code: 24000, nom: 'El Jadida', createdAt: now, updatedAt: now },
      { code: 60000, nom: 'Oujda', createdAt: now, updatedAt: now }
    ];

    await queryInterface.bulkInsert('codePostals', codePostals, {});

    // One Livreur profile per user that actually has role "livreur" (4, 5, 6, 7, 9).
    const livreurs = [
      { id: 1, user_id: 4, type_vehicule: 'moto', statut: 'disponible', total_livraison: 12, geoOcpation: 20000, createdAt: now, updatedAt: now },
      { id: 2, user_id: 5, type_vehicule: 'voiture', statut: 'occupe', total_livraison: 8, geoOcpation: 10000, createdAt: now, updatedAt: now },
      { id: 3, user_id: 6, type_vehicule: 'velo', statut: 'disponible', total_livraison: 4, geoOcpation: 90000, createdAt: now, updatedAt: now },
      { id: 4, user_id: 7, type_vehicule: 'moto', statut: 'disponible', total_livraison: 15, geoOcpation: 30000, createdAt: now, updatedAt: now },
      { id: 5, user_id: 9, type_vehicule: 'moto', statut: 'occupe', total_livraison: 19, geoOcpation: 40010, createdAt: now, updatedAt: now }
    ];

    await queryInterface.bulkInsert('Livreurs', livreurs, {});

    // client_id always points at a user with role "client" (1, 2, 3, 10) so the
    // commandes actually show up through the API's client-role-filtered join.
    // livreur_id points at Livreurs.id (1-5); null means "not assigned yet".
    const commandes = [
      { id: 1, type_commande: 'restaurant', nom_retrait: 'Le Petit Bistro', telephone_retrait: '0600000001', adresse_retrait: 'Rue de la Paix, Casablanca', nom_livraison: 'Amina Benali', telephone_livraison: '0601010101', adresse_livraison: 'Avenue Hassan II, Casablanca', distanceKM: 4.5, instructionSpecial: 'Sonner à l’interphone', prixLivraison: 27.5, mode_paiement: 'cash', Statut: 'en_attente', client_id: 1, livreur_id: null, created_at: now, createdAt: now, updatedAt: now },
      { id: 2, type_commande: 'pharmacie', nom_retrait: 'Pharmacie des Fleurs', telephone_retrait: '0600000002', adresse_retrait: 'Bd Mohammed V, Rabat', nom_livraison: 'Youssef Martin', telephone_livraison: '0611121314', adresse_livraison: 'Rue d’Azilal, Rabat', distanceKM: 6.2, instructionSpecial: 'Livrer avant 18h', prixLivraison: 35.0, mode_paiement: 'carte', Statut: 'assignee', client_id: 2, livreur_id: 1, created_at: now, createdAt: now, updatedAt: now },
      { id: 3, type_commande: 'colis', nom_retrait: 'Express Box', telephone_retrait: '0600000003', adresse_retrait: 'Place de l’Indépendance, Tanger', nom_livraison: 'Sarah Ouaaz', telephone_livraison: '0622232425', adresse_livraison: 'Rue de la Kasbah, Tanger', distanceKM: 8.0, instructionSpecial: 'À laisser chez le gardien', prixLivraison: 42.0, mode_paiement: 'cash', Statut: 'en_retrait', client_id: 3, livreur_id: 2, created_at: now, createdAt: now, updatedAt: now },
      { id: 4, type_commande: 'courses', nom_retrait: 'Supermarché Atlas', telephone_retrait: '0600000004', adresse_retrait: 'Av. Ibn Sina, Fès', nom_livraison: 'Mehdi Bounajma', telephone_livraison: '0699909192', adresse_livraison: 'Rue Al Qods, Fès', distanceKM: 3.8, instructionSpecial: 'Pas de sucre', prixLivraison: 24.5, mode_paiement: 'carte', Statut: 'recuperee', client_id: 10, livreur_id: 3, created_at: now, createdAt: now, updatedAt: now },
      { id: 5, type_commande: 'restaurant', nom_retrait: 'Pizza House', telephone_retrait: '0600000005', adresse_retrait: 'Rue de la Liberté, Marrakech', nom_livraison: 'Amina Benali', telephone_livraison: '0601010101', adresse_livraison: 'Av. Yacoub El Mansour, Marrakech', distanceKM: 5.6, instructionSpecial: 'Déposer au portail', prixLivraison: 30.0, mode_paiement: 'cash', Statut: 'livree', client_id: 1, livreur_id: 4, created_at: now, createdAt: now, updatedAt: now },
      { id: 6, type_commande: 'pharmacie', nom_retrait: 'Pharma Plus', telephone_retrait: '0600000006', adresse_retrait: 'Rue Moulay Ismail, Meknès', nom_livraison: 'Youssef Martin', telephone_livraison: '0611121314', adresse_livraison: 'Bd Hassan II, Meknès', distanceKM: 7.1, instructionSpecial: 'Appeler avant de monter', prixLivraison: 38.5, mode_paiement: 'carte', Statut: 'annulee', client_id: 2, livreur_id: 5, created_at: now, createdAt: now, updatedAt: now },
      { id: 7, type_commande: 'colis', nom_retrait: 'Colis Direct', telephone_retrait: '0600000007', adresse_retrait: 'Avenue Al Wahda, Oujda', nom_livraison: 'Sarah Ouaaz', telephone_livraison: '0622232425', adresse_livraison: 'Rue des Orangers, Oujda', distanceKM: 9.4, instructionSpecial: 'À remettre au voisin', prixLivraison: 50.0, mode_paiement: 'cash', Statut: 'en_attente', client_id: 3, livreur_id: null, created_at: now, createdAt: now, updatedAt: now },
      { id: 8, type_commande: 'courses', nom_retrait: 'Market 24', telephone_retrait: '0600000008', adresse_retrait: 'Rue du Commerce, Agadir', nom_livraison: 'Mehdi Bounajma', telephone_livraison: '0699909192', adresse_livraison: 'Avenue du 20 Août, Agadir', distanceKM: 2.9, instructionSpecial: 'Livraison discrète', prixLivraison: 19.5, mode_paiement: 'carte', Statut: 'assignee', client_id: 10, livreur_id: 1, created_at: now, createdAt: now, updatedAt: now },
      { id: 9, type_commande: 'restaurant', nom_retrait: 'Mamma Pizza', telephone_retrait: '0600000009', adresse_retrait: 'Place du 16 Novembre, Kenitra', nom_livraison: 'Amina Benali', telephone_livraison: '0601010101', adresse_livraison: 'Rue de la Kasbah, Kenitra', distanceKM: 4.0, instructionSpecial: 'Ne pas sonner après 21h', prixLivraison: 23.0, mode_paiement: 'cash', Statut: 'recuperee', client_id: 1, livreur_id: 2, created_at: now, createdAt: now, updatedAt: now },
      { id: 10, type_commande: 'pharmacie', nom_retrait: 'Sante Express', telephone_retrait: '0600000010', adresse_retrait: 'Rue de l’Atlas, El Jadida', nom_livraison: 'Youssef Martin', telephone_livraison: '0611121314', adresse_livraison: 'Bd Zerktouni, El Jadida', distanceKM: 5.1, instructionSpecial: 'Conserver au frais', prixLivraison: 28.0, mode_paiement: 'carte', Statut: 'livree', client_id: 2, livreur_id: 3, created_at: now, createdAt: now, updatedAt: now }
    ];

    await queryInterface.bulkInsert('commandes', commandes, {});

    const historiques = [
      { id: 1, ancien_statut: 'en_attente', nouveau_statut: 'assignee', commande_id: 2, changed_by: 8, changed_at: now, createdAt: now, updatedAt: now },
      { id: 2, ancien_statut: 'assignee', nouveau_statut: 'en_retrait', commande_id: 3, changed_by: 6, changed_at: now, createdAt: now, updatedAt: now },
      { id: 3, ancien_statut: 'en_retrait', nouveau_statut: 'recuperee', commande_id: 4, changed_by: 6, changed_at: now, createdAt: now, updatedAt: now },
      { id: 4, ancien_statut: 'recuperee', nouveau_statut: 'livree', commande_id: 5, changed_by: 7, changed_at: now, createdAt: now, updatedAt: now },
      { id: 5, ancien_statut: 'en_attente', nouveau_statut: 'annulee', commande_id: 6, changed_by: 8, changed_at: now, createdAt: now, updatedAt: now },
      { id: 6, ancien_statut: 'en_attente', nouveau_statut: 'assignee', commande_id: 8, changed_by: 8, changed_at: now, createdAt: now, updatedAt: now },
      { id: 7, ancien_statut: 'assignee', nouveau_statut: 'en_retrait', commande_id: 9, changed_by: 5, changed_at: now, createdAt: now, updatedAt: now },
      { id: 8, ancien_statut: 'en_retrait', nouveau_statut: 'recuperee', commande_id: 9, changed_by: 5, changed_at: now, createdAt: now, updatedAt: now },
      { id: 9, ancien_statut: 'recuperee', nouveau_statut: 'livree', commande_id: 10, changed_by: 6, changed_at: now, createdAt: now, updatedAt: now },
      { id: 10, ancien_statut: 'en_attente', nouveau_statut: 'livree', commande_id: 1, changed_by: 4, changed_at: now, createdAt: now, updatedAt: now }
    ];

    await queryInterface.bulkInsert('statutHistoriques', historiques, {});

    // settings holds a single global config row (model has no timestamps).
    const settings = [
      { id: 1, tarifKm: 3.5, prixbase: 15.0, fraisLivreur: 0.2 }
    ];

    await queryInterface.bulkInsert('settings', settings, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('statutHistoriques', null, {});
    await queryInterface.bulkDelete('commandes', null, {});
    await queryInterface.bulkDelete('Livreurs', null, {});
    await queryInterface.bulkDelete('codePostals', null, {});
    await queryInterface.bulkDelete('Users', null, {});
    await queryInterface.bulkDelete('settings', null, {});
  }
};
