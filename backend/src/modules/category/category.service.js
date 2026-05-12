import Category from "./category.model.js";
import Product from "../product/product.model.js"


/*
===================================
CREATE CATEGORY
===================================
*/

export const createCategoryService =
async (data) => {

  /*
  ===============================
  CHECK EXISTING CATEGORY
  ===============================
  */

  const existingCategory =
    await Category.findOne({

      where: {
        name: data.name,
      },

    });

  if (existingCategory) {

    throw new Error(
      "Category already exists"
    );

  }

  /*
  ===============================
  CREATE CATEGORY
  ===============================
  */

  const category =
    await Category.create(data);

  return category;

};

/*
===================================
GET ALL CATEGORIES
===================================
*/

export const getCategoriesService =
async () => {

  const categories =
    await Category.findAll({

      order: [
        ["createdAt", "DESC"]
      ],

    });

  return categories;

};


/*
===================================
GET CATEGORY BY ID
===================================
*/

export const getCategoryByIdService =
async (id) => {

  const category =
    await Category.findByPk(id);

  if (!category) {

    throw new Error(
      "Category not found"
    );

  }

  return category;

};


/*
===================================
UPDATE CATEGORY
===================================
*/

export const updateCategoryService =
async (id, data) => {

  /*
  ===============================
  FIND CATEGORY
  ===============================
  */

  const category =
    await Category.findByPk(id);

  if (!category) {

    throw new Error(
      "Category not found"
    );

  }

  /*
  ===============================
  CHECK DUPLICATE NAME
  ===============================
  */

  if (data.name) {

    const existingCategory =
      await Category.findOne({

        where: {
          name: data.name,
        },

      });

    if (

      existingCategory && existingCategory.id !== id

    ) {

      throw new Error(
        "Category already exists"
      );

    }

  }

  /*
  ===============================
  UPDATE CATEGORY
  ===============================
  */

  await category.update(data);

  return category;

};




/*
===================================
DELETE CATEGORY
===================================
*/

export const deleteCategoryService =
async (id) => {

  /*
  ===============================
  FIND CATEGORY
  ===============================
  */

  const category =
    await Category.findByPk(id);

  if (!category) {

    throw new Error(
      "Category not found"
    );

  }

  /*
  ===============================
  CHECK PRODUCTS USING CATEGORY
  ===============================
  */
  //If there is minimum one product found attach to that category then that category cant be deleted

  const products =
    await Product.findOne({

      where: {
        categoryId: id,
      },

    });

  if (products) {

    throw new Error(

      "Cannot delete category with products"

    );

  }

  /*
  ===============================
  DELETE CATEGORY
  ===============================
  */

  await category.destroy();

};