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


/*
===================================
ROLE AUTHORIZATION MIDDLEWARE
===================================
*/

export const authorize =(...allowedRoles) => {

  return (req, res, next) => {

    /*
    ============================
    CHECK AUTHENTICATED USER
    ============================
    */

    if (!req.user) {

      return res.status(401).json({
        success: false,
        message:
          "Unauthorized access",

      });

    }

    /*
    ============================
    CHECK USER ROLE
    ============================
    */

    const userRole =req.user.role;

    const isAuthorized =
      allowedRoles.includes(
        userRole
      );

    if (!isAuthorized) {

      return res.status(403).json({
      success: false,
      message:
          "You do not have permission to access this resource",

      });

    }

    /*
    ============================
    CONTINUE REQUEST
    ============================
    */

    next();

  };

};