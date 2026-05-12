import express from "express";

const router=express.Router();

import { createproduct } from "./product.controller.js"
import { authMiddleware } from "../auth/auth.middleware.js";
import { authorize } from "../auth/auth.middleware.js";

router.post("/createproduct", authMiddleware, authorize("ADMIN"), createproduct);
router.get("/test", (req, res) => {

  res.send("working");

});

export default router;