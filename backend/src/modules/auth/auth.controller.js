import { registerService } from "./auth.service.js";
import { loginService } from "./auth.service.js";


import {registerSchema} from  "./auth.validation.js";
import {loginSchema} from "./auth.validation.js";

import asyncHandler from "express-async-handler";

export const register = asyncHandler(
    async (
    req,
    res
) => {

    const validatedData =
        registerSchema.parse(req.body);

    const user =
        await registerService(validatedData);

    res.status(201).json({
        success: true,
        user,
    });
  
});

export const login=asyncHandler(async (req, res) => {

    const validatedData = loginSchema.parse(req.body);

    const user = await loginService(validatedData);
    
    res.status(200).json({
        success: true,
        user,
    });



});