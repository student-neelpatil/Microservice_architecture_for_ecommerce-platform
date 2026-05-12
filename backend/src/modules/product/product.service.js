import Product from "./product.model.js";

export const createProduct=async(data)=>{

    //creating new product

    const product=await Product.create(data);

    return product;
}


/*
===================================
GET ALL PRODUCTS
===================================
*/

export const getProductsService =
async () => {

  const products =
    await Product.findAll({

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
    await Product.findByPk(id);

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

  const product =
    await Product.findByPk(id);

  if (!product) {

    throw new Error(
      "Product not found"
    );

  }

  await product.update(data);

  return product;

};