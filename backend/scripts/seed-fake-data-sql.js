const mysql = require('mysql2/promise');

const connectionConfig = {
  host: 'localhost',
  user: 'root',
  password: 'Ghostofsparta2005',
  database: 'swiftDelieverydb',
};

function fmt(date) {
  return date.toISOString().slice(0, 19).replace('T', ' ');
}

async function seed() {
  const conn = await mysql.createConnection(connectionConfig);
  const now = new Date();
  const nowSql = fmt(now);

  try {
    await conn.query('SET FOREIGN_KEY_CHECKS = 0');
    await conn.query('DELETE FROM statuthistoriques');
    await conn.query('DELETE FROM commandes');
    await conn.query('DELETE FROM livreurs');
    await conn.query('DELETE FROM settings');
    await conn.query('DELETE FROM users');
    await conn.query('ALTER TABLE users AUTO_INCREMENT = 1');
    await conn.query('ALTER TABLE livreurs AUTO_INCREMENT = 1');
    await conn.query('ALTER TABLE commandes AUTO_INCREMENT = 1');
    await conn.query('ALTER TABLE statuthistoriques AUTO_INCREMENT = 1');
    await conn.query('ALTER TABLE settings AUTO_INCREMENT = 1');

    const users = [
      [1, 'amina.benali@example.com', 'hash_amina', 'client', 'Benali', 'Amina', '0601010101', 'https://i.pravatar.cc/150?img=1', 1, nowSql, nowSql, nowSql],
      [2, 'youssef.martin@example.com', 'hash_youssef', 'client', 'Martin', 'Youssef', '0611121314', 'https://i.pravatar.cc/150?img=2', 1, nowSql, nowSql, nowSql],
      [3, 'sarah.ouaaz@example.com', 'hash_sarah', 'client', 'Ouaaz', 'Sarah', '0622232425', 'https://i.pravatar.cc/150?img=3', 1, nowSql, nowSql, nowSql],
      [4, 'hassan.karimi@example.com', 'hash_hassan', 'livreur', 'Karimi', 'Hassan', '0633343536', 'https://i.pravatar.cc/150?img=4', 1, nowSql, nowSql, nowSql],
      [5, 'maria.bernard@example.com', 'hash_maria', 'livreur', 'Bernard', 'Maria', '0644454647', 'https://i.pravatar.cc/150?img=5', 1, nowSql, nowSql, nowSql],
      [6, 'karim.essafi@example.com', 'hash_karim', 'livreur', 'Essafi', 'Karim', '0655565758', 'https://i.pravatar.cc/150?img=6', 1, nowSql, nowSql, nowSql],
      [7, 'nadia.lahlou@example.com', 'hash_nadia', 'livreur', 'Lahlou', 'Nadia', '0666676869', 'https://i.pravatar.cc/150?img=7', 1, nowSql, nowSql, nowSql],
      [8, 'zakaria.elmouden@example.com', 'hash_zakaria', 'admin', 'Elmouden', 'Zakaria', '0677787980', 'https://i.pravatar.cc/150?img=8', 1, nowSql, nowSql, nowSql],
      [9, 'salma.rami@example.com', 'hash_salma', 'livreur', 'Rami', 'Salma', '0688899091', 'https://i.pravatar.cc/150?img=9', 1, nowSql, nowSql, nowSql],
      [10, 'mehdi.bounajma@example.com', 'hash_mehdi', 'client', 'Bounajma', 'Mehdi', '0699909192', 'https://i.pravatar.cc/150?img=10', 1, nowSql, nowSql, nowSql],
    ];

    await conn.query(
      'INSERT INTO users (id, email, password_hash, role, nom, prenom, telephone, photo, is_active, created_at, createdAt, updatedAt) VALUES ?',
      [users]
    );

    const livreurs = [
      [1, 4, 'moto', 'disponible', 12, nowSql, nowSql],
      [2, 5, 'voiture', 'occupe', 8, nowSql, nowSql],
      [3, 6, 'velo', 'disponible', 4, nowSql, nowSql],
      [4, 7, 'moto', 'disponible', 15, nowSql, nowSql],
      [5, 8, 'voiture', 'inactif', 2, nowSql, nowSql],
      [6, 9, 'moto', 'disponible', 19, nowSql, nowSql],
      [7, 10, 'velo', 'occupe', 6, nowSql, nowSql],
      [8, 1, 'moto', 'disponible', 11, nowSql, nowSql],
      [9, 2, 'voiture', 'disponible', 7, nowSql, nowSql],
      [10, 3, 'velo', 'occupe', 5, nowSql, nowSql],
    ];

    await conn.query(
      'INSERT INTO livreurs (id, user_id, type_vehicule, statut, total_livraison, createdAt, updatedAt) VALUES ?',
      [livreurs]
    );

    const commandes = [
      [1, 'restaurant', 'Le Petit Bistro', '0600000001', 'Rue de la Paix, Casablanca', 'Amina Benali', '0601010101', 'Avenue Hassan II, Casablanca', 4.5, 'Sonner à l’interphone', 27.5, 'cash', 'en_attente', nowSql, null, null, null, nowSql, nowSql],
      [2, 'pharmacie', 'Pharmacie des Fleurs', '0600000002', 'Bd Mohammed V, Rabat', 'Youssef Martin', '0611121314', 'Rue d’Azilal, Rabat', 6.2, 'Livrer avant 18h', 35.0, 'carte', 'assignee', nowSql, null, null, null, nowSql, nowSql],
      [3, 'colis', 'Express Box', '0600000003', 'Place de l’Indépendance, Tanger', 'Sarah Ouaaz', '0622232425', 'Rue de la Kasbah, Tanger', 8.0, 'À laisser chez le gardien', 42.0, 'cash', 'en_retrait', nowSql, null, null, null, nowSql, nowSql],
      [4, 'courses', 'Supermarché Atlas', '0600000004', 'Av. Ibn Sina, Fès', 'Mehdi Bounajma', '0699909192', 'Rue Al Qods, Fès', 3.8, 'Pas de sucre', 24.5, 'carte', 'recuperee', nowSql, null, null, null, nowSql, nowSql],
      [5, 'restaurant', 'Pizza House', '0600000005', 'Rue de la Liberté, Marrakech', 'Hassan Karimi', '0633343536', 'Av. Yacoub El Mansour, Marrakech', 5.6, 'Déposer au portail', 30.0, 'cash', 'livree', nowSql, null, null, null, nowSql, nowSql],
      [6, 'pharmacie', 'Pharma Plus', '0600000006', 'Rue Moulay Ismail, Meknès', 'Maria Bernard', '0644454647', 'Bd Hassan II, Meknès', 7.1, 'Appeler avant de monter', 38.5, 'carte', 'annulee', nowSql, null, null, null, nowSql, nowSql],
      [7, 'colis', 'Colis Direct', '0600000007', 'Avenue Al Wahda, Oujda', 'Karim Essafi', '0655565758', 'Rue des Orangers, Oujda', 9.4, 'À remettre au voisin', 50.0, 'cash', 'en_attente', nowSql, null, null, null, nowSql, nowSql],
      [8, 'courses', 'Market 24', '0600000008', 'Rue du Commerce, Agadir', 'Nadia Lahlou', '0666676869', 'Avenue du 20 Août, Agadir', 2.9, 'Livraison discrète', 19.5, 'carte', 'assignee', nowSql, null, null, null, nowSql, nowSql],
      [9, 'restaurant', 'Mamma Pizza', '0600000009', 'Place du 16 Novembre, Kenitra', 'Zakaria Elmouden', '0677787980', 'Rue de la Kasbah, Kenitra', 4.0, 'Ne pas sonner après 21h', 23.0, 'cash', 'recuperee', nowSql, null, null, null, nowSql, nowSql],
      [10, 'pharmacie', 'Santé Express', '0600000010', 'Rue de l’Atlas, El Jadida', 'Salma Rami', '0688899091', 'Bd Zerktouni, El Jadida', 5.1, 'Conserver au frais', 28.0, 'carte', 'livree', nowSql, null, null, null, nowSql, nowSql],
    ];

    await conn.query(
      'INSERT INTO commandes (id, type_commmande, nom_retrait, telephone_retrait, adress_retirait, nom_livraison, telephone_livraison, adress_livraison, distanceKM, instructionSpecial, prixLivraison, mode_paiement, Statut, created_at, assigned_at, picked_up, delivered_at, createdAt, updatedAt) VALUES ?',
      [commandes]
    );

    const historiques = [
      [1, 'en_attente', 'assignee', nowSql, 1, 4, nowSql, nowSql],
      [2, 'assignee', 'en_retrait', nowSql, 2, 5, nowSql, nowSql],
      [3, 'en_retrait', 'recuperee', nowSql, 3, 6, nowSql, nowSql],
      [4, 'recuperee', 'livree', nowSql, 4, 7, nowSql, nowSql],
      [5, 'en_attente', 'annulee', nowSql, 5, 8, nowSql, nowSql],
      [6, 'assignee', 'en_attente', nowSql, 6, 9, nowSql, nowSql],
      [7, 'en_attente', 'assignee', nowSql, 7, 10, nowSql, nowSql],
      [8, 'assignee', 'recuperee', nowSql, 8, 1, nowSql, nowSql],
      [9, 'recuperee', 'livree', nowSql, 9, 2, nowSql, nowSql],
      [10, 'en_attente', 'livree', nowSql, 10, 3, nowSql, nowSql],
    ];

    await conn.query(
      'INSERT INTO statuthistoriques (id, ancien_statut, nouveau_statut, changed_at, commande_id, changed_by, createdAt, updatedAt) VALUES ?',
      [historiques]
    );

    const settings = [
      [1, 'prix_base', '15', 'Prix de base de livraison en MAD', nowSql, nowSql],
      [2, 'tarif_km', '3.5', 'Tarif par kilomètre en MAD', nowSql, nowSql],
      [3, 'delai_max', '45', 'Délai maximum de livraison en minutes', nowSql, nowSql],
      [4, 'frais_service', '2', 'Frais de service applicables', nowSql, nowSql],
      [5, 'remise_client', '5', 'Remise promotionnelle par défaut', nowSql, nowSql],
      [6, 'heure_debut', '08:00', 'Heure de début de service', nowSql, nowSql],
      [7, 'heure_fin', '22:00', 'Heure de fin de service', nowSql, nowSql],
      [8, 'zone_couverte', 'Casablanca,Rabat,Tanger', 'Villes couvertes', nowSql, nowSql],
      [9, 'paiement_cash', 'true', 'Paiement en espèces autorisé', nowSql, nowSql],
      [10, 'paiement_carte', 'true', 'Paiement par carte autorisé', nowSql, nowSql],
    ];

    await conn.query(
      'INSERT INTO settings (id, cle, valeur, description, createdAt, updatedAt) VALUES ?',
      [settings]
    );

    await conn.query('SET FOREIGN_KEY_CHECKS = 1');
    console.log('Seed fake data OK: 10 users, 10 livreurs, 10 commandes, 10 historiques, 10 settings.');
  } catch (error) {
    await conn.query('SET FOREIGN_KEY_CHECKS = 1');
    console.error('Erreur seed fake data:', error);
    process.exit(1);
  } finally {
    await conn.end();
  }
}

seed();
