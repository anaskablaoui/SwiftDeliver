const express = require('express')
const router = express.Router()


//this is admin's needs 

router.get('/clients',(req,res)=>{
    res.send('this is clients list ')
})
router.get('/clients/{id}',(req,res)=>{
    res.send('this is client details')
})  

module.exports = router