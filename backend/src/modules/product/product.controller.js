import { createProduct } from "./product.service.js";
import { ProductSchema } from "./product.validation.js";
import asyncHandler from "express-async-handler"

import { getProductsService } from "./product.service.js";
import { getProductByIdService } from "./product.service.js";

export const createproduct=asyncHandler(
    async(req,res)=>{

        //validate data

        const validateddata= ProductSchema.parse(req.body);

        if(!validateddata){
            res.json({
                success:false,
                message:"data is not validated"
            })
        }

        //create a product

       await createProduct(validateddata);

        res.json({
            success:true,
            message:"product is created",
            validateddata
        })
    }
)

/*
===================================
GET ALL PRODUCTS
===================================
*/

export const getProducts =
asyncHandler(

  async (req, res) => {

    const products =
      await getProductsService();

    res.status(200).json({

      success: true,
      count:
        products.length,
      products,

    });

  }

);

/*
===================================
GET PRODUCT BY ID
===================================
*/

export const getProductById =
asyncHandler(async (req, res) => {

    const product =await getProductByIdService(req.params.id);

    res.status(200).json({

      success: true,
      product,

    });

  }

);