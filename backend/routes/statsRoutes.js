const express = require('express')
const router = express.Router()

router.get('/dashboard',(req,res)=>{
    res.send('this is statistics ' )
})

router.get('/commandes-par-jour',(req,res)=>{
    res.send('graph de 7 dernier jour')
})

router.get('/commandes-par-statut',(req,res)=>{
    res.send('repartition par statut')
})

router.get('/commandes-par-type',(req,res)=>{
    res.send('repartition par type')
})


module.exports = router