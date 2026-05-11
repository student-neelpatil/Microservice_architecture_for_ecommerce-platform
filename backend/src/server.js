import app from "./app.js"
import dotenv from "dotenv";
import sequelize from "./config/db.js";
dotenv.config();

const PORT = process.env.PORT;

sequelize.authenticate().then(async () => {
   console.log("Database Connected");

  await sequelize.sync();

  console.log("Database Synced");


  app.listen(PORT, () => {

    console.log(
      `Server running on port ${PORT}`
    );

  });

})