const express = require("express");

const router = express.Router();

const {getAddress} = require("../controllers/locationController");
const { validationToken } = require('../middleware/authMiddleware')


router.post("/reverse",validationToken ,getAddress);


module.exports = router;