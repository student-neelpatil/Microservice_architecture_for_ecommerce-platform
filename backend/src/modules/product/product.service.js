import Product from "./product.model.js";

export const createProduct=async(data)=>{

    //creating new product

    const product=await Product.create(data);

    return product;
}