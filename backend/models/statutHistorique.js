module.exports = (sequelize,DataTypes)=> 
{
    const statuthistorique = sequelize.define("statutHistorique",{
        id:{
            type:DataTypes.INTEGER,
            autoincrement:true,
            primaryKey:true
        },
        ancien_statut:{
            type:DataTypes.STRING(20),
            allowNull:true
        },
        nouveau_statut:{
            type:DataTypes.STRING(20),
            allowNull:false
        },
        changed_at:{
            type:DataTypes.DATE,
            defaultValue:DataTypes.NOW
        }
    });

    statuthistorique.associate = (models)=>{
        statuthistorique.belongsTo(models.commande,{
            foreignKey:'commande_id',
            allowNull:false
        })
        statuthistorique.belongsTo(models.User,{
            foreignKey:'changed_by',
            allowNull:false
        })
    }
    return statuthistorique;
}