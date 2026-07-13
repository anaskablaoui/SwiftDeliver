const db = require('../models');

const fakeUsers = [
  { email: 'amina.benali@example.com', password_hash: 'hash_amina', role: 'client', nom: 'Benali', prenom: 'Amina', telephone: '0601010101', photo: 'https://i.pravatar.cc/150?img=1', is_active: true },
  { email: 'youssef.martin@example.com', password_hash: 'hash_youssef', role: 'client', nom: 'Martin', prenom: 'Youssef', telephone: '0611121314', photo: 'https://i.pravatar.cc/150?img=2', is_active: true },
  { email: 'sarah.ouaaz@example.com', password_hash: 'hash_sarah', role: 'client', nom: 'Ouaaz', prenom: 'Sarah', telephone: '0622232425', photo: 'https://i.pravatar.cc/150?img=3', is_active: true },
  { email: 'hassan.karimi@example.com', password_hash: 'hash_hassan', role: 'livreur', nom: 'Karimi', prenom: 'Hassan', telephone: '0633343536', photo: 'https://i.pravatar.cc/150?img=4', is_active: true },
  { email: 'maria.bernard@example.com', password_hash: 'hash_maria', role: 'livreur', nom: 'Bernard', prenom: 'Maria', telephone: '0644454647', photo: 'https://i.pravatar.cc/150?img=5', is_active: true },
  { email: 'karim.essafi@example.com', password_hash: 'hash_karim', role: 'livreur', nom: 'Essafi', prenom: 'Karim', telephone: '0655565758', photo: 'https://i.pravatar.cc/150?img=6', is_active: true },
  { email: 'nadia.lahlou@example.com', password_hash: 'hash_nadia', role: 'livreur', nom: 'Lahlou', prenom: 'Nadia', telephone: '0666676869', photo: 'https://i.pravatar.cc/150?img=7', is_active: true },
  { email: 'zakaria.elmouden@example.com', password_hash: 'hash_zakaria', role: 'admin', nom: 'Elmouden', prenom: 'Zakaria', telephone: '0677787980', photo: 'https://i.pravatar.cc/150?img=8', is_active: true },
  { email: 'salma.rami@example.com', password_hash: 'hash_salma', role: 'livreur', nom: 'Rami', prenom: 'Salma', telephone: '0688899091', photo: 'https://i.pravatar.cc/150?img=9', is_active: true },
  { email: 'mehdi.bounajma@example.com', password_hash: 'hash_mehdi', role: 'client', nom: 'Bounajma', prenom: 'Mehdi', telephone: '0699909192', photo: 'https://i.pravatar.cc/150?img=10', is_active: true }
];

const fakeLivreurs = [
  { user_id: 4, type_vehicule: 'moto', statut: 'disponible', total_livraison: 12 },
  { user_id: 5, type_vehicule: 'voiture', statut: 'occupe', total_livraison: 8 },
  { user_id: 6, type_vehicule: 'velo', statut: 'disponible', total_livraison: 4 },
  { user_id: 7, type_vehicule: 'moto', statut: 'disponible', total_livraison: 15 },
  { user_id: 8, type_vehicule: 'voiture', statut: 'inactif', total_livraison: 2 },
  { user_id: 9, type_vehicule: 'moto', statut: 'disponible', total_livraison: 19 },
  { user_id: 10, type_vehicule: 'velo', statut: 'occupe', total_livraison: 6 },
  { user_id: 1, type_vehicule: 'moto', statut: 'disponible', total_livraison: 11 },
  { user_id: 2, type_vehicule: 'voiture', statut: 'disponible', total_livraison: 7 },
  { user_id: 3, type_vehicule: 'velo', statut: 'occupe', total_livraison: 5 }
];

