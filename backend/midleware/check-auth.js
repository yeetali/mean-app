const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, 'b694df5ce7882eafd48bed514848802a355cd1fcbee0484212a496ba82a1d5db');
        req.userData = {email: decodedToken.email, userId: decodedToken.userId};
        next();
    } catch (error) {
        res.status(401).json({
            message: `You are not authenticated!`,
        });
    }
};