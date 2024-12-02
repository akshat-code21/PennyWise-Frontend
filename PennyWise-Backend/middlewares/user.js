const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/config");
const userMiddleWare = (req, res, next) => {
    const token = req.headers.token;
    const decoded = jwt.verify(token,JWT_SECRET)
    if(decoded)
    {
        req.userId = decoded.userId;
        next();
    }
    else{
        res.status(403).json({
            message : "you are not signed in"
        })
    }
};
module.exports = {
    userMiddleWare
}
