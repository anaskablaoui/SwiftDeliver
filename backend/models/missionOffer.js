module.exports = (sequelize,DataTypes) =>{
    const missionOffer = sequelize.define("mission",{
        id:{
            type:DataTypes.INTEGER,
            autoIncrement:true,
            primaryKey:true,
        },
        
    })

    missionOffer.associate = (models)=>{
        missionOffer.belongsTo(models.commande,{
            foreignKey:{
                name:'commande_id',
                allowNull:false,
            },
            as:'commande',
        });

        missionOffer.belongsTo(models.Livreur,{
            foreignKey:{
                name:'livreur_id',
                allowNull:false,
            },
            as:'livreur',
        });
    };

    return missionOffer;
}
