const express = require('express')
const router = express.Router()
const db = require('../models')
const bcrypt = require('bcrypt')
const User = require('../models/User')
const { where } = require('sequelize')
const UAParser = require("ua-parser-js");

const { sign } = require('jsonwebtoken')
const { validationToken } = require('../middleware/authMiddleware')
const {refreshTokenverification} = require('../middleware/refreshTokenMiddleware')

router.post('/login',async (req,res)=>{
    const {email,password} = req.body

    const  user = await db.User.findOne({
        where:{
            email:email
        }
    });
    if (!user){
        return  res.status(401).json({
            message:"utilisateur inconnue"
        })
    }
    bcrypt.compare(password,user.password_hash).then(async (match)=>{
        if(!match)
        {
            return res.status(401).json({
                message:"mot de passe incorrecte"
            })
        }
        else{
            const accessToken = sign({id:user.id,role:user.role}, process.env.JWT_ACCESS_SECRET,
                {
                    expiresIn: "15m"
                }
            );
            // working on jwt v2
            const refreshToken = sign({
                id:user.id
            },
            process.env.JWT_REFRESH_SECRET,
            {
                expiresIn:"30d"
            }
        )
            const parser = new UAParser(req.headers["user-agent"]);
            const browser = parser.getBrowser().name || "Unknown";
            const device = parser.getDevice().type || "Desktop";

            const ipAddress =req.headers["x-forwarded-for"] || req.socket.remoteAddress;

             await db.refreshToken.create({
                user_id:user.id,
                token:refreshToken,
                expiredAt: new Date(
                    Date.now() + 30*24*60*60*1000
                ),
                last_usedAt: new Date(),
                browser:browser,
                device:device,
                ip_adress:ipAddress,
                is_revoked:false,
            });
            console.log('u logged in ')
            res.json({
                accessToken,
                refreshToken,
                user:{

                    role:user.role,
                    id:user.id
                }
            })
        }

    }).catch((error)=>{
        console.log(error)
        res.status(500).json({
            message:"erreur lors de la connexion"
        })
    })

})

router.post('/logout', async (req,res)=> {
    const refreshToken = req.header("refreshToken");

    if(!refreshToken){
        return res.status(400).json({
            message:"refresh token missing"
        })
    }

    try{
        const parser = new UAParser(req.headers["user-agent"]);
        const [affectedCount] = await db.refreshToken.update(
            {
                is_revoked:true,
            },
            {
                where:{
                    token:refreshToken,
                    device:parser.getDevice().type || "Desktop",
                    user_id:req.user.id
                }
            }
        )
        if(affectedCount>0){
            console.log("logout with success")
            return res.json({
                message:"succeded"
            })
        }
        else{
            return res.status(404).json({
                message:"page not found"
            })
        }
    }catch(error){
        console.log(error)
        return res.status(500).json({
            message:"erreur lors de la deconnexion"
        })
    }
})

router.post('/register',async (req,res) => {
    const {nom,prenom,email,telephone,password,passwordConfirm} = req.body

    if(password !== passwordConfirm)
    {
        return res.status(400).json({
            message:"les mots de passe ne correspondent pas"
        })
    }

    try{
        const existingUser = await db.User.findOne({where:{email:email}})
        if(existingUser){
            return res.status(409).json({
                message:"un utilisateur avec cet email existe deja"
            })
        }

        const hash = await bcrypt.hash(password,10)
        const user = await db.User.create({
            nom:nom,
            prenom:prenom,
            email:email,
            telephone:telephone,
            password_hash:hash
        })

        res.status(201).json({
            message:"utilisateur cree avec succes",
            user:{
                id:user.id,
                role:user.role
            }
        })
    } catch(error){
        console.log(error)
        res.status(500).json({
            message:"erreur lors de l'inscription"
        })
    }
})

router.get('/me', validationToken, async (req,res)=> {
    try{
        const me =  await db.User.findOne({
            where:{
                id:req.user.id
            }
        })
        res.json(me)
        console.log(me)
        console.log("== Information de utilisateur connecte passe ===")
    }
    catch (error){
        console.log(error)
        res.status(500).json({error:'erreur lors de la reco=uperation de donne'})
    }
})

router.put('/me',validationToken, async (req,res)=>{
    try{
        const [updateMe] = await db.User.update(
            {telephone:req.body.telephone, email:req.body.email,photo:req.body.photo},
            {
                where:{
                    id:req.user.id
                }
            }
        );
        if(updateMe>0){
           console.log("modified successfully")
            res.status(200).json({
            message:"User updated successfully"
    })}else{
            res.status(404).json({
            message:"user not found"
        })
    }
    }catch(error){
        console.log("erreur de modification")
        res.status(500).json({
            erreur:"erreur de modification de contenu "
        })
    }
})

router.put('/password',validationToken, async (req,res)=>{
    const currentUser = await db.User.findOne({
        where:{
            id:req.user.id
        }
    });

    if(!currentUser){
        return res.status(404).json({
            message:"user not found"
        })
    }
    console.log("debuggin mofying password")
    console.log(req.body.oldPassword)
    console.log(currentUser.password_hash)
    console.log(req.body.newPassword)
    console.log(req.body.confirmPassword)

    const test = await bcrypt.compare(req.body.oldPassword,currentUser.password_hash)

    if(req.body.newPassword == req.body.confirmPassword && test ){

        const password=await bcrypt.hash(req.body.newPassword,10);

        try{
            const [updatePassword]  = await db.User.update(
                {password_hash:password},
                {
                    where:
                    {
                        id:req.user.id
                    }
                });
            if(updatePassword>0){
                console.log("modified successfully")
                res.status(200).json({
                    message:"mots de pass modifier avec succes "
                })
            }
            else{
                res.status(404).json({
                    message:"user not found"
                })
            }
        }
        catch(error){
            console.log("erreur de modification de mots de pass ")
            res.status(400).json({
                erreur:"erreur de modification de mot de passe "
            })
        }
    }
    else{
        res.status(500).json({
            message:"erreur donne passe non valid"
        })
    }


})

router.post("/refresh", (req, res, next) => {
    console.log("===== REFRESH ROUTE =====");
    next();
}, refreshTokenverification, (req, res) => {
    res.json({
        accessToken: req.newAccessToken,
        user: req.user
    });
});


module.exports = router