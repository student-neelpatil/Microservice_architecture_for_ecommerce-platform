import jwt from "jsonwebtoken";


export const authMiddleware = (req, res, next) => {

     const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {

        return res.status(401).json({
            success: false,
            message: "Unauthorized",
        });
    }

     const token =authHeader.split(" ")[1];


     //verifying the token

    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        //attach user info to request object

        req.user = decoded;
        next();

    } catch (error) {

        return res.status(401).json({
            success: false,
            message: "Invalid token",
        });
    }


}