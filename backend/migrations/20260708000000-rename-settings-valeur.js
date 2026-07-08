'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const tableInfo = await queryInterface.describeTable('settings');

    if (tableInfo.valeur) {
      return;
    }

    if (tableInfo.valuer) {
      await queryInterface.renameColumn('settings', 'valuer', 'valeur');
    }
  },

  async down(queryInterface, Sequelize) {
    const tableInfo = await queryInterface.describeTable('settings');

    if (tableInfo.valuer) {
      return;
    }

    if (tableInfo.valeur) {
      await queryInterface.renameColumn('settings', 'valeur', 'valuer');
    }
  }
};
