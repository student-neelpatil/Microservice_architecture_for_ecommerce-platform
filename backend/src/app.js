import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";
//auth routes
import authRoutes from "./modules/auth/auth.routes.js";
import errorMiddleware from "./middlewares/error.middleware.js";

//product routes
import productRoutes from "./modules/product/product.routes.js"

//categories routes
import categoryRoutes from "./modules/category/category.routes.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/categories",categoryRoutes);

app.get("/", (req, res) => {
    res.json({
        message: "API Running",
    });
});

app.use(errorMiddleware);


export default app;