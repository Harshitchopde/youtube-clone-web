import jwt from "jsonwebtoken";
import { createError } from "./error.js";

// verifyToken is the middleware which check weather user is authinticated or not
export const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token;
    console.log("verify run ")
try {
    
    if (!token) return next(createError(401, "you are not authenticated"))
    jwt.verify(token, process.env.JWT, (err, user) => {
        if (err) return next(createError(403, "Token is not Vaild"))
        req.user = user // i don under stand this line why used
        console.log("verifyed");
        next()

    });

    
} catch (error) {
    console.log(error)
    next(error)
}
};