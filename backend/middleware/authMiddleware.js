const { verify } = require("jsonwebtoken");

const validationToken = (req, res, next) => {
    const accessToken = req.header("accesstoken");

    if (!accessToken) {
        return res.status(401).json({
            error: "User not logged in"
        });
    }

    try {
        const validToken = verify(accessToken, "important");

        req.user = validToken;

        next();
    } catch (err) {
        return res.status(401).json({
            error: "Invalid Token"
        });
    }
};

module.exports = { validationToken };