const express = require('express')
const router = express.Router()
const { validationToken } = require('../middleware/authMiddleware')

router.get('/dashboard', validationToken, (req,res)=>{
    res.send('this is statistics ' )
})

router.get('/commandes-par-jour', validationToken, (req,res)=>{
    res.send('graph de 7 dernier jour')
})

router.get('/commandes-par-statut', validationToken, (req,res)=>{
    res.send('repartition par statut')
})

router.get('/commandes-par-type', validationToken, (req,res)=>{
    res.send('repartition par type')
})


module.exports = router