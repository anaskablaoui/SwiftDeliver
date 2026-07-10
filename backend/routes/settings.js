const express  = require('express')
const router = express.Router()

router.get('/settigns',(req,res)=>{
    res.send('settings list')
})

router.put('/settings/{cle}',(req,res)=>{
    res.send('settigns edditing')
})


module.exports = router