const express  = require('express')
const router = express.Router()
const { validationToken } = require('../middleware/authMiddleware')

router.get('/', validationToken, (req,res)=>{
    res.send('settings list')
})

router.put('/:cle', validationToken, (req,res)=>{
    res.send('settigns edditing')
})


module.exports = router