const fakeCommandes = [
  { type_commmande: 'restaurant', nom_retrait: 'Le Petit Bistro', telephone_retrait: '0600000001', adress_retirait: 'Rue de la Paix, Casablanca', nom_livraison: 'Amina Benali', telephone_livraison: '0601010101', adress_livraison: 'Avenue Hassan II, Casablanca', distanceKM: 4.5, instructionSpecial: 'Sonner à l’interphone', prixLivraison: 27.5, mode_paiement: 'cash', Statut: 'en_attente', client_id: 1, livreur_id: 4, created_at: new Date() },
  { type_commmande: 'pharmacie', nom_retrait: 'Pharmacie des Fleurs', telephone_retrait: '0600000002', adress_retirait: 'Bd Mohammed V, Rabat', nom_livraison: 'Youssef Martin', telephone_livraison: '0611121314', adress_livraison: 'Rue d’Azilal, Rabat', distanceKM: 6.2, instructionSpecial: 'Livrer avant 18h', prixLivraison: 35.0, mode_paiement: 'carte', Statut: 'assignee', client_id: 2, livreur_id: 5, created_at: new Date() },
  { type_commmande: 'colis', nom_retrait: 'Express Box', telephone_retrait: '0600000003', adress_retirait: 'Place de l’Indépendance, Tanger', nom_livraison: 'Sarah Ouaaz', telephone_livraison: '0622232425', adress_livraison: 'Rue de la Kasbah, Tanger', distanceKM: 8.0, instructionSpecial: 'À laisser chez le gardien', prixLivraison: 42.0, mode_paiement: 'cash', Statut: 'en_retrait', client_id: 3, livreur_id: 6, created_at: new Date() },
  { type_commmande: 'courses', nom_retrait: 'Supermarché Atlas', telephone_retrait: '0600000004', adress_retirait: 'Av. Ibn Sina, Fès', nom_livraison: 'Mehdi Bounajma', telephone_livraison: '0699909192', adress_livraison: 'Rue Al Qods, Fès', distanceKM: 3.8, instructionSpecial: 'Pas de sucre', prixLivraison: 24.5, mode_paiement: 'carte', Statut: 'recuperee', client_id: 10, livreur_id: 7, created_at: new Date() },
  { type_commmande: 'restaurant', nom_retrait: 'Pizza House', telephone_retrait: '0600000005', adress_retirait: 'Rue de la Liberté, Marrakech', nom_livraison: 'Hassan Karimi', telephone_livraison: '0633343536', adress_livraison: 'Av. Yacoub El Mansour, Marrakech', distanceKM: 5.6, instructionSpecial: 'Déposer au portail', prixLivraison: 30.0, mode_paiement: 'cash', Statut: 'livree', client_id: 4, livreur_id: 8, created_at: new Date() },
  { type_commmande: 'pharmacie', nom_retrait: 'Pharma Plus', telephone_retrait: '0600000006', adress_retirait: 'Rue Moulay Ismail, Meknès', nom_livraison: 'Maria Bernard', telephone_livraison: '0644454647', adress_livraison: 'Bd Hassan II, Meknès', distanceKM: 7.1, instructionSpecial: 'Appeler avant de monter', prixLivraison: 38.5, mode_paiement: 'carte', Statut: 'annulee', client_id: 5, livreur_id: 9, created_at: new Date() },
  { type_commmande: 'colis', nom_retrait: 'Colis Direct', telephone_retrait: '0600000007', adress_retirait: 'Avenue Al Wahda, Oujda', nom_livraison: 'Karim Essafi', telephone_livraison: '0655565758', adress_livraison: 'Rue des Orangers, Oujda', distanceKM: 9.4, instructionSpecial: 'À remettre au voisin', prixLivraison: 50.0, mode_paiement: 'cash', Statut: 'en_attente', client_id: 6, livreur_id: 10, created_at: new Date() },
  { type_commmande: 'courses', nom_retrait: 'Market 24', telephone_retrait: '0600000008', adress_retirait: 'Rue du Commerce, Agadir', nom_livraison: 'Nadia Lahlou', telephone_livraison: '0666676869', adress_livraison: 'Avenue du 20 Août, Agadir', distanceKM: 2.9, instructionSpecial: 'Livraison discrète', prixLivraison: 19.5, mode_paiement: 'carte', Statut: 'assignee', client_id: 7, livreur_id: 1, created_at: new Date() },
  { type_commmande: 'restaurant', nom_retrait: 'Mamma Pizza', telephone_retrait: '0600000009', adress_retirait: 'Place du 16 Novembre, Kenitra', nom_livraison: 'Zakaria Elmouden', telephone_livraison: '0677787980', adress_livraison: 'Rue de la Kasbah, Kenitra', distanceKM: 4.0, instructionSpecial: 'Ne pas sonner après 21h', prixLivraison: 23.0, mode_paiement: 'cash', Statut: 'recuperee', client_id: 8, livreur_id: 2, created_at: new Date() },
  { type_commmande: 'pharmacie', nom_retrait: 'Sante Express', telephone_retrait: '0600000010', adress_retirait: 'Rue de l’Atlas, El Jadida', nom_livraison: 'Salma Rami', telephone_livraison: '0688899091', adress_livraison: 'Bd Zerktouni, El Jadida', distanceKM: 5.1, instructionSpecial: 'Conserver au frais', prixLivraison: 28.0, mode_paiement: 'carte', Statut: 'livree', client_id: 9, livreur_id: 3, created_at: new Date() }
];

