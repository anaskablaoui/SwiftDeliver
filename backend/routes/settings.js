const express  = require('express')
const router = express.Router()

router.get('/',(req,res)=>{
    res.send('settings list')
})

router.put('/:cle',(req,res)=>{
    res.send('settigns edditing')
})


module.exports = router