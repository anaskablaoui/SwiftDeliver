const express = require('express')

const router =express.Router()

router.get('/commandes',(req,res)=>{
    res.send('this is commande list ')
})

router.get(`/commandes/{id}`,(req,res)=>{
    res.send('this is commande details')
})

router.post('/commandes',(req,res)=>{
    res.send('this is the commande creation')
})

router.put(`commandes/{id}`,(req,res)=>{
    res.send('this is commande modification')
})

router.delete(`commandes/{id}`,(req,res)=>{
    res.send('this is commande deleting')
})

router.patch(`commandes/{id}/statut`,(req,res)=>{
    res.send('this is command statut ')
})

router.patch(`commandes/{id}/assigner`,(req,res)=>{
    res.send('this is assignement commande to the delivery man')
})


module.exports = router