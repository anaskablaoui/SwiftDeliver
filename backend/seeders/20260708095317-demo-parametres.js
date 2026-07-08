'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('settings', [
      {
        cle: 'prix_base',
        valeur: '15',
        description: 'Prix de base en MAD',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        cle: 'tarif_km',
        valeur: '3',
        description: 'Tarif par kilometrage en MAD',
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('settings',null,{});
  },
};
