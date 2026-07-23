const axios = require("axios");


const reverseGeocoding = async(latitude, longitude)=>{

    try{

        const response = await axios.get(
            "https://nominatim.openstreetmap.org/reverse",
            {
                params:{
                    lat: latitude,
                    lon: longitude,
                    format:"json"
                },
                headers:{
                    "User-Agent":"SwiftDelivery-App"
                }
            }
        );


        return response.data;

    }catch(error){

        console.log("Nominatim error:", error.message);
        return null;

    }

};

const forwardGeocoding = async (address) => {
    try {

        const response = await axios.get(
            "https://nominatim.openstreetmap.org/search",
            {
                params: {
                    q: address,
                    format: "json",
                    limit: 1
                },
                headers: {
                    "User-Agent": "SwiftDelivery-App"
                }
            }
        );

        return response.data;

    } catch (error) {

        console.log("Nominatim error:", error.message);
        return null;

    }
}

module.exports = {
    reverseGeocoding,
    forwardGeocoding
};