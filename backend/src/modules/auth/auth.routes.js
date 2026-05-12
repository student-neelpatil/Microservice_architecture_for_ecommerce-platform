import express from "express";

import {register} from "./auth.controller.js";
import { login } from "./auth.controller.js";
import { authMiddleware } from "./auth.middleware.js";
import { authorize } from "./auth.middleware.js";


const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/profile", authMiddleware, (req, res) => {
    res.json({
        success: true,
        user: req.user
    });
});

router.get("/admin",authMiddleware,authorize("ADMIN"), (req, res) => {

    res.status(200).json({
      success: true,
      message:
        "Welcome Admin",
    })
});

export default router;