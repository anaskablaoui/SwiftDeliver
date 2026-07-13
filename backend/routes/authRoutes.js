const express = require('express')
const router = express.Router()
const db = require('../models')

router.post('/login',(req,res)=>{
    res.send('this is the connexion page')
})

router.post('/logout',(req,res)=> {
    res.send('this is the logout page')
})

router.post('/register',(req,res) => {
    res.send('this is the register page ')
})

router.get('/me',(req,res)=> {
    res.send('this is the about me page')
})




module.exports = router