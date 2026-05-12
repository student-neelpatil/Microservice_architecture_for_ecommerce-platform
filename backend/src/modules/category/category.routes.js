import express
from "express";

const router =
  express.Router();

import {
  createCategory
} from "./category.controller.js";

import {authMiddleware,authorize,} from "../auth/auth.middleware.js";
import { getCategories } from "./category.controller.js";
import { getCategoryById } from "./category.controller.js";

import { updateCategory } from "./category.controller.js";

import { deleteCategory } from "./category.controller.js";

/*
===================================
CREATE CATEGORY
===================================
*/

router.post("/createcategory",authMiddleware,authorize("ADMIN"),createCategory);""
router.get("/",getCategories);
router.get("/:id",getCategoryById);
router.patch("/:id",authMiddleware,authorize("ADMIN"),updateCategory);
router.delete("/:id",authMiddleware,authorize("ADMIN"),deleteCategory);

export default router;