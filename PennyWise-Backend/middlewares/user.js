const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/config");

const userMiddleWare = (req, res, next) => {
    try {
        const token = req.headers.token;
        
        if (!token) {
            return res.status(401).json({
                message: "Authentication token is required"
            });
        }

        const decoded = jwt.verify(token, JWT_SECRET);
        
        if (!decoded || !decoded.userId) {
            return res.status(401).json({
                message: "Invalid authentication token"
            });
        }

        req.userId = decoded.userId;
        next();
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({
                message: "Token has expired. Please login again"
            });
        }
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({
                message: "Invalid token. Please login again"
            });
        }
        console.error('Auth middleware error:', error);
        res.status(500).json({
            message: "Authentication error"
        });
    }
};

module.exports = {
    userMiddleWare
}
