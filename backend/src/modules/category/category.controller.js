import asyncHandler from "express-async-handler";

import {
  createCategorySchema
} from "./category.validation.js";

import {
  createCategoryService
} from "./category.service.js";

import { getCategoriesService } from "./category.service.js";

import { getCategoryByIdService } from "./category.service.js";

import { updateCategorySchema } from "./category.validation.js";
import { updateCategoryService } from "./category.service.js";

import { deleteCategoryService } from "./category.service.js";

/*
===================================
CREATE CATEGORY
===================================
*/

export const createCategory =
asyncHandler(

  async (req, res) => {

    /*
    ===============================
    VALIDATE REQUEST
    ===============================
    */

    const validatedData =
      createCategorySchema.parse(
        req.body
      );

    /*
    ===============================
    CREATE CATEGORY
    ===============================
    */

    const category =
      await createCategoryService(
        validatedData
      );

    /*
    ===============================
    RESPONSE
    ===============================
    */

    res.status(201).json({

      success: true,
      category,

    });

  }

);

/*
===================================
GET ALL CATEGORIES
===================================
*/

export const getCategories =
asyncHandler(

  async (req, res) => {

    const categories =
      await getCategoriesService();

    res.status(200).json({

      success: true,

      count:
        categories.length,

      categories,

    });

  }

);

/*
===================================
GET CATEGORY BY ID
===================================
*/

export const getCategoryById =
asyncHandler(

  async (req, res) => {

    const category =
      await getCategoryByIdService(

        req.params.id

      );

    res.status(200).json({

      success: true,

      category,

    });

  }

);

/*
===================================
UPDATE CATEGORY
===================================
*/

export const updateCategory =
asyncHandler(

  async (req, res) => {

    /*
    ===============================
    VALIDATE REQUEST
    ===============================
    */

    const validatedData =
      updateCategorySchema.parse(
        req.body
      );

    /*
    ===============================
    UPDATE CATEGORY
    ===============================
    */

    const category =
      await updateCategoryService(

        req.params.id,

        validatedData

      );

    /*
    ===============================
    RESPONSE
    ===============================
    */

    res.status(200).json({

      success: true,

      category,

    });

  }

);


/*
===================================
DELETE CATEGORY
===================================
*/

export const deleteCategory =
asyncHandler(

  async (req, res) => {

    await deleteCategoryService(

      req.params.id

    );

    res.status(200).json({

      success: true,

      message:
        "Category deleted successfully",

    });

  }

);