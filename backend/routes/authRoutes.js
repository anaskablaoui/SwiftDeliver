const express = require('express')
const router = express.Router()
const db = require('../models')
const bcrypt = require('bcrypt')
const User = require('../models/User')
const { where } = require('sequelize')

const { sign } = require('jsonwebtoken')
const { validationToken } = require('../middleware/authMiddleware')

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
    bcrypt.compare(password,user.password_hash).then((match)=>{
        if(!match)
        {
            return res.status(401).json({
                message:"mot de passe incorrecte"
            })
        }
        else{
            const accessToken = sign({email: user.email,id:user.id,role:user.role}, "important" )
            console.log('u logged in ')
            res.json({
                token: accessToken,
                user:{
                    email:user.email,
                    role:user.role,
                    id:user.id
                }
            })
        }

    })

})

router.post('/logout', validationToken, (req,res)=> {
    res.send('this is the logout page')
})

router.post('/register',(req,res) => {
    const {nom,prenom,email,telephone,password,passwordConfirm} = req.body
   
    if(password === passwordConfirm)
    {
        bcrypt.hash(password,10).then((hash)=>{
            db.User.create({
                nom:nom,
                prenom:prenom,
                email:email,
                telephone:telephone,
                password_hash:hash
            })
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




module.exports = router