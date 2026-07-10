const express = require('express')
const router = express.Router()

router.post('/auth/login',(req,res)=>{
    res.send('this is the connexion page')
})

router.post('/auth/logout',(req,res)=> {
    res.send('this is the logout page')
})

router.post('/auth/register',(req,res) => {
    res.send('this is the register page ')
})

router.get('/auth/me',(req,res)=> {
    res.send('this is the about me page')
})




module.exports = router