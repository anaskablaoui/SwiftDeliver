module.exports = (sequelize,DataTypes)=>{
    const codePostal = sequelize.define("codePostal",{
        code:{
            type:DataTypes.INTEGER,
            primaryKey:true
        },
        nom:{
            type:DataTypes.STRING(20),
            allowNull:false
        }
    })

    return codePostal;
}