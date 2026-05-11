


const errorMiddleware =
(error, req, res, next) => {

  /*
  ============================
  DEFAULT STATUS CODE
  ============================
  */

  const statusCode =
    res.statusCode === 200
      ? 500
      : res.statusCode;

  /*
  ============================
  ERROR RESPONSE
  ============================
  */

  res.status(statusCode).json({

    success: false,

    message: error.message,

    /*
    ==========================
    STACK TRACE
    ==========================
    */

    stack:
      process.env.NODE_ENV
      === "production"

        ? null

        : error.stack,

  });

};

export default errorMiddleware;