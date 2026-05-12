import { createProduct } from "./product.service.js";
import { ProductSchema } from "./product.validation.js";
import asyncHandler from "express-async-handler"


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

        const productcontroller= await createProduct(validateddata);

        res.json({
            success:true,
            message:"product is created",
            validateddata
        })
    }
)