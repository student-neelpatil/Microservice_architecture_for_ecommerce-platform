import { registerService } from "./auth.service.js";


import registerSchema from  "./auth.validation.js";

export const register = async (
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

};
