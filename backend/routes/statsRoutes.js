const express = require('express')
const router = express.Router()

router.get('stats/dashboard',(req,res)=>{
    res.send('this is statistics ' )
})

router.get('stats/commandes-par-jour',(req,res)=>{
    res.send('graph de 7 dernier jour')
})

router.get('stats/commandes-par-statut',(req,res)=>{
    res.send('repartition par statut')
})

router.get('stats/commandes-par-type',(req,res)=>{
    res.send('repartition par type')
})


module.exports = router