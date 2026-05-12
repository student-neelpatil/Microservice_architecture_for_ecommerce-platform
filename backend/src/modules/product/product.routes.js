import express from "express";

const router=express.Router();

import { createproduct } from "./product.controller.js"
import { authMiddleware } from "../auth/auth.middleware.js";
import { authorize } from "../auth/auth.middleware.js";
import { getProducts } from "./product.controller.js";
import { getProductById } from "./product.controller.js";

router.post("/createproduct", authMiddleware, authorize("ADMIN"), createproduct);
router.get("/test", (req, res) => {

  res.send("working");

});
router.get("/",getProducts);
router.get("/:id",getProductById);

export default router;