import Product
from "./product.model.js";

import Category
from "../category/category.model.js";

import { Op } from "sequelize";

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



const sortOptions = {

  latest:
    ["createdAt", "DESC"],

  oldest:
    ["createdAt", "ASC"],

  price_asc:
    ["price", "ASC"],

  price_desc:
    ["price", "DESC"],

  name_asc:
    ["name", "ASC"],

  name_desc:
    ["name", "DESC"],

};



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
async (query) => {

 const order = [

  sortOptions[query.sort] || sortOptions.latest
];


  const where={};
  
  
 if(query.category){
  
   where.categoryId=query.Category;

 }
  
 ///api/products?search=iphone

 if (query.search) {

/*
  Apply filter on name column
  here in product table we have name column so it search through name colunm 
  and whose name matches with search is filter
*/
    where.name = {

      [Op.iLike]:
        `%${query.search}%`,

    };

  }
 

  if(query.minPrice){
    where.price[Op.gte]=Number(query.minPrice);
  }

  if(query.maxPrice){
    where.price[Op.lte]=Number(query.maxPrice);
  }



  const products =
    await Product.findAll({

      where,

      include:
        categoryInclude,

      order

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