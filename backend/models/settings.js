module.exports = (sequelize, DataType) => {
    const settings = sequelize.define('settings', {
        id: {
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        cle: {
            type: DataType.STRING(50),
            unique: true,
            allowNull: false
        },
        valeur: {
            type: DataType.STRING(255),
            allowNull: false
        },
        description: {
            type: DataType.TEXT,
            allowNull: false
        }
    });

    return settings;
};