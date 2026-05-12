import Product
from "./product.model.js";

import Category
from "../category/category.model.js";

/*
===================================
COMMON CATEGORY INCLUDE
===================================
*/

const categoryInclude = [

  {
    model: Category,
  },

];

/*
===================================
CREATE PRODUCT
===================================
*/

export const createProductService =
async (data) => {

  /*

  VERIFY CATEGORY EXISTS
 
  */

  const category =
    await Category.findByPk(
      data.categoryId
    );

  if (!category) {

    throw new Error(
      "Invalid category"
    );

  }

  /*
  ===============================
  CREATE PRODUCT
  ===============================
  */

  const product =
    await Product.create(data);

  /*
  ===============================
  RETURN PRODUCT WITH CATEGORY
  ===============================
  */

  return await Product.findByPk(

    product.id,

    {
      include: categoryInclude,
    }

  );

};

/*
===================================
GET ALL PRODUCTS
===================================
*/

export const getProductsService =
async () => {

  const products =
    await Product.findAll({

      include:
        categoryInclude,

      order: [

        ["createdAt", "DESC"]

      ],

    });

  return products;

};

/*
===================================
GET PRODUCT BY ID
===================================
*/

export const getProductByIdService =
async (id) => {

  const product =
    await Product.findByPk(

      id,

      {
        include:
          categoryInclude,
      }

    );

  if (!product) {

    throw new Error(
      "Product not found"
    );

  }

  return product;

};

/*
===================================
UPDATE PRODUCT
===================================
*/

export const updateProductService =
async (id, data) => {

  /*
  ===============================
  FIND PRODUCT
  ===============================
  */

  const product =
    await Product.findByPk(id);

  if (!product) {

    throw new Error(
      "Product not found"
    );

  }

  /*
  ===============================
  VERIFY CATEGORY IF UPDATED
  ===============================
  */

  if (data.categoryId) {

    const category =
      await Category.findByPk(
        data.categoryId
      );

    if (!category) {

      throw new Error(
        "Invalid category"
      );

    }

  }

  /*
  ===============================
  UPDATE PRODUCT
  ===============================
  */

  await product.update(data);

  /*
  ===============================
  RETURN UPDATED PRODUCT
  ===============================
  */

  return await Product.findByPk(

    product.id,

    {
      include:
        categoryInclude,
    }

  );

};

/*
===================================
DELETE PRODUCT
===================================
*/

export const deleteProductService =
async (id) => {

  const product =
    await Product.findByPk(id);

  if (!product) {

    throw new Error(
      "Product not found"
    );

  }

  await product.destroy();

};