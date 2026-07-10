const express = require('express')
const router = express.Router()

//all of this is admin needs 

router.get('/livreurs',(req,res)=>{
    res.send('this is deliverymans list')
})

router.get('/livreur/{id}',(req,res)=>{
    res.send('this delivery man details')
})

router.post('/livreur',(req,res)=> {
    res.send('this is delivery man creation ')
})

router.put('/livreur/{id}',(req,res)=>{
    res.send('this is delivery man modification')
})

router.delete('/livreur/{id}',(req,res)=> {
    res.send('this is delivery man deleting')
})



module.exports =  router