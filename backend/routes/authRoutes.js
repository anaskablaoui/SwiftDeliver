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
            const accessToken = sign({email: user.email,id:user.id}, "important" )
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

router.get('/me', validationToken, (req,res)=> {
    res.send('this is the about me page')
})




module.exports = router