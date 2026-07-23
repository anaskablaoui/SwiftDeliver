module.exports = (sequelize,DataType) => {
    const refreshToken = sequelize.define('refreshToken',{
        id:{
            type:DataType.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },
        expiredAt:{
            type:DataType.DATE,
            allowNull:false
        },
        
        token:{
            type:DataType.STRING,
            allowNull:false
        },
        last_usedAt:{
            type:DataType.DATE,
            allowNull:false
        },
        device:{
            type:DataType.STRING,
            allowNull:false
        },
        browser:{
            type:DataType.STRING,
            allowNull:false
        },
        ip_adress:{
            type:DataType.STRING,
            allowNull:false
        },
        is_revoked:{
            type:DataType.BOOLEAN,
            allowNull:false,
        },
        
    })
    refreshToken.associate =(models)=>{
        refreshToken.belongsTo(models.User,{
            foreignKey: {
            name: 'user_id',
            allowNull: false,
        },
        as: 'user',
        })
    };

    return refreshToken;
}