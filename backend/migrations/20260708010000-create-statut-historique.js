'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('statutHistoriques', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      ancien_statut: {
        type: Sequelize.STRING(20),
        allowNull: true,
      },
      nouveau_statut: {
        type: Sequelize.STRING(20),
        allowNull: false,
      },
      changed_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      commande_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      changed_by: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('statutHistoriques');
  },
};
