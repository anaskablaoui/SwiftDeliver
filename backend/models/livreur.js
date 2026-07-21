module.exports = (sequelize,DataTypes)=>
{
    const Livreur = sequelize.define("Livreur",{
        id:{
            type:DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        type_vehicule:{
            type:DataTypes.ENUM('moto', 'voiture', 'velo'),
            defaultValue:'moto'
        },
        statut:{
            type:DataTypes.ENUM('disponible', 'occupe', 'inactif'),
            defaultValue:'disponible'
        },
        total_livraison:{
            type:DataTypes.INTEGER,
            defaultValue:0
        }
    });
    Livreur.associate = (models)=>{
        Livreur.belongsTo(models.User,{
            foreignKey:'user_id',
            allowNull:false
        });
        Livreur.belongsTo(models.codePostal,{
            foreignKey:{
                name:'geoOcpation',
                allowNull:false,
            },
            as : 'codePostal'
        })
    }

    

    return Livreur;
}