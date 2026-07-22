module.exports = (sequelize,DataTypes)=>
{
    const User = sequelize.define("User",{
        id:{
            type:DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        email:{
            type:DataTypes.STRING,
            unique: 'users_email_unique',
            allowNull: false
        },
        password_hash:{
            type:DataTypes.STRING,
            allowNull:false
        },
        role:{
            type:DataTypes.ENUM('client', 'livreur', 'admin'),
            defaultValue:'client'
        },
        nom:{
            type:DataTypes.STRING,
            allowNull:false
        },
        prenom:{
            type:DataTypes.STRING,
            allowNull:false
        },
        telephone:{
            type:DataTypes.STRING,
            allowNull:false
        },
        photo:{
            type:DataTypes.STRING,
            allowNull:true
        },
        is_active:{
            type:DataTypes.BOOLEAN,
            defaultValue:true
        },
        created_at:{
            type:DataTypes.DATE,
            defaultValue:DataTypes.NOW
        }
    })

    return User
}