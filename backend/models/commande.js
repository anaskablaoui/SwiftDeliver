module.exports = (sequelize,DataType) => {
    const commande =  sequelize.define("commande",{
        id:{
            type:DataType.INTEGER,
            autoIncrement:true,
            primaryKey:true,
        },
        
        type_commmande:{
            type:DataType.ENUM( 'restaurant', 'pharmacie', 'colis', 'courses'),
        },
        //pointRetrait
        nom_retrait:{
                type:DataType.STRING(100),
                allowNull:false
            },
        telephone_retrait:{
                type:DataType.STRING(20),
                allowNull:false
            },
        adress_retirait:{
               type: DataType.TEXT,
               allowNull:false
            }
        ,
        //pointLivraison
        nom_livraison:{
                type:DataType.STRING(100),
                allowNull:false
            },
        telephone_livraison:{
                type:DataType.STRING(20),
                allowNull:false
            },
        adress_livraison:{
                type:DataType.TEXT,
                allowNull:false
            }
        ,
        //details
        distanceKM:{
                type:DataType.DECIMAL(5,2),
                allowNull:false
            },
        instructionSpecial:{
                type:DataType.TEXT,
                allowNull:false
            }
        ,
        //tarification
        prixLivraison:{
                type:DataType.DECIMAL(8,2),
                allowNull:false
            },
        mode_paiement:{
                type:DataType.ENUM('cash', 'carte'),
                defaultValue:'cash'
            }
        ,
        Statut:{
            type:DataType.ENUM('en_attente', 'assignee', 'en_retrait', 'recuperee', 'livree', 'annulee'),
            defaultValue:'en_attente'
        },
        //Dates
        created_at:{
                type:DataType.DATE,
                defaultValue:DataType.NOW
            },
        assigned_at:{
                type:DataType.DATE,
                allowNull:true,
            },
        picked_up:{
                type:DataType.DATE,
                allowNull:true,
            },
        delivered_at:{
                type:DataType.DATE,
                allowNull:true,
            }

    })

    commande.associate = (models) => {
    // Relation client (toujours présente, obligatoire)
    commande.belongsTo(models.User, {
        foreignKey: {
            name: 'client_id',
            allowNull: false,
        },
        as: 'client',
    });

    // Relation livreur (optionnelle au départ, assignée plus tard)
    commande.belongsTo(models.Livreur, {
        foreignKey: {
            name: 'livreur_id',
            allowNull: true,
        },
        as: 'livreur',
    });
};


    return commande;
}