const { verify,sign } = require("jsonwebtoken");
const db = require('../models')

const refreshTokenverification = async (req,res,next)=>{
    const refreshToken = req.header("refreshToken");

    console.log(" ========THIS IS TESTING ========")
    console.log(refreshToken)

    if (!refreshToken) {
        return res.status(401).json({
            error: "User not logged in"
        });
    }
    else{
        try{const decoded =verify(refreshToken,process.env.JWT_REFRESH_SECRET);
            console.log("Decoded:", decoded);
        const session = await db.refreshToken.findOne({
            where:{
                token:refreshToken
            }
        });

        if(!session || session.is_revoked || session.expiredAt.getTime() < Date.now()){
            return res.status(401).json({
                message:"invalid session"
            })
        }

        const user = await db.User.findByPk(decoded.id);

        if(!user){
            return res.status(401).json({
                message:"user not found"
            });
        }

        const newAccessToken = sign({
            id:user.id,
            role:user.role
        },
    process.env.JWT_ACCESS_SECRET,{
        expiresIn:"15s"
    });

    req.newAccessToken = newAccessToken;
    req.user = {
        id:user.id,
        role:user.role
    };

    next();

    }catch(error){
        console.log(error)
        res.status(401).json({
            message:"can't acces to the user"
        })
    }}
}

module.exports = { refreshTokenverification };