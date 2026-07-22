const {reverseGeocoding} = require("../services/localisationService");


const getAddress = async(req,res)=>{

    const {latitude, longitude} = req.body;


    if(!latitude || !longitude){
        return res.status(400).json({
            message:"Coordinates are required"
        });
    }


    const address = await reverseGeocoding(
        latitude,
        longitude
    );


    if(!address){
        return res.status(500).json({
            message:"Unable to get address"
        });
    }


    res.json(address);

};


module.exports = {
    getAddress
};