import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/env.js';
import User from '../model/user.model.js';

const authorize = async(req, res, next) =>  {
    try {
        let token;

        // Checks if an authorization header starts with Bearer
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1]; // Gets the token if available
        }

        if (!token) res.status(401).json({ message: "UNAUTHORIZED" });

        const decoded = jwt.verify(token, JWT_SECRET);

        const user = await User.findById(decoded.userId);
        if (!user) res.status(401).json({ message: "UNAUTHORIZED" });
        
        req.user = user;

        next()
    } catch (err) {
        res.sendStatus(401).json({
            message: "UNAUTHORIZED",
            error: err.message
        })
    }
}

export default authorize;