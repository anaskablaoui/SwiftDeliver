const { verify } = require("jsonwebtoken");

const validationToken = (req, res, next) => {
    const accessToken = req.header("accessToken");
    console.log(" ========THIS IS TESTING ========")
    console.log(accessToken)

    if (!accessToken) {
        return res.status(401).json({
            error: "User not logged in"
        });
    }

    try {
        const validToken = verify(accessToken, "important");
        console.log("Token:", accessToken);
        req.user = validToken;
        console.log('next executed')
        next();
    } catch (err) {
        return res.status(401).json({
            error: "Invalid Token"
        });
    }
};

module.exports = { validationToken };