const fakeHistoriques = [
  { ancien_statut: 'en_attente', nouveau_statut: 'assignee', commande_id: 1, changed_by: 4, changed_at: new Date() },
  { ancien_statut: 'assignee', nouveau_statut: 'en_retrait', commande_id: 2, changed_by: 5, changed_at: new Date() },
  { ancien_statut: 'en_retrait', nouveau_statut: 'recuperee', commande_id: 3, changed_by: 6, changed_at: new Date() },
  { ancien_statut: 'recuperee', nouveau_statut: 'livree', commande_id: 4, changed_by: 7, changed_at: new Date() },
  { ancien_statut: 'en_attente', nouveau_statut: 'annulee', commande_id: 5, changed_by: 8, changed_at: new Date() },
  { ancien_statut: 'assignee', nouveau_statut: 'en_attente', commande_id: 6, changed_by: 9, changed_at: new Date() },
  { ancien_statut: 'en_attente', nouveau_statut: 'assignee', commande_id: 7, changed_by: 10, changed_at: new Date() },
  { ancien_statut: 'assignee', nouveau_statut: 'recuperee', commande_id: 8, changed_by: 1, changed_at: new Date() },
  { ancien_statut: 'recuperee', nouveau_statut: 'livree', commande_id: 9, changed_by: 2, changed_at: new Date() },
  { ancien_statut: 'en_attente', nouveau_statut: 'livree', commande_id: 10, changed_by: 3, changed_at: new Date() }
];

const fakeSettings = [
  { cle: 'prix_base', valeur: '15', description: 'Prix de base de livraison en MAD' },
  { cle: 'tarif_km', valeur: '3.5', description: 'Tarif par kilomètre en MAD' },
  { cle: 'delai_max', valeur: '45', description: 'Délai maximum de livraison en minutes' },
  { cle: 'frais_service', valeur: '2', description: 'Frais de service applicables' },
  { cle: 'remise_client', valeur: '5', description: 'Remise promotionnelle par défaut' },
  { cle: 'heure_debut', valeur: '08:00', description: 'Heure de début de service' },
  { cle: 'heure_fin', valeur: '22:00', description: 'Heure de fin de service' },
  { cle: 'zone_couverte', valeur: 'Casablanca,Rabat,Tanger', description: 'Villes couvertes' },
  { cle: 'paiement_cash', valeur: 'true', description: 'Paiement en espèces autorisé' },
  { cle: 'paiement_carte', valeur: 'true', description: 'Paiement par carte autorisé' }
];

async function seed() {
  try {
    await db.sequelize.authenticate();
    await db.sequelize.sync({ alter: true });

    const usersCount = await db.User.count();
    if (usersCount > 0) {
      console.log('Des données fake existent déjà. Aucune insertion supplémentaire effectuée.');
      process.exit(0);
    }

    const users = await db.User.bulkCreate(fakeUsers);
    const livreurs = await db.Livreur.bulkCreate(fakeLivreurs);
    const commandes = await db.commande.bulkCreate(fakeCommandes);
    const historiques = await db.statutHistorique.bulkCreate(fakeHistoriques);
    const settings = await db.settings.bulkCreate(fakeSettings);

    console.log(`Seed OK: ${users.length} utilisateurs, ${livreurs.length} livreurs, ${commandes.length} commandes, ${historiques.length} historiques, ${settings.length} paramètres.`);
  } catch (error) {
    console.error('Erreur pendant le seed fake:', error);
    process.exit(1);
  }
}

seed();
