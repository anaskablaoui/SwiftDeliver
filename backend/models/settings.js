module.exports = (sequelize, DataType) => {
    const settings = sequelize.define('settings', {
        id: {
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        tarifKm:{
            type:DataType.DECIMAL(6,2),
            allowNull:false
        },
        prixbase:{
            type:DataType.DECIMAL(6,2),
            allowNull:false
        },
        fraisLivreur:{
            type:DataType.DECIMAL(2,2),
            allowNull:false,
            validate:{
                max:1,
                min:0
            }
        }
    }, {
        timestamps: false
    });

    return settings;